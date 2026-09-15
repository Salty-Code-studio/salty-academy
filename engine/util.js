/* Salty Academy engine · shared utilities */
(function(root){
"use strict";

var STOP_ENDINGS = ["ings","ing","ers","er","es","s","ed","ly"];

function norm(s){
  return String(s == null ? "" : s)
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
function words(s){ var n = norm(s); return n ? n.split(" ") : []; }
function stem(w){
  w = norm(w);
  if (w.length <= 4) return w;
  for (var i=0;i<STOP_ENDINGS.length;i++){
    var e = STOP_ENDINGS[i];
    if (w.length - e.length >= 3 && w.slice(-e.length) === e) return w.slice(0, -e.length);
  }
  return w;
}
function shuffle(a){
  a = a.slice();
  for (var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
function esc(s){
  return String(s == null ? "" : s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

root.SA_UTIL = { norm:norm, words:words, stem:stem, shuffle:shuffle, esc:esc };
})(typeof window !== "undefined" ? window : global);
