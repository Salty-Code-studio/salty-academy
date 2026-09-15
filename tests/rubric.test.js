var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/rubric.js");
var R = global.window.SA_RUBRIC;

var SPEED = {
  must: [ ["slow","seconds","speed","load"], ["leave","lose","gone","bounce","back"] ],
  nice: [ ["never","silent","complain","tell you"] ],
  miss: [ { match:["google","ranking","seo"],
            say:"Speed does affect ranking, but the money problem is the visitor who left before the page appeared." } ]
};

test("hitting every must group is understood", function(){
  var r = R.grade("Her site is slow, so most phone visitors leave before it even loads.", SPEED);
  assert.strictEqual(r.state, "understood");
  assert.strictEqual(r.lowConfidence, false);
  assert.strictEqual(r.misconception, null);
});

test("stems match across word endings", function(){
  var r = R.grade("The loading takes ages and customers are losing patience and bouncing.", SPEED);
  assert.strictEqual(r.state, "understood");
});

test("half the groups is partial and names what is missing", function(){
  var r = R.grade("Her site takes about six seconds to open.", SPEED);
  assert.strictEqual(r.state, "partial");
  assert.deepStrictEqual(r.missed, [1]);
  assert.ok(r.nudge.length > 0);
});

test("nothing relevant is notyet", function(){
  var r = R.grade("I would redesign the logo and add more colour.", SPEED);
  assert.strictEqual(r.state, "notyet");
});

test("a known misconception caps the state and supplies the reason", function(){
  var r = R.grade("It is slow so Google will rank her lower and she loses traffic.", SPEED);
  assert.strictEqual(r.state, "partial");
  assert.ok(r.misconception.indexOf("ranking") >= 0);
});

test("a very short answer that hits everything is low confidence", function(){
  var r = R.grade("slow, they leave", SPEED);
  assert.strictEqual(r.state, "understood");
  assert.strictEqual(r.lowConfidence, true);
});

test("a long answer that hits nothing is low confidence, not a confident fail", function(){
  var long = "Honestly I think the real issue is that when somebody opens it on their phone " +
             "while they are standing outside the shop they give up almost immediately and go " +
             "somewhere else instead which she has no way of ever finding out about at all.";
  var r = R.grade(long, SPEED);
  assert.strictEqual(r.state, "notyet");
  assert.strictEqual(r.lowConfidence, true);
});

test("an empty answer is notyet and never low confidence", function(){
  var r = R.grade("   ", SPEED);
  assert.strictEqual(r.state, "notyet");
  assert.strictEqual(r.lowConfidence, false);
});

test("minMust defaults to half the groups rounded up", function(){
  var three = { must:[["a"],["b"],["c"]] };
  assert.strictEqual(R.grade("a b", three).state, "partial");
  assert.strictEqual(R.grade("a", three).state, "notyet");
});

test("nice groups do not change the state but are reported", function(){
  var r = R.grade("It is slow so they leave and she never even hears about it.", SPEED);
  assert.strictEqual(r.state, "understood");
  assert.deepStrictEqual(r.niceHit, [0]);
});

test("prefix matching accepts stems within one character of length", function(){
  var U = global.window.SA_UTIL;
  var pairs = [
    ["losing", "lose"],
    ["bouncing", "bounce"],
    ["leaves", "leave"]
  ];
  pairs.forEach(function(pair){
    var one = { must:[[pair[1]]] };
    var r = R.grade(pair[0], one);
    assert.strictEqual(r.state, "understood",
      U.stem(pair[0]) + " should match " + U.stem(pair[1]));
  });
});

test("prefix matching rejects stems that differ by more than one character", function(){
  var pairs = [
    ["background", "back"],
    ["secondary", "second"],
    ["market", "mark"]
  ];
  pairs.forEach(function(pair){
    var one = { must:[[pair[1]]] };
    var r = R.grade(pair[0], one);
    assert.strictEqual(r.state, "notyet");
  });
});

test("speeding earns the first must group of the speed rubric", function(){
  var r = R.grade("The site really needs speeding up on mobile.", SPEED);
  assert.ok(r.hit.indexOf(0) >= 0);
});

test("an ordinary sentence about a background image does not pass the speed rubric", function(){
  var r = R.grade("The background image is low resolution, which is a secondary concern for now.", SPEED);
  assert.notStrictEqual(r.state, "understood");
});

test("minMust at or above the group count warns once, unless there is only one group", function(){
  var calls = [];
  var original = console.warn;
  console.warn = function(msg){ calls.push(msg); };
  try {
    R.grade("a b", { must:[["a"],["b"]], minMust:2 });
    assert.strictEqual(calls.length, 1);
    assert.ok(calls[0].indexOf("2") >= 0);

    calls = [];
    R.grade("a", { must:[["a"]], minMust:1 });
    assert.strictEqual(calls.length, 0);
  } finally {
    console.warn = original;
  }
});
