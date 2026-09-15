/* Salty Academy engine · concept mastery, confidence weighting and spaced repetition */
(function(root){
"use strict";
var C = root.SA_CONCEPTS;
var DAY = 86400000;
var BOX_DAYS = [0, 1, 3, 7, 16, 35];
var MAX_BOX = 5;

function blank(){ return { box:0, fragile:false, misconception:false, due:0, seen:0, ok:0 }; }

function state(player, id){
  if (!player.concepts) player.concepts = {};
  var s = player.concepts[id];
  if (!s) return blank();
  return Object.assign({}, s);
}

function record(player, conceptIds, correct, confidence, nowMs){
  if (!player.concepts) player.concepts = {};
  (conceptIds || []).forEach(function(id){
    var s = player.concepts[id] || blank();
    s.seen++;
    if (correct){
      s.ok++;
      if (confidence !== "guess"){ s.misconception = false; }
      if (confidence === "guess"){ s.fragile = true; }
      else { s.fragile = false; s.box = Math.min(MAX_BOX, s.box + 1); }
    } else {
      if (confidence === "know"){ s.box = 0; s.misconception = true; }
      else { s.box = Math.max(0, s.box - 1); }
      s.fragile = false;
    }
    var days = (correct && confidence === "guess") ? 1 : BOX_DAYS[s.box];
    s.due = nowMs + days * DAY;
    player.concepts[id] = s;
  });
}

function packMastery(player, packId){
  var list = C.byPack(packId);
  if (!list.length) return 0;
  var sum = 0;
  list.forEach(function(c){ sum += state(player, c.id).box / MAX_BOX; });
  return Math.round(100 * sum / list.length);
}

function totalMastery(player){
  var all = C.ALL;
  if (!all.length) return 0;
  var sum = 0;
  all.forEach(function(c){ sum += state(player, c.id).box / MAX_BOX; });
  return Math.round(100 * sum / all.length);
}

function due(player, nowMs){
  var out = [];
  Object.keys(player.concepts || {}).forEach(function(id){
    var s = player.concepts[id];
    if (s.seen > 0 && s.due <= nowMs) out.push(id);
  });
  return out;
}

function weights(player){
  var w = {};
  C.ALL.forEach(function(c){
    var s = state(player, c.id);
    if (!s.seen) { w[c.id] = 2.5; return; }
    if (s.misconception) { w[c.id] = 3; return; }
    if (s.fragile) { w[c.id] = 2; return; }
    w[c.id] = s.box < 2 ? 2 : 1;
  });
  return w;
}

function label(player, id){
  var s = state(player, id);
  if (!s.seen) return "new";
  if (s.misconception || s.fragile || s.box < 2) return "shaky";
  if (s.box < 4) return "getting there";
  return "solid";
}

root.SA_MASTERY = { record:record, state:state, packMastery:packMastery, totalMastery:totalMastery,
                    due:due, weights:weights, label:label, BOX_DAYS:BOX_DAYS, MAX_BOX:MAX_BOX };
})(typeof window !== "undefined" ? window : global);
