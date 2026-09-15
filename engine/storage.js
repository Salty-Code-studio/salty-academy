/* Salty Academy engine · storage and the v1 to v2 migration */
(function(root){
"use strict";

var KEY = "salty-academy-game-v2";
var KEY_V1 = "salty-academy-game-v1";

function blankPlayer(){
  return { xp:0, badges:[], boss:{}, streak:0, lastDay:null, plays:0,
           history:[], last:null, concepts:{}, seen:{}, wrongQueue:[],
           completed:null, completedShown:false, openFlags:[] };
}

function migrate(v1){
  var out = { current:null, players:{}, migratedFromV1:true };
  if (!v1 || typeof v1 !== "object") return out;
  var players = v1.players && typeof v1.players === "object" ? v1.players : {};
  Object.keys(players).forEach(function(name){
    var o = players[name] || {}, p = blankPlayer();
    p.xp = typeof o.xp === "number" ? o.xp : 0;
    p.badges = Array.isArray(o.badges) ? o.badges.slice() : [];
    p.boss = o.boss && typeof o.boss === "object" ? o.boss : {};
    p.streak = typeof o.streak === "number" ? o.streak : 0;
    p.lastDay = o.lastDay || null;
    p.plays = typeof o.plays === "number" ? o.plays : 0;
    p.history = Array.isArray(o.history) ? o.history.slice(-40) : [];
    p.last = o.last || null;
    out.players[name] = p;
  });
  if (v1.current && out.players[v1.current]) out.current = v1.current;
  return out;
}

function parse(raw){ try { return JSON.parse(raw || "null"); } catch(e){ return null; } }

function load(getItem){
  var v2 = parse(getItem(KEY));
  if (v2 && v2.players) return v2;
  var v1 = parse(getItem(KEY_V1));
  if (v1 && v1.players) return migrate(v1);
  return { current:null, players:{} };
}

root.SA_STORAGE = { KEY:KEY, KEY_V1:KEY_V1, load:load, migrate:migrate, blankPlayer:blankPlayer };
})(typeof window !== "undefined" ? window : global);
