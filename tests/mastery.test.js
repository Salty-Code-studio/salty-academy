var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/concepts.js");
require("../engine/mastery.js");
var M = global.window.SA_MASTERY;
var DAY = 86400000;
var T0 = 1789000000000;

function p(){ return { concepts:{} }; }

test("a confident correct answer promotes the concept a box", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  var s = M.state(pl, "c.p1.speed");
  assert.strictEqual(s.box, 1);
  assert.strictEqual(s.fragile, false);
  assert.strictEqual(s.due, T0 + 1*DAY);
});

test("correct but guessing marks the concept fragile and due tomorrow", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], true, "guess", T0);
  var s = M.state(pl, "c.p1.speed");
  assert.strictEqual(s.box, 1, "a guess does not promote");
  assert.strictEqual(s.fragile, true);
  assert.strictEqual(s.due, T0 + DAY);
});

test("wrong while sure is a misconception and resets the box", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], false, "know", T0);
  var s = M.state(pl, "c.p1.speed");
  assert.strictEqual(s.box, 0);
  assert.strictEqual(s.misconception, true);
});

test("wrong while guessing only drops one box and flags nothing", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], false, "guess", T0);
  var s = M.state(pl, "c.p1.speed");
  assert.strictEqual(s.box, 1);
  assert.strictEqual(s.misconception, false);
});

test("a later correct answer clears the misconception flag", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], false, "know", T0);
  M.record(pl, ["c.p1.speed"], true, "pretty", T0 + DAY);
  assert.strictEqual(M.state(pl, "c.p1.speed").misconception, false);
});

test("box never leaves 0 to 5", function(){
  var pl = p();
  for (var i=0;i<12;i++) M.record(pl, ["c.p1.speed"], true, "know", T0);
  assert.strictEqual(M.state(pl, "c.p1.speed").box, 5);
  for (var j=0;j<12;j++) M.record(pl, ["c.p1.speed"], false, "guess", T0);
  assert.strictEqual(M.state(pl, "c.p1.speed").box, 0);
});

test("recording hits every concept on the item", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed","c.p1.bounce"], true, "pretty", T0);
  assert.strictEqual(M.state(pl, "c.p1.speed").box, 1);
  assert.strictEqual(M.state(pl, "c.p1.bounce").box, 1);
});

test("pack mastery is the mean box of that pack's concepts", function(){
  var pl = p();
  assert.strictEqual(M.packMastery(pl, "p1"), 0);
  global.window.SA_CONCEPTS.byPack("p1").forEach(function(c){
    M.record(pl, [c.id], true, "know", T0);
    M.record(pl, [c.id], true, "know", T0);
  });
  var pct = M.packMastery(pl, "p1");
  assert.ok(pct > 35 && pct < 45, "two of five boxes is about 40 percent, got " + pct);
});

test("due returns only concepts whose due date has passed", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  assert.deepStrictEqual(M.due(pl, T0 + 1000), []);
  assert.deepStrictEqual(M.due(pl, T0 + 2*DAY), ["c.p1.speed"]);
});

test("weights rank misconception above fragile above weak above solid", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], false, "know", T0);
  M.record(pl, ["c.p1.bounce"], true, "guess", T0);
  for (var i=0;i<5;i++) M.record(pl, ["c.p1.hero"], true, "know", T0);
  var w = M.weights(pl);
  assert.strictEqual(w["c.p1.speed"], 3);
  assert.strictEqual(w["c.p1.bounce"], 2);
  assert.strictEqual(w["c.p1.hero"], 1);
  assert.strictEqual(w["c.m6.spine"], 2.5, "never seen");
});

test("label describes the state in plain words", function(){
  var pl = p();
  assert.strictEqual(M.label(pl, "c.p1.speed"), "new");
  M.record(pl, ["c.p1.speed"], true, "guess", T0);
  assert.strictEqual(M.label(pl, "c.p1.speed"), "shaky");
});
