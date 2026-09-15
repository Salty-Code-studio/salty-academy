/* Salty Academy views · mastery-driven views.
   Everything here comes from a single init(ctx) call in index.html, because the game engine
   lives inside a private IIFE and this file cannot reach into it. No globals of its own. */
(function(){
"use strict";

var ctx = null;

/* Exact values from the task brief: item counts, titles and focus lines for the three
   cumulative tests. Kept local so this file never has to call GEN.build just to read a label. */
var TEST_SPEC = {
  1: { title:"Mastery 1", focus:"Recall and recognition", n:14 },
  2: { title:"Mastery 2", focus:"Application", n:14 },
  3: { title:"Mastery 3", focus:"Transfer and weak spots", n:18 }
};

var NUMWORDS = ["zero","one","two","three","four","five","six","seven","eight"];
function spellNum(n){ return (n >= 0 && n < NUMWORDS.length) ? NUMWORDS[n] : String(n); }

function init(c){ ctx = c; }

var packIdCache = null;
function packIds(){
  if (!packIdCache) packIdCache = ctx.MODS.map(function(m){ return m.id; });
  return packIdCache;
}

function masteredCount(p, ids){
  return ids.filter(function(id){ return !!(p.boss && p.boss[id]); }).length;
}

/* One run of the mastery engine, wired through the same run loop as everything else, so it
   inherits the confidence-before-answer and answer-once invariants for free. startRun's fifth
   argument is what gets testNo onto the private run object. */
function startMastery(testNo){
  var p = ctx.P();
  var t = ctx.GEN.build(testNo, p, ctx.IDX, {});
  if (t.shortfall > 0) console.warn("mastery test " + testNo + " reused " + t.shortfall + " items: the pool is thin");
  if (t.packsMissing && t.packsMissing.length) console.warn("mastery test " + testNo + " has no items from: " + t.packsMissing.join(", "));
  var items = t.items.map(function(it){
    return { kind:it.format, id:it.id, data:it.data, mod:ctx.mod(it.pack), item:it };
  });
  ctx.startRun("mastery", null, items, "learn", { testNo: testNo });
  ctx.step();
}

function testRows(){
  var p = ctx.P();
  if (!p.finals) p.finals = {};
  var h = '<div class="speakgrid">';
  [1,2,3].forEach(function(n){
    var spec = TEST_SPEC[n], passed = !!p.finals[n];
    h += '<div class="scard">'
      + '<span class="n">Test ' + n + ' · ' + spec.n + ' questions' + (passed ? ' · done' : '') + '</span>'
      + '<h3>' + ctx.esc(spec.title) + '</h3>'
      + '<span class="words">' + ctx.esc(spec.focus) + '</span>'
      + '<button class="btn' + (passed ? ' ghost' : '') + '" style="margin-top:.7rem;align-self:flex-start" onclick="GA.mastery(' + n + ')">'
      + (passed ? 'Take it again' : 'Start') + ' →</button>'
      + '</div>';
  });
  h += '</div>';
  return h;
}

/* Locked card lists how many of the eight packs are mastered. Unlocked card lists the three
   tests. Copy is verbatim from the brief; do not reword it. */
function finalsCard(){
  var p = ctx.P(), ids = packIds();
  var h = '<div class="panel" style="margin-top:1.4rem">'
    + '<p class="eyebrow" style="margin-bottom:.4rem">The finals</p>';
  if (!ctx.GEN.unlocked(p, ids)){
    h += '<p class="muted" style="margin:0">Three final tests unlock when all eight packs are mastered. '
      + 'You have ' + spellNum(masteredCount(p, ids)) + ' of eight.</p>';
  } else {
    h += '<p style="margin:0 0 .9rem">The finals are open. Three tests, new questions, everything you have learned.</p>'
      + testRows();
  }
  h += '</div>';
  return h;
}

/* A dedicated page for the three tests, reached from the finals card link or the profile's
   "See the three finals" button. Renders itself; callers just invoke it. */
function finalsHome(){
  var p = ctx.P(), ids = packIds();
  var h = '<p class="eyebrow">The finals</p>'
    + '<h1>Three tests.<br><span class="dim">Everything you have learned.</span></h1>';
  if (!ctx.GEN.unlocked(p, ids)){
    h += '<p class="sub">Three final tests unlock when all eight packs are mastered. '
      + 'You have ' + spellNum(masteredCount(p, ids)) + ' of eight.</p>';
  } else {
    h += '<p class="sub">The finals are open. Three tests, new questions, everything you have learned. '
      + 'Pass all three to complete Salty Code Academy.</p>'
      + testRows();
  }
  h += '<button class="btn ghost" style="margin-top:1.4rem" onclick="GA.nav(\'learn\')">Back to learning</button>';
  ctx.render(h);
}

/* Permanent achievement area. Only renders once p.completed is set, and stays visible forever
   after that: this is the record, not a one-time toast. */
function achievements(){
  var p = ctx.P();
  if (!p.completed) return "";
  var when = new Date(p.completed).toLocaleDateString(undefined, {day:"numeric", month:"long", year:"numeric"});
  return '<h2>Course complete</h2>'
    + '<div class="panel" style="border:1.5px solid var(--coral)">'
    + '<p class="eyebrow" style="color:var(--coral-dark);margin-bottom:.6rem">COURSE COMPLETE</p>'
    + '<div style="display:flex;align-items:center;gap:.9rem;flex-wrap:wrap">'
    + '<span style="font-size:2.2rem">' + ctx.rankIco(p.xp) + '</span>'
    + '<div><b>Salty Code Academy</b> · completed ' + ctx.esc(when) + '<br>'
    + '<span class="muted">Final standing: ' + ctx.esc(ctx.rank(p.xp)) + ' · ' + p.xp + ' xp</span></div>'
    + '</div>'
    + '<div style="margin-top:1.1rem;display:flex;gap:.6rem;flex-wrap:wrap">'
    + '<button class="btn" onclick="GA.cinematic()">Replay my journey</button>'
    + '<button class="btn ghost" onclick="GA.finals()">See the three finals</button>'
    + '</div></div>';
}

/* Eight to twelve seconds, native SVG and CSS, no video file. Walks the actual configured
   RANKS ladder rather than a hard-coded sequence. Respects prefers-reduced-motion: under
   reduced motion every rung is lit and the final card appears immediately, no timers at all.
   Skippable at any time via the always-visible Skip button, wired in index.html's GA.cineSkip.
   cinematic.onDone is a property on this exported function itself, so GA.cineSkip can read it
   after the overlay is already gone. */
function cinematic(onDone){
  var p = ctx.P(), name = ctx.S.current;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stages = ctx.RANKS;
  var per = Math.max(700, Math.floor((window.SA_CONFIG.cinematicMs - 2600) / stages.length));

  var rungs = stages.map(function(r, i){
    return '<div class="rung" data-i="' + i + '"><span class="rico">' + r[2] + '</span>'
      + '<span class="rname">' + ctx.esc(r[1]) + '</span>'
      + '<span class="rxp">' + r[0] + ' xp</span></div>';
  }).join("");

  var html = '<div class="cine" id="cine"><button class="cineskip" onclick="GA.cineSkip()">Skip</button>'
    + '<div class="cinein"><p class="eyebrow">' + ctx.esc(name) + '</p>'
    + '<h2 class="cinetitle">Look how far you came.</h2>'
    + '<div class="ladder">' + rungs + '</div>'
    + '<div class="cinefinal" id="cinefinal"></div></div></div>';

  document.body.appendChild(ctx.el(html).firstChild);

  function finish(){
    /* The learner may have hit Skip already, which removes #cine (and #cinefinal with it) well
       before this fires on a real, non-reduced-motion timeline. Without this guard the deferred
       timeout throws on a null element the moment it runs, which is exactly the kind of "leaves
       the app in a bad state after skipping" failure the brief warns against. */
    var box = document.getElementById("cinefinal");
    if (!box) return;
    box.innerHTML =
      '<div class="finalcard"><div class="fico">' + ctx.rankIco(p.xp) + '</div>'
      + '<h1>You completed Salty Code Academy.</h1>'
      + '<p class="sub">' + ctx.esc(name) + ' · ' + ctx.esc(ctx.rank(p.xp)) + ' · ' + p.xp + ' xp</p>'
      + '<p class="muted">You started at Worm. You did not stay there.</p>'
      + '<button class="btn wide" onclick="GA.cineDone(\'progress\')">View my results</button>'
      + '<button class="btn wide ghost" onclick="GA.cineDone(\'replay\')">Replay my journey</button></div>';
    box.classList.add("show");
  }

  if (reduced){
    document.querySelectorAll(".rung").forEach(function(r){ r.classList.add("lit"); });
    finish();
  } else {
    stages.forEach(function(r, i){
      setTimeout(function(){
        var node = document.querySelector('.rung[data-i="' + i + '"]');
        if (node) node.classList.add("lit");
      }, 400 + i * per);
    });
    setTimeout(finish, 400 + stages.length * per + 500);
  }
  cinematic.onDone = onDone;
}

window.SA_VIEWS = { init:init, finalsCard:finalsCard, finalsHome:finalsHome,
                     cinematic:cinematic, achievements:achievements, startMastery:startMastery };
})();
