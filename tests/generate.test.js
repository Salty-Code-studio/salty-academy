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

test("pickWeighted favours heavy entries with a stubbed rng", function(){
  var pool = ["light","heavy"];
  var w = function(x){ return x === "heavy" ? 9 : 1; };
  assert.deepStrictEqual(G.pickWeighted(pool, w, 1, function(){ return 0.5; }), ["heavy"]);
  assert.deepStrictEqual(G.pickWeighted(pool, w, 1, function(){ return 0.99; }), ["light"]);
  assert.strictEqual(G.pickWeighted(pool, w, 5, Math.random).length, 2, "never exceeds the pool");
});

test("test 3 leans on the learner's weak concepts", function(){
  var idx = index(), p = allMastered(player());
  var weak = global.window.SA_CONCEPTS.byPack("m4")[0].id;
  M.record(p, [weak], false, "know", 1789000000000);
  global.window.SA_CONCEPTS.ALL.forEach(function(c){
    if (c.id !== weak) for (var i=0;i<5;i++) M.record(p, [c.id], true, "know", 1789000000000);
  });
  var hits = 0;
  for (var r=0;r<40;r++){
    var t = G.build(3, p, idx, {});
    if (t.items.some(function(i){ return i.concepts.indexOf(weak) >= 0; })) hits++;
  }
  assert.ok(hits >= 30, "the weak concept appeared in only " + hits + " of 40 tests");
});
