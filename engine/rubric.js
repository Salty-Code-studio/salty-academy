/* Salty Academy engine · local rubric grading.
   Grades the meaning an author anticipated, and admits when it cannot tell. */
(function(root){
"use strict";
var U = root.SA_UTIL;

function stemList(text){
  return U.words(text).map(function(w){ return U.stem(w); });
}

/* Stemming alone is not enough: "bouncing" stems to "bounc" while "bounce" stems to "bounce",
   and "losing" stems to "los" while "lose" stays "lose". So two stems also match when one is a
   prefix of the other and the shorter is at least three characters. Rubric authors control the
   synonym lists, so the occasional loose match (car / care) is a cost worth paying. */
function stemsMatch(a, b){
  if (a === b) return true;
  var short = a.length < b.length ? a : b, long = a.length < b.length ? b : a;
  return short.length >= 3 && long.indexOf(short) === 0;
}

function groupHit(group, stemList, flat){
  return group.some(function(syn){
    var n = U.norm(syn);
    if (n.indexOf(" ") >= 0) return flat.indexOf(" " + n + " ") >= 0;
    var target = U.stem(n);
    return stemList.some(function(s){ return stemsMatch(s, target); });
  });
}

function grade(answer, rubric){
  var text = String(answer == null ? "" : answer);
  var stems = stemList(text);
  var flat = " " + U.norm(text) + " ";
  var wordCount = U.words(text).length;
  var must = (rubric && rubric.must) || [];
  var nice = (rubric && rubric.nice) || [];
  var miss = (rubric && rubric.miss) || [];
  var minMust = rubric && typeof rubric.minMust === "number"
    ? rubric.minMust : Math.ceil(must.length / 2);

  var hit = [], missed = [], niceHit = [];
  must.forEach(function(g, i){ (groupHit(g, stems, flat) ? hit : missed).push(i); });
  nice.forEach(function(g, i){ if (groupHit(g, stems, flat)) niceHit.push(i); });

  var misconception = null;
  for (var i=0;i<miss.length;i++){
    if (groupHit(miss[i].match, stems, flat)) { misconception = miss[i].say; break; }
  }

  var state;
  if (!wordCount) state = "notyet";
  else if (must.length && hit.length === must.length) state = "understood";
  else if (hit.length >= minMust && hit.length > 0) state = "partial";
  else state = "notyet";

  if (misconception && state === "understood") state = "partial";

  var lowConfidence = false;
  if (wordCount) {
    if (state === "understood" && wordCount < 5) lowConfidence = true;
    if (state === "notyet" && wordCount > 25) lowConfidence = true;
  }

  var reason, nudge = "";
  if (state === "understood") reason = "You named the parts that matter.";
  else if (state === "partial") reason = misconception ? "Close, with one thing turned around." : "Half of it is there.";
  else reason = "That is not the idea being tested yet.";
  if (misconception) nudge = misconception;
  else if (missed.length) nudge = "Still missing: " + missed.length + " of the " + must.length + " parts. Read the model answer below.";

  return { state:state, hit:hit, missed:missed, niceHit:niceHit,
           misconception:misconception, lowConfidence:lowConfidence,
           reason:reason, nudge:nudge, words:wordCount };
}

root.SA_RUBRIC = { grade:grade };
})(typeof window !== "undefined" ? window : global);
