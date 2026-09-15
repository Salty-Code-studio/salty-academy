/* Salty Academy views · mastery-driven views.
   Everything here comes from a single init(ctx) call in index.html, because the game engine
   lives inside a private IIFE and this file cannot reach into it. No globals of its own. */
(function(){
"use strict";

var ctx = null;

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
    var spec = ctx.GEN.SPEC[n], passed = !!p.finals[n];
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
  ctx.setView("finals");
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

/* The one live cinematic run, if any. Every timeout id, and the two DOM nodes a timer needs
   (the overlay root and its own rung/final nodes), live on this object rather than being looked
   up again later through a global selector. That is what keeps a second run from ever touching
   a first run's nodes, and it is what lets teardownCine() cancel a run completely from outside
   this function, which is what the skip path needs. */
var activeCine = null;

function teardownCine(){
  if (!activeCine) return;
  activeCine.timers.forEach(function(id){ clearTimeout(id); });
  if (activeCine.box.parentNode) activeCine.box.parentNode.removeChild(activeCine.box);
  activeCine = null;
}

/* Eight to twelve seconds, native SVG and CSS, no video file. Walks the actual configured
   RANKS ladder rather than a hard-coded sequence, and the pacing is derived from cinematicMs
   and the ladder length so the finished state keeps landing in that eight-to-twelve-second
   window whether the ladder gains or loses a rung. Respects prefers-reduced-motion: under
   reduced motion every rung is lit and the final card appears immediately, no timers at all.
   Idempotent: calling this while a run is already live tears that run down first (its timers
   cancelled, its overlay removed) before building the new one, so there is never more than one
   overlay on screen. Skippable at any time via the always-visible Skip button, wired in
   index.html's GA.cineSkip through window.SA_VIEWS.cineDispose(). */
function cinematic(onDone){
  teardownCine();

  var p = ctx.P(), name = ctx.S.current;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stages = ctx.RANKS;
  var n = stages.length;
  /* 400ms lead-in and 500ms tail are fixed; whatever is left of cinematicMs is spread evenly
     across the rungs, so the total run time tracks cinematicMs regardless of ladder length
     instead of shrinking as more rungs are added. */
  var per = Math.max(700, Math.floor((window.SA_CONFIG.cinematicMs - 900) / n));

  var rungs = stages.map(function(r, i){
    return '<div class="rung" data-i="' + i + '"><span class="rico">' + r[2] + '</span>'
      + '<span class="rname">' + ctx.esc(r[1]) + '</span>'
      + '<span class="rxp">' + r[0] + ' xp</span></div>';
  }).join("");

  var html = '<div class="cine"><button class="cineskip" onclick="GA.cineSkip()">Skip</button>'
    + '<div class="cinein"><p class="eyebrow">' + ctx.esc(name) + '</p>'
    + '<h2 class="cinetitle">Look how far you came.</h2>'
    + '<div class="ladder">' + rungs + '</div>'
    + '<div class="cinefinal"></div></div></div>';

  var box = ctx.el(html).firstChild;
  document.body.appendChild(box);

  /* Captured once, here, at creation time. Every callback below closes over these exact nodes
     instead of re-querying the document, so a stale callback from an earlier, torn-down run can
     never find and mutate this run's DOM even if something forgot to cancel it. */
  var rungNodes = [];
  for (var i = 0; i < n; i++) rungNodes.push(box.querySelector('.rung[data-i="' + i + '"]'));
  var finalBox = box.querySelector(".cinefinal");

  var run = { box:box, timers:[], onDone:onDone };
  activeCine = run;

  function finish(){
    /* Belt and braces alongside teardownCine() clearing this timer on skip/restart: even if a
       stale timer somehow still fired, it would find activeCine pointing at a different run (or
       none) and stop here instead of touching finalBox. */
    if (activeCine !== run) return;
    finalBox.innerHTML =
      '<div class="finalcard"><div class="fico">' + ctx.rankIco(p.xp) + '</div>'
      + '<h1>You completed Salty Code Academy.</h1>'
      + '<p class="sub">' + ctx.esc(name) + ' · ' + ctx.esc(ctx.rank(p.xp)) + ' · ' + p.xp + ' xp</p>'
      + '<p class="muted">You started at Worm. You did not stay there.</p>'
      + '<button class="btn wide" onclick="GA.cineDone(\'progress\')">View my results</button>'
      + '<button class="btn wide ghost" onclick="GA.cineDone(\'replay\')">Replay my journey</button></div>';
    finalBox.classList.add("show");
  }

  if (reduced){
    rungNodes.forEach(function(node){ if (node) node.classList.add("lit"); });
    finish();
  } else {
    stages.forEach(function(r, i){
      var id = setTimeout(function(){
        if (activeCine !== run) return;
        var node = rungNodes[i];
        if (node) node.classList.add("lit");
      }, 400 + i * per);
      run.timers.push(id);
    });
    run.timers.push(setTimeout(finish, 400 + n * per + 500));
  }
}

/* The single teardown entry point index.html's GA.cineDone and GA.cineSkip both call. Cancels
   every pending timer for the live run, removes its overlay, and hands back the onDone callback
   the caller asked to start with (skip wants to invoke it; a plain "done" click does not). */
function cineDispose(){
  var onDone = activeCine ? activeCine.onDone : null;
  teardownCine();
  return onDone;
}

window.SA_VIEWS = { init:init, finalsCard:finalsCard, finalsHome:finalsHome,
                     cinematic:cinematic, cineDispose:cineDispose,
                     achievements:achievements, startMastery:startMastery };
})();
