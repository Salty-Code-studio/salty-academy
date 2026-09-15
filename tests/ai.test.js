var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/rubric.js");
require("../engine/ai.js");
var AI = global.window.SA_AI;

var ITEM = {
  data: {
    ask: "What is the actual money problem with a five second load time?",
    rubric: { must: [ ["slow","seconds","speed","load"], ["leave","lose","gone","bounce"] ] },
    model: "Her site takes five seconds to load, so most visitors leave before it appears."
  }
};

var originalFetch = global.fetch;

function restoreFetch(){
  if (originalFetch === undefined) delete global.fetch;
  else global.fetch = originalFetch;
}

test("with graderUrl null it grades locally and never calls fetch", function(){
  global.window.SA_CONFIG = { graderUrl: null };
  var called = false;
  global.fetch = function(){ called = true; throw new Error("fetch should not be called"); };
  try {
    return AI.grade(ITEM, "Her site is slow so most phone visitors leave before it loads.").then(function(r){
      assert.strictEqual(called, false);
      assert.strictEqual(r.state, "understood");
    });
  } finally {
    restoreFetch();
  }
});

test("a non-200 response falls back to local grading", function(){
  global.window.SA_CONFIG = { graderUrl: "https://grader.example/grade" };
  global.fetch = function(){
    return Promise.resolve({ ok:false, status:500, json:function(){ return Promise.resolve({}); } });
  };
  try {
    return AI.grade(ITEM, "Her site is slow so most phone visitors leave before it loads.").then(function(r){
      assert.strictEqual(r.remote, undefined);
      assert.strictEqual(r.state, "understood");
    });
  } finally {
    restoreFetch();
  }
});

test("a response whose state is not one of the three valid values falls back to local", function(){
  global.window.SA_CONFIG = { graderUrl: "https://grader.example/grade" };
  global.fetch = function(){
    return Promise.resolve({ ok:true, status:200, json:function(){ return Promise.resolve({ state:"maybe" }); } });
  };
  try {
    return AI.grade(ITEM, "Her site is slow so most phone visitors leave before it loads.").then(function(r){
      assert.strictEqual(r.remote, undefined);
      assert.strictEqual(r.state, "understood");
    });
  } finally {
    restoreFetch();
  }
});

test("a rejected fetch falls back to local grading", function(){
  global.window.SA_CONFIG = { graderUrl: "https://grader.example/grade" };
  global.fetch = function(){ return Promise.reject(new Error("network down")); };
  try {
    return AI.grade(ITEM, "Her site is slow so most phone visitors leave before it loads.").then(function(r){
      assert.strictEqual(r.remote, undefined);
      assert.strictEqual(r.state, "understood");
    });
  } finally {
    restoreFetch();
  }
});

test("a hung fetch falls back to local grading within the timeout", function(){
  global.window.SA_CONFIG = { graderUrl: "https://grader.example/grade" };
  global.fetch = function(url, opts){
    return new Promise(function(resolve, reject){
      opts.signal.addEventListener("abort", function(){
        reject(new Error("aborted"));
      });
      /* deliberately never resolves on its own, this is the hung worker */
    });
  };
  try {
    return AI.grade(ITEM, "Her site is slow so most phone visitors leave before it loads.", 30).then(function(r){
      assert.strictEqual(r.remote, undefined);
      assert.strictEqual(r.state, "understood");
    });
  } finally {
    restoreFetch();
  }
});
