var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/concepts.js");
require("../engine/mastery.js");
require("../engine/generate.js");
var G = global.window.SA_GENERATE;
var M = global.window.SA_MASTERY;
var PACKS = ["p1","p2","m1","m2","m3","m4","m5","m6"];

/* A fake index: 6 mastery items and 6 module items per pack, spread over that pack's concepts. */
function index(){
  var byPack = {}, byId = {}, items = [];
  PACKS.forEach(function(pk){
    var concepts = global.window.SA_CONCEPTS.byPack(pk);
    byPack[pk] = [];
    ["quiz","diagnose","open","match","translate","flash"].forEach(function(fmt, f){
      [0,1].forEach(function(v){
        var it = { id: fmt.charAt(0)+"."+pk+".gen"+f+"."+(v?"b":"a"),
                   pack: pk, format: fmt,
                   concepts: [concepts[(f+v) % concepts.length].id],
                   use: v ? "mastery" : "module", data: {} };
        items.push(it); byPack[pk].push(it); byId[it.id] = it;
      });
    });
  });
  return { items:items, byPack:byPack, byId:byId };
}

function player(){ return { boss:{}, seen:{}, concepts:{} }; }
function allMastered(p){ PACKS.forEach(function(k){ p.boss[k] = 1; }); return p; }

test("unlocked only once every pack is mastered", function(){
  var p = player();
  assert.strictEqual(G.unlocked(p, PACKS), false);
  PACKS.slice(0, 7).forEach(function(k){ p.boss[k] = 1; });
  assert.strictEqual(G.unlocked(p, PACKS), false);
  p.boss.m6 = 1;
  assert.strictEqual(G.unlocked(p, PACKS), true);
});

test("each test has the right size and covers every pack", function(){
  var idx = index(), p = allMastered(player());
  [[1,14],[2,14],[3,18]].forEach(function(pair){
    var t = G.build(pair[0], p, idx, {});
    assert.strictEqual(t.items.length, pair[1], "test " + pair[0] + " size");
    var packs = {};
    t.items.forEach(function(i){ packs[i.pack] = 1; });
    assert.strictEqual(Object.keys(packs).length, 8, "test " + pair[0] + " misses a pack");
  });
});

test("test 2 only uses application formats", function(){
  var t = G.build(2, allMastered(player()), index(), {});
  t.items.forEach(function(i){
    assert.ok(["diagnose","open","match"].indexOf(i.format) >= 0, "bad format " + i.format);
  });
});

test("a test never repeats an item inside itself", function(){
  var t = G.build(3, allMastered(player()), index(), {});
  var seen = {};
  t.items.forEach(function(i){ assert.ok(!seen[i.id], "repeat " + i.id); seen[i.id] = 1; });
});

test("items the learner has already answered are skipped while alternatives exist", function(){
  var idx = index(), p = allMastered(player());
  idx.items.filter(function(i){ return i.use === "module"; }).forEach(function(i){ p.seen[i.id] = 1; });
  var t = G.build(1, p, idx, {});
  t.items.forEach(function(i){ assert.strictEqual(p.seen[i.id], undefined, i.id + " was already answered"); });
  assert.strictEqual(t.shortfall, 0);
});

test("shortfall counts forced repeats instead of silently shrinking the test", function(){
  var idx = index(), p = allMastered(player());
  idx.items.forEach(function(i){ p.seen[i.id] = 1; });
  var t = G.build(3, p, idx, {});
  assert.strictEqual(t.items.length, 18);
  assert.ok(t.shortfall > 0, "expected a reported shortfall");
});

test("packsMissing is empty when every pack has eligible items", function(){
  [1,2,3].forEach(function(testNo){
    var t = G.build(testNo, allMastered(player()), index(), {});
    assert.deepStrictEqual(t.packsMissing, [], "test " + testNo + " should report no missing packs");
  });
});

test("a pack with no eligible items shows up in packsMissing instead of staying silent", function(){
  var idx = index(), p = allMastered(player());
  idx.items = idx.items.filter(function(i){ return i.pack !== "m4"; });
  idx.byPack.m4 = [];
  var t = G.build(3, p, idx, {});
  assert.strictEqual(t.items.length, 18, "the test still fills to size from the other packs");
  assert.deepStrictEqual(t.packsMissing, ["m4"]);
});

test("pickWeighted favours heavy entries with a stubbed rng", function(){
  var pool = ["light","heavy"];
  var w = function(x){ return x === "heavy" ? 9 : 1; };
  assert.deepStrictEqual(G.pickWeighted(pool, w, 1, function(){ return 0.5; }), ["heavy"]);
  assert.deepStrictEqual(G.pickWeighted(pool, w, 1, function(){ return 0.99; }), ["light"]);
  assert.strictEqual(G.pickWeighted(pool, w, 5, Math.random).length, 2, "never exceeds the pool");
});

/* Statistical contract for test 3's weighting. The math behind the constants below
   (WEAK_TRIALS, WEAK_HIT_THRESHOLD) is worked out from this exact fixture:

   m4 has 13 concepts. Items get concepts[(f+v) % 13] for format index f (0..5) and
   version v (0,1), so only the format-0/version-0 item (a "module" item) lands on
   concepts[0], the weak concept. That gives m4's 12-item pool these weights:
     - 1 item (the weak one, module)         weight 3   (misconception -> weights() = 3)
     - 5 other module items                  weight 1 each (mastered -> weights() = 1)
     - 6 mastery-tagged items                weight 2 each (weight 1 concept * 2x "use" bonus)
     total pool weight = 3 + 5*1 + 6*2 = 20

   Test 3 first draws one item per pack (the "cover every pack" pass, 8 draws for
   8 packs), then fills to size 18 by drawing 10 more from the whole remaining pool.
   Only the m4 per-pack draw can select the weak item during the first pass, so:
     P(weak selected in the m4 per-pack draw) = 3/20 = 0.15
   Since the fill pass can only add further chances (the weak item stays eligible if
   it survives the first pass), 0.15 is an exact, provable LOWER BOUND on P(hit) for
   any correctly weighted implementation. The full multi-stage weighted-without-
   replacement probability has no simple closed form by hand, so it was measured with
   a 300,000-trial simulation against this exact fixture: P(hit) = 0.334 +/- 0.002
   (95% CI), comfortably above the 0.15 floor.

   For a flat, unweighted implementation (weightOf === 1 for every item), weighted
   sampling without replacement degenerates into simple random sampling, which DOES
   have a closed form:
     P(weak in the m4 per-pack draw)              = 1/12
     P(weak in the 10-item fill pass | it survived) = 10/88
       (96 items total, 8 leave in the per-pack pass, 88 remain; 10 more are drawn)
     P(hit | flat) = 1/12 + (11/12)(10/88) = 44/528 + 55/528 = 99/528 = 3/16 = 0.1875

   0.334 vs 0.1875 is real separation, but 40 trials (the original count) cannot
   resolve it: mean 13.2 vs 7.5, sd ~3.0 and ~2.5, about 1.5 sigma apart, confirmed by
   simulation to produce overlapping hit-count ranges for the two implementations.
   That overlap is exactly how the narrowing bug (finding 1) hid behind a 30-of-40
   threshold: narrowing makes the weak item appear in literally every test (100%),
   so any threshold well under 40 passed trivially without ever exercising the real
   proportional-draw math. Raising the trial count is what "adjust the fixture" means
   here: 2000 trials narrows both distributions enough that a single hit-count
   threshold cleanly separates them (correct mean ~668, sd ~21; flat mean 375,
   sd ~17.5; threshold 550 sits ~5.6 sd below the correct mean and ~10 sd above the
   flat mean), verified empirically below and in the task report.

   On non-determinism: this fixture has exactly one item in the whole 96-item pool
   that even touches the weak concept (only concepts[(f+v) % 13] === 0 happens once,
   at format 0 / version 0). So whenever the weak concept appears in a test it is
   necessarily that same item id; comparing full 18-item id-sets for variety does NOT
   by itself catch narrowing here, because the other 7 packs still have several items
   tied at the same top weight, so their slots keep rolling randomly even when the
   m4 slot has collapsed to a single deterministic pick (verified: the old narrowing
   code produced 2000 distinct full id-sets in 2000 builds, same as the fix). The
   assertion that actually catches finding 1 is that the weak item's PRESENCE is not
   constant: under narrowing every single build includes it (hits === WEAK_TRIALS,
   the same 100% collapse the reviewer measured as "200 of 200"), so asserting
   hits < WEAK_TRIALS directly fails against narrowing while trivially holding for a
   correctly weighted draw (~33%, nowhere near 100%). Both checks are kept below: the
   lower bound proves the weighting favours the weak spot, the upper bound proves
   that favour is probabilistic, not an argmax lock. */
var WEAK_TRIALS = 2000;
var WEAK_HIT_THRESHOLD = 550;
var WEAK_HIT_MAX = 800;

test("test 3 leans on the learner's weak concepts, and the draw is not deterministic", function(){
  var idx = index(), p = allMastered(player());
  var weak = global.window.SA_CONCEPTS.byPack("m4")[0].id;
  M.record(p, [weak], false, "know", 1789000000000);
  global.window.SA_CONCEPTS.ALL.forEach(function(c){
    if (c.id !== weak) for (var i=0;i<5;i++) M.record(p, [c.id], true, "know", 1789000000000);
  });
  var hits = 0;
  var idSets = {};
  for (var r=0;r<WEAK_TRIALS;r++){
    var t = G.build(3, p, idx, {});
    if (t.items.some(function(i){ return i.concepts.indexOf(weak) >= 0; })) hits++;
    idSets[t.items.map(function(i){ return i.id; }).sort().join(",")] = 1;
  }
  assert.ok(hits >= WEAK_HIT_THRESHOLD && hits <= WEAK_HIT_MAX,
    "weak concept hit count " + hits + " outside band [" + WEAK_HIT_THRESHOLD + ", " +
    WEAK_HIT_MAX + "] (low " + (hits < WEAK_HIT_THRESHOLD ? "suggests flat weighting" : "") +
    ", high " + (hits > WEAK_HIT_MAX ? "suggests squared or collapsed weighting" : "") + ")");
  assert.ok(Object.keys(idSets).length > 1,
    "every generated test had the exact same full set of item ids across all " +
    WEAK_TRIALS + " builds, which would mean nothing in the whole test varies at all");
});
