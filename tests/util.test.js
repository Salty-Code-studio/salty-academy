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
  assert.strictEqual(U.stem("seconds"), "second");
  assert.strictEqual(U.stem("bouncing"), "bounc");
  assert.strictEqual(U.stem("leaves"), "leav");
  assert.strictEqual(U.stem("slow"), "slow");
});

test("stem does not strip a doubled vowel plus suffix", function(){
  assert.strictEqual(U.stem("speed"), "speed");
  assert.strictEqual(U.stem("speeds"), "speed");
  assert.strictEqual(U.stem("speeding"), "speed");
  assert.strictEqual(U.stem("need"), "need");
  assert.strictEqual(U.stem("needs"), "need");
  assert.strictEqual(U.stem("needed"), "need");
  assert.strictEqual(U.stem("feed"), "feed");
  assert.strictEqual(U.stem("feeding"), "feed");
  assert.strictEqual(U.stem("seed"), "seed");
  assert.strictEqual(U.stem("seeding"), "seed");
  assert.strictEqual(U.stem("agreed"), "agreed");
  assert.strictEqual(U.stem("succeed"), "succeed");
  assert.strictEqual(U.stem("proceed"), "proceed");
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
