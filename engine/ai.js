/* Salty Academy engine · the grading seam.
   With SA_CONFIG.graderUrl set, open answers go to a worker that holds the key server side.
   With it null, which is how the repo ships, everything is graded locally and offline. */
(function(root){
"use strict";
var R = root.SA_RUBRIC;

function local(item, answer){
  return R.grade(answer, item.data.rubric || {});
}

var DEFAULT_TIMEOUT_MS = 8000;

/* timeoutMs is an optional override, used by tests so a hung worker can be exercised without
   waiting out the real default. Production callers should not pass it. */
function grade(item, answer, timeoutMs){
  var cfg = root.SA_CONFIG || {};
  if (!cfg.graderUrl) return Promise.resolve(local(item, answer));

  /* A worker that accepts the connection and never responds must not hang the promise
     forever, so every request is bounded by an abortable timeout. If AbortController is not
     available in this environment, skip the network call entirely and grade locally rather
     than risk an unbounded hang. */
  if (typeof AbortController !== "function") return Promise.resolve(local(item, answer));

  var payload = {
    ask: item.data.ask,
    rubric: item.data.rubric,
    model: item.data.model,
    answer: String(answer || "")
  };

  var ms = typeof timeoutMs === "number" ? timeoutMs : DEFAULT_TIMEOUT_MS;
  var controller = new AbortController();
  var timer = setTimeout(function(){ controller.abort(); }, ms);

  return fetch(cfg.graderUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: controller.signal
  }).then(function(res){
    clearTimeout(timer);
    if (!res.ok) throw new Error("grader " + res.status);
    return res.json();
  }).then(function(j){
    if (!j || ["understood","partial","notyet"].indexOf(j.state) < 0) throw new Error("bad grader shape");
    /* misconception, reason and nudge are untrusted input from the worker: they are strings a
       remote server chose, not something this app generated. Do not escape them here. The
       renderer that puts them on the page escapes on output, and escaping twice would show the
       learner literal entity codes instead of the worker's text. The caller is responsible for
       escaping these three fields before inserting them into the DOM. */
    return { state:j.state, hit:[], missed:[], niceHit:[],
             misconception:j.misconception || null,
             lowConfidence: !!j.lowConfidence,
             reason: j.reason || "", nudge: j.nudge || "", words: 0, remote:true };
  }).catch(function(){
    clearTimeout(timer);
    return local(item, answer);
  });
}

root.SA_AI = { grade:grade, local:local };
})(typeof window !== "undefined" ? window : global);
