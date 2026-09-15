var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/storage.js");
var ST = global.window.SA_STORAGE;

var V1 = {
  current: "Mo",
  players: {
    Mo: { xp: 1450, correct: {"q:p1:3":1,"c:m2:0":1}, wrongQueue: ["q:m6:7"],
          badges: ["streak7","boss-p1"], boss: {p1:1,p2:1}, streak: 4,
          lastDay: "2026-09-14", plays: 31, history: [{t:1,pack:"p1",label:"Salty Sprint",score:7,n:8}] }
  }
};

test("migrate keeps standing and drops positional item history", function(){
  var v2 = ST.migrate(V1);
  var p = v2.players.Mo;
  assert.strictEqual(p.xp, 1450);
  assert.strictEqual(p.streak, 4);
  assert.deepStrictEqual(p.boss, {p1:1,p2:1});
  assert.deepStrictEqual(p.badges, ["streak7","boss-p1"]);
  assert.strictEqual(p.history.length, 1);
  assert.strictEqual(p.correct, undefined);
  assert.deepStrictEqual(p.wrongQueue, []);
  assert.deepStrictEqual(p.concepts, {});
  assert.strictEqual(v2.current, "Mo");
  assert.strictEqual(v2.migratedFromV1, true);
});

test("migrate is safe on an empty or broken v1 blob", function(){
  assert.deepStrictEqual(ST.migrate(null).players, {});
  assert.deepStrictEqual(ST.migrate({players:null}).players, {});
});

test("blankPlayer has every v2 field", function(){
  var p = ST.blankPlayer();
  ["xp","badges","boss","streak","lastDay","plays","history","last","concepts","seen","right","wrongQueue","completed","completedShown","openFlags"]
    .forEach(function(k){ assert.ok(k in p, "missing " + k); });
  assert.strictEqual(p.xp, 0);
  assert.strictEqual(p.completed, null);
});

test("load prefers v2 and falls back to migrating v1", function(){
  var store = {};
  store["salty-academy-game-v1"] = JSON.stringify(V1);
  var s1 = ST.load(function(k){ return store[k] || null; });
  assert.strictEqual(s1.players.Mo.xp, 1450);
  assert.strictEqual(s1.migratedFromV1, true);

  store["salty-academy-game-v2"] = JSON.stringify({current:"Rudo", players:{Rudo:ST.blankPlayer()}});
  var s2 = ST.load(function(k){ return store[k] || null; });
  assert.strictEqual(s2.current, "Rudo");
});

test("migrate falls back to null when current player does not exist", function(){
  var v1 = { current: "NonExistent", players: { Mo: { xp: 100 } } };
  var v2 = ST.migrate(v1);
  assert.strictEqual(v2.current, null);
  assert.ok(v2.players.Mo);
});

test("mutating migrated player boss does not mutate source v1 object", function(){
  var v1 = { players: { Mo: { xp: 100, boss: {p1:1, p2:1} } } };
  var v2 = ST.migrate(v1);
  v2.players.Mo.boss.p3 = 1;
  assert.strictEqual(v2.players.Mo.boss.p3, 1);
  assert.strictEqual(v1.players.Mo.boss.p3, undefined);
});
