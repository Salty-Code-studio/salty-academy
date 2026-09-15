/* Salty Academy engine . item loader.
   The only module that knows the raw data shape. Everything else works on {id, pack, format, concepts, use, data}. */
(function(root){
"use strict";
var C = root.SA_CONCEPTS;

// First letter: q=quiz, t=translate, d=diagnose, o=open, x=match, f=flashcard, s=speak
var ID_RE = /^[qtdoxfs]\.(p1|p2|m1|m2|m3|m4|m5|m6)\.[a-z][a-z-]*\.[a-z]$/;
var FIELDS = [ ["cards","flash"], ["quiz","quiz"], ["translate","translate"],
               ["diagnose","diagnose"], ["speak","speak"], ["open","open"], ["match","match"] ];

function build(g){
  g = g || root;
  var packs = (g.ACADEMY_PART1 || []).concat(g.ACADEMY_PART2 || []);
  var extras = g.ACADEMY_EXTRAS || {};
  var more = g.ACADEMY_MORE || {};
  var open = g.ACADEMY_OPEN || {};

  var items = [], byId = {}, byPack = {}, byConcept = {}, untagged = [];

  packs.forEach(function(m){
    var e = extras[m.id] || {}, x = more[m.id] || {}, o = open[m.id] || {};
    if (e.idea) m.idea = e.idea;
    if (e.speak) m.speak = e.speak;

    var merged = {};
    FIELDS.forEach(function(pair){
      merged[pair[0]] = (m[pair[0]] || []).slice();
    });
    ["quiz","translate","diagnose"].forEach(function(k){
      if (x[k]) merged[k] = merged[k].concat(x[k]);
    });
    if (Array.isArray(o)) {
      o.forEach(function(it){
        var f = it.pairs ? "match" : "open";
        merged[f].push(it);
      });
    }
    byPack[m.id] = [];

    FIELDS.forEach(function(pair){
      var key = pair[0], format = pair[1];
      merged[key].forEach(function(raw, i){
        var id = raw.id;
        if (raw.c !== undefined && raw.c !== null && !Array.isArray(raw.c)){
          throw new Error("item " + (id || ("legacy." + m.id + "." + key + "." + i)) + ": c must be an array");
        }
        var concepts = Array.isArray(raw.c) ? raw.c.slice() : [];
        var use = (raw.use === "mastery" ? "mastery" : "module");
        if (!id){
          id = "legacy." + m.id + "." + key + "." + i;
          concepts = [];
        } else {
          if (!ID_RE.test(id)) throw new Error("malformed item id: " + id);
          concepts.forEach(function(cid){
            var concept = C.byId(cid);
            if (!concept) throw new Error("item " + id + " points at unknown concept " + cid);
            if (concept.pack !== m.id && use !== "mastery"){
              throw new Error("item " + id + " tags concept " + cid + " from pack " + concept.pack +
                               " but the item belongs to pack " + m.id);
            }
          });
        }
        if (byId[id]) throw new Error("duplicate item id: " + id);
        if (id && !id.startsWith("legacy.")) {
          var formatMap = {
            "quiz": "q",
            "translate": "t",
            "diagnose": "d",
            "open": "o",
            "match": "x",
            "flash": "f",
            "speak": "s"
          };
          var idLetter = id.charAt(0);
          var expectedLetter = formatMap[format];
          if (idLetter !== expectedLetter) {
            var fileLocation;
            if (idLetter === "q" || idLetter === "t" || idLetter === "d") {
              fileLocation = "its pack's own " + formatMap[idLetter === "q" ? "quiz" : (idLetter === "t" ? "translate" : "diagnose")] + " array in data1.js or data2.js, marked use:\"mastery\" if it is meant only for the final exams";
            } else {
              fileLocation = "data5.js with the ACADEMY_OPEN structure";
            }
            throw new Error("item " + id + " claims format " + idLetter + " but was loaded as " + format + ". This item belongs in " + fileLocation);
          }
        }
        var item = { id:id, pack:m.id, format:format, concepts:concepts, use:use, data:raw };
        byId[id] = item;
        items.push(item);
        byPack[m.id].push(item);
        if (!concepts.length) untagged.push(item);
        concepts.forEach(function(cid){
          (byConcept[cid] = byConcept[cid] || []).push(item);
        });
      });
    });
  });

  return { items:items, byId:byId, byPack:byPack, byConcept:byConcept, packs:packs, untagged:untagged };
}

root.SA_ITEMS = { build:build, ID_RE:ID_RE };
})(typeof window !== "undefined" ? window : global);
