/* Salty Academy engine · the grading seam.
   With SA_CONFIG.graderUrl set, open answers go to a worker that holds the key server side.
   With it null, which is how the repo ships, everything is graded locally and offline. */
(function(root){
"use strict";
var R = root.SA_RUBRIC;

function local(item, answer){
  return R.grade(answer, item.data.rubric || {});
}

function grade(item, answer){
  var cfg = root.SA_CONFIG || {};
  if (!cfg.graderUrl) return Promise.resolve(local(item, answer));
  var payload = {
    ask: item.data.ask,
    rubric: item.data.rubric,
    model: item.data.model,
    answer: String(answer || "")
  };
  return fetch(cfg.graderUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(function(res){
    if (!res.ok) throw new Error("grader " + res.status);
    return res.json();
  }).then(function(j){
    if (!j || ["understood","partial","notyet"].indexOf(j.state) < 0) throw new Error("bad grader shape");
    return { state:j.state, hit:[], missed:[], niceHit:[],
             misconception:j.misconception || null,
             lowConfidence: !!j.lowConfidence,
             reason: j.reason || "", nudge: j.nudge || "", words: 0, remote:true };
  }).catch(function(){
    return local(item, answer);
  });
}

root.SA_AI = { grade:grade, local:local };
})(typeof window !== "undefined" ? window : global);
