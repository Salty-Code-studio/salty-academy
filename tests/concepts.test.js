var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/concepts.js");
var C = global.window.SA_CONCEPTS;
var PACKS = ["p1","p2","m1","m2","m3","m4","m5","m6"];

test("every pack has at least eight concepts", function(){
  PACKS.forEach(function(p){
    assert.ok(C.byPack(p).length >= 8, p + " has only " + C.byPack(p).length);
  });
});

test("ids are unique and well formed", function(){
  var seen = {};
  C.ALL.forEach(function(c){
    assert.match(c.id, /^c\.(p1|p2|m1|m2|m3|m4|m5|m6)\.[a-z][a-z-]*$/, "bad id " + c.id);
    assert.ok(!seen[c.id], "duplicate id " + c.id);
    seen[c.id] = 1;
  });
});

test("every concept carries all four teaching fields and aliases", function(){
  C.ALL.forEach(function(c){
    assert.ok(c.name && c.name.length > 2, c.id + " has a thin name");
    ["plain","example","client"].forEach(function(k){
      assert.ok(c[k] && c[k].length > 10, c.id + " has a thin " + k);
    });
    assert.ok(Array.isArray(c.aliases) && c.aliases.length >= 2, c.id + " needs aliases");
  });
});

test("no em-dashes anywhere in the bank", function(){
  var bad = C.ALL.filter(function(c){
    return ["name","plain","example","client"].some(function(k){ return /—|--/.test(c[k]); });
  });
  assert.deepStrictEqual(bad.map(function(c){ return c.id; }), []);
});

test("byId and findInText work", function(){
  assert.strictEqual(C.byId("c.p1.speed").pack, "p1");
  assert.strictEqual(C.byId("c.nope.nope"), null);
  var hits = C.findInText("the page was slow so she bounced");
  assert.ok(hits.some(function(c){ return c.id === "c.p1.speed"; }));
});
