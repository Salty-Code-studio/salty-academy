/* Salty Academy engine . item loader.
   The only module that knows the raw data shape. Everything else works on {id, pack, format, concepts, use, data}. */
(function(root){
"use strict";
var C = root.SA_CONCEPTS;

var ID_RE = /^[qtdoxf]\.(p1|p2|m1|m2|m3|m4|m5|m6)\.[a-z][a-z-]*\.[a-z]$/;
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
    ["quiz","translate","diagnose"].forEach(function(k){
      if (x[k]) m[k] = (m[k] || []).concat(x[k]);
    });
    if (Array.isArray(o)) {
      o.forEach(function(it){
        var f = it.pairs ? "match" : "open";
        (m[f] = m[f] || []).push(it);
      });
    }
    byPack[m.id] = [];

    FIELDS.forEach(function(pair){
      var key = pair[0], format = pair[1];
      (m[key] || []).forEach(function(raw, i){
        var id = raw.id, concepts = Array.isArray(raw.c) ? raw.c.slice() : [];
        if (!id){
          id = "legacy." + m.id + "." + key + "." + i;
          concepts = [];
        } else {
          if (!ID_RE.test(id)) throw new Error("malformed item id: " + id);
          concepts.forEach(function(cid){
            if (!C.byId(cid)) throw new Error("item " + id + " points at unknown concept " + cid);
          });
        }
        if (byId[id]) throw new Error("duplicate item id: " + id);
        var item = { id:id, pack:m.id, format:format, concepts:concepts,
                     use:(raw.use === "mastery" ? "mastery" : "module"), data:raw };
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
