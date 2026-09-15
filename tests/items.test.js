var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/concepts.js");
require("../engine/items.js");
var IT = global.window.SA_ITEMS;

function fixture(){
  return {
    ACADEMY_PART1: [{ id:"p1", num:"P1", title:"T", icon:"x",
      cards:[{t:"Load time", d:"d", s:"s", id:"f.p1.speed.a", c:["c.p1.speed"]}],
      quiz:[{ id:"q.p1.speed.a", c:["c.p1.speed"], q:"Q?", a:["right","wrong"], why:"w" },
            { q:"untagged legacy", a:["a","b"], why:"w" }],
      translate:[], diagnose:[] }],
    ACADEMY_PART2: [],
    ACADEMY_EXTRAS: {},
    ACADEMY_MORE: {},
    ACADEMY_OPEN: { p1:[{ id:"o.p1.speed.a", c:["c.p1.speed"], use:"mastery",
      ask:"A?", rubric:{must:[["slow"]],minMust:1}, model:"m", why:"w" }] }
  };
}

test("build indexes tagged items by id, pack and concept", function(){
  var B = IT.build(fixture());
  assert.ok(B.byId["q.p1.speed.a"]);
  assert.strictEqual(B.byId["q.p1.speed.a"].format, "quiz");
  assert.strictEqual(B.byId["q.p1.speed.a"].pack, "p1");
  assert.strictEqual(B.byId["o.p1.speed.a"].format, "open");
  assert.strictEqual(B.byId["o.p1.speed.a"].use, "mastery");
  assert.ok(B.byConcept["c.p1.speed"].length >= 3);
  assert.strictEqual(B.byPack.p1.filter(function(i){ return i.format==="quiz"; }).length, 2);
});

test("use defaults to module", function(){
  var B = IT.build(fixture());
  assert.strictEqual(B.byId["q.p1.speed.a"].use, "module");
});

test("untagged legacy items get a generated id and are reported", function(){
  var B = IT.build(fixture());
  assert.strictEqual(B.untagged.length, 1);
  assert.match(B.untagged[0].id, /^legacy\.p1\.quiz\.1$/);
  assert.deepStrictEqual(B.untagged[0].concepts, []);
});

test("a bad concept id throws with the offending item id", function(){
  var f = fixture();
  f.ACADEMY_PART1[0].quiz[0].c = ["c.p1.nonexistent"];
  assert.throws(function(){ IT.build(f); }, /q\.p1\.speed\.a.*c\.p1\.nonexistent/);
});

test("a duplicate id throws", function(){
  var f = fixture();
  f.ACADEMY_PART1[0].translate = [{ id:"q.p1.speed.a", c:["c.p1.speed"], setup:"s", a:["a","b"], why:"w" }];
  assert.throws(function(){ IT.build(f); }, /duplicate/i);
});

test("a malformed id throws", function(){
  var f = fixture();
  f.ACADEMY_PART1[0].quiz[0].id = "q.p1.Speed.1";
  assert.throws(function(){ IT.build(f); }, /malformed/i);
});

test("build does not mutate the source globals, so a second build on the same globals yields the same item count", function(){
  var f = fixture();
  var B1 = IT.build(f);
  var B2 = IT.build(f);
  assert.strictEqual(B2.items.length, B1.items.length);
});

test("a concept tagged from a different pack than the item throws, naming item, concept and both packs", function(){
  var f = fixture();
  f.ACADEMY_PART1[0].quiz[0].c = ["c.m5.api"];
  assert.throws(function(){ IT.build(f); }, function(err){
    return /q\.p1\.speed\.a/.test(err.message) &&
           /c\.m5\.api/.test(err.message) &&
           /p1/.test(err.message) &&
           /m5/.test(err.message);
  });
});

test("a mastery item may tag a concept from a different pack on purpose", function(){
  var f = fixture();
  f.ACADEMY_OPEN.p1[0].c = ["c.m5.api"];
  var B = IT.build(f);
  assert.ok(B.byId["o.p1.speed.a"]);
  assert.deepStrictEqual(B.byId["o.p1.speed.a"].concepts, ["c.m5.api"]);
});

test("a c field that is not an array throws, naming the item id", function(){
  var f = fixture();
  f.ACADEMY_PART1[0].quiz[0].c = "c.p1.speed";
  assert.throws(function(){ IT.build(f); }, function(err){
    return /q\.p1\.speed\.a/.test(err.message) && /array/i.test(err.message);
  });
});

test("the real data files load without throwing", function(){
  var g = {};
  var saved = global.window;
  global.window = g;
  require("../data1.js"); require("../data2.js"); require("../data3.js"); require("../data4.js");
  try { require("../data5.js"); } catch(e){ /* data5 arrives in Task 8 */ }
  global.window = saved;
  var B = IT.build(g);
  assert.ok(B.items.length > 300, "expected the full bank, got " + B.items.length);
  console.log("untagged items remaining:", B.untagged.length, "of", B.items.length);
});
