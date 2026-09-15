var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
var U = global.window.SA_UTIL;

test("norm lowercases, strips punctuation and accents, collapses spaces", function(){
  assert.strictEqual(U.norm("  The FIVE-second test, hé!  "), "the five second test he");
});

test("words splits normalised text", function(){
  assert.deepStrictEqual(U.words("speed, clarity and proof"), ["speed","clarity","and","proof"]);
});

test("stem trims common english endings on longer words only", function(){
  assert.strictEqual(U.stem("customers"), "custom");
  assert.strictEqual(U.stem("loading"), "load");
  assert.strictEqual(U.stem("slow"), "slow");
});

test("shuffle returns a new array with the same members", function(){
  var a = [1,2,3,4,5];
  var b = U.shuffle(a);
  assert.notStrictEqual(a, b);
  assert.deepStrictEqual(b.slice().sort(), a.slice().sort());
});

test("esc escapes html", function(){
  assert.strictEqual(U.esc('<b>"x"</b>'), "&lt;b&gt;&quot;x&quot;&lt;/b&gt;");
});
