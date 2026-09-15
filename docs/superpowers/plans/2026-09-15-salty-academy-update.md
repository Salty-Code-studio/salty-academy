# Salty Code Academy Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Salty Academy from a question-answering game into a learning system that tracks understanding per concept, teaches after every answer, grades open answers against rubrics, and ends in three cumulative mastery tests plus a completion cinematic.

**Architecture:** Keep the existing static single-page app exactly as it is (no build step, no framework, no backend). Add a stable **concept layer** in new `engine/*.js` modules that are plain browser globals and also `require()`-able in Node so they can be unit tested. Re-point mastery, review scheduling and test generation at concept IDs instead of positional item indices. All grading and question assembly runs locally in the browser; a feature-flagged seam (`window.SA_CONFIG.graderUrl`) lets a future Cloudflare Worker take over semantic grading without touching any other file. No API key ever reaches the client.

**Tech Stack:** Vanilla ES5-style JavaScript (the existing file uses `var` and `function`, match it), CSS custom properties, SVG, `localStorage`, `node --test` for unit tests, GitHub Pages for hosting.

## Global Constraints

- Repo root: `~/Desktop/SaltyCode/05-Marketing/salty-academy`. It is the git repo and the deployed GitHub Pages source. `git push` to `main` publishes.
- **No dependencies.** No npm install, no package manager, no bundler. `node --test` ships with Node 22 which is installed.
- **No network calls at runtime.** No CDN imports, no `fetch()` except behind the disabled `SA_CONFIG.graderUrl` flag. The app must work offline.
- **No API keys in the repo.** The repo is public.
- Match existing code style in `index.html`: `var` not `let`/`const`, `function` not arrow, string concatenation not template literals, double quotes in JS. New `engine/*.js` files follow the same style.
- Every new module ends with the UMD tail shown in Task 1 so it works as `window.X` in the browser and `require()` in tests.
- **Copy voice rule (applies to every question, explanation and label written in this plan):** no em-dashes or double hyphens anywhere in user-facing prose. Use commas, colons or full stops. Warm, plain, spoken-Dutch-English register.
- **Question voice rule:** short scenes from daily life ("a friend shows you her site and you cannot tell what she sells"), options max about 8 words, no textbook recall phrasing, no "which of the following", vary the length and structure of options so the longest is not always correct.
- `prefers-reduced-motion: reduce` must be honoured by every animation added.
- Never call `alert()`, `confirm()` or `prompt()`. The existing rank-up `alert()` at `index.html:461` gets removed in Task 8.
- All user-visible strings are English (the app is English-only today, do not add i18n).

## Scope

**In scope:** Brief items 1 through 8, plus spaced repetition and concept mastery from item 9.

**Out of scope, confirmed with Mo on 2026-09-15:** the optional placement/diagnostic test, and aggregate question-quality monitoring (meaningless without a backend, since the data lives on each learner's device).

## Current State (verified 2026-09-15)

- `index.html` (866 lines): CSS, markup shell, and the entire game engine in one IIFE starting at line 251.
- `data1.js` / `data2.js`: the 8 packs (`p1`, `p2`, `m1`..`m6`), each with `cards`, `quiz`, `translate`, `diagnose`.
- `data3.js`: `window.ACADEMY_EXTRAS`, per pack `idea` and `speak` prompts.
- `data4.js`: `window.ACADEMY_MORE`, the 2026-09-11 "human bank", merged into the pack pools at `index.html:256-261`.
- Inventory: 109 flashcards, 160 quiz (80 legacy + 80 human bank), 24 translate, 44 diagnose, 26 speak prompts. 363 items total, 228 of them multiple choice.
- Progress lives in `localStorage` under `salty-academy-game-v1` as `{current, players:{name:{xp, correct:{}, wrongQueue:[], badges:[], boss:{}, streak, lastDay, plays, history:[], last:{}}}}`.
- **Item IDs are positional** (`"q:p1:3"` built in `itemsOf()` at `index.html:328-335`). This is the thing that forces the storage migration in Task 2: rewriting and retiring questions renumbers every index.

## File Structure

**New files:**

| File | Responsibility |
|---|---|
| `config.js` | One object, `window.SA_CONFIG`. Holds the (null) grader URL and feature flags. Loaded first so everything else can read it. |
| `engine/util.js` | `norm()` text normalisation, `stem()`, `shuffle()`, `esc()`. Shared by engine and tests. |
| `engine/concepts.js` | The concept bank. One entry per teachable idea: stable id, pack, name, plain definition, example, how to say it to a client, aliases. Feeds mastery, the term expander and the term library. |
| `engine/items.js` | Loads the `data*.js` globals, assigns stable item IDs, attaches concept IDs, exposes pools by pack / format / concept. The single place that knows the data shape. |
| `engine/mastery.js` | Per-concept Leitner state, confidence-weighted updates, due dates, pack and total mastery, weak-spot weighting. |
| `engine/rubric.js` | Local semantic-ish grading of open answers against a compact rubric. Returns `understood` / `partial` / `notyet` plus a low-confidence flag. |
| `engine/ai.js` | The remote-grader seam. Same signature as `rubric.js`, returns a Promise, falls back to local when `SA_CONFIG.graderUrl` is null. |
| `engine/generate.js` | Assembles the three mastery tests from the concept bank and the mastery-only variant pools. Guarantees no exact repeats. |
| `engine/storage.js` | Load, save, and the v1 to v2 migration. |
| `views-mastery.js` | The three mastery test views, the completion cinematic, and the replay entry point. Keeps `index.html` from doubling in size. |
| `data5.js` | New formats: open-answer items with rubrics, matching items, and the mastery-only question variants. |
| `tests/*.test.js` | `node --test` unit tests, one file per engine module. |
| `docs/GRADER-WORKER.md` | The contract a future Cloudflare Worker must implement to take over grading. Written, not deployed. |

**Modified:**

| File | Change |
|---|---|
| `index.html` | Script tags for the new files; replace `itemsOf`/`mastery` with the concept-based versions; new answer-feedback panel; confidence default removed; home XP and level block; gradient pack bars; XP splash; mastery test entry points; profile achievement area. |
| `data1.js`, `data2.js`, `data4.js` | Content sweep: rewrite voice, add stable `id` and `c` (concept) fields per item, retire what cannot be saved. |
| `data3.js` | Add `c` (concept) fields to speak prompts. |

## Task Order

Tasks 1 to 7 build the engine with tests and change nothing a learner sees. Tasks 8 to 12 wire the UI. Task 13 is the content sweep, run once per pack (eight separate commits), and its packs can run in parallel once Task 4 has locked the schema. Task 14 verifies and deploys.

---

### Task 1: Test harness and shared utilities

**Files:**
- Create: `engine/util.js`
- Create: `tests/util.test.js`
- Create: `config.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `window.SA_UTIL` with `norm(s) -> string`, `words(s) -> string[]`, `stem(w) -> string`, `shuffle(a) -> array`, `esc(s) -> string`. Every later engine module requires it. Also `window.SA_CONFIG` with `{graderUrl: null, cinematicMs: 9000}`.

- [ ] **Step 1: Write the failing test**

Create `tests/util.test.js`:

```js
var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
var U = global.window.SA_UTIL;

test("norm lowercases, strips punctuation and accents, collapses spaces", function(){
  assert.strictEqual(U.norm("  The FIVE-second test, hé!  "), "the five second test he");
});

test("words splits normalised text", function(){
  assert.deepStrictEqual(U.words("speed, clarity and proof"), ["speed","clarity","and","proof"]);
});

test("stem trims common english endings on longer words only", function(){
  assert.strictEqual(U.stem("customers"), "custom");
  assert.strictEqual(U.stem("loading"), "load");
  assert.strictEqual(U.stem("slow"), "slow");
});

test("shuffle returns a new array with the same members", function(){
  var a = [1,2,3,4,5];
  var b = U.shuffle(a);
  assert.notStrictEqual(a, b);
  assert.deepStrictEqual(b.slice().sort(), a.slice().sort());
});

test("esc escapes html", function(){
  assert.strictEqual(U.esc('<b>"x"</b>'), "&lt;b&gt;&quot;x&quot;&lt;/b&gt;");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd ~/Desktop/SaltyCode/05-Marketing/salty-academy && node --test tests/`
Expected: FAIL, `Cannot find module '../engine/util.js'`

- [ ] **Step 3: Write the implementation**

Create `engine/util.js`:

```js
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
```

Note on `stem("customers")`: the loop tries `"ings"`, `"ing"`, `"ers"` and `"ers"` matches, leaving `"custom"`. `stem("loading")` matches `"ing"`, leaving `"load"`. `stem("slow")` is 4 characters so it returns unchanged.

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/`
Expected: PASS, 5 tests.

- [ ] **Step 5: Create the config file**

Create `config.js`:

```js
/* Salty Academy runtime config.
   graderUrl stays null in the repo. Setting it to a deployed Cloudflare Worker
   URL switches open-answer grading from the local rubric matcher to a real model.
   See docs/GRADER-WORKER.md for the contract. Never put an API key in this file. */
window.SA_CONFIG = {
  graderUrl: null,
  cinematicMs: 9000
};
```

- [ ] **Step 6: Commit**

```bash
git add engine/util.js tests/util.test.js config.js docs/superpowers/plans/
git commit -m "Engine foundation: shared utils, test harness, runtime config"
```

---

### Task 2: Storage v2 and the migration off positional item IDs

**Files:**
- Create: `engine/storage.js`
- Create: `tests/storage.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `window.SA_STORAGE` with `KEY`, `load(rawGetter) -> state`, `migrate(v1state) -> v2state`, `blankPlayer() -> player`. The v2 player shape is `{xp, badges:[], boss:{}, streak, lastDay, plays, history:[], last:{}, concepts:{}, seen:{}, wrongQueue:[], completed:null, completedShown:false, openFlags:[]}`.

**Why this task exists:** every item ID today is `kind:pack:index`. Tasks 13 to 20 rewrite and retire questions, which renumbers those indices, which would silently mark the wrong questions as already-known. So item-level history from v1 is not portable and gets dropped on purpose. XP, rank, badges, mastered packs, streak and round history all carry over, so the learner does not lose their standing.

- [ ] **Step 1: Write the failing test**

Create `tests/storage.test.js`:

```js
var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/storage.js");
var ST = global.window.SA_STORAGE;

var V1 = {
  current: "Mo",
  players: {
    Mo: { xp: 1450, correct: {"q:p1:3":1,"c:m2:0":1}, wrongQueue: ["q:m6:7"],
          badges: ["streak7","boss-p1"], boss: {p1:1,p2:1}, streak: 4,
          lastDay: "2026-09-14", plays: 31, history: [{t:1,pack:"p1",label:"Salty Sprint",score:7,n:8}] }
  }
};

test("migrate keeps standing and drops positional item history", function(){
  var v2 = ST.migrate(V1);
  var p = v2.players.Mo;
  assert.strictEqual(p.xp, 1450);
  assert.strictEqual(p.streak, 4);
  assert.deepStrictEqual(p.boss, {p1:1,p2:1});
  assert.deepStrictEqual(p.badges, ["streak7","boss-p1"]);
  assert.strictEqual(p.history.length, 1);
  assert.strictEqual(p.correct, undefined);
  assert.deepStrictEqual(p.wrongQueue, []);
  assert.deepStrictEqual(p.concepts, {});
  assert.strictEqual(v2.current, "Mo");
  assert.strictEqual(v2.migratedFromV1, true);
});

test("migrate is safe on an empty or broken v1 blob", function(){
  assert.deepStrictEqual(ST.migrate(null).players, {});
  assert.deepStrictEqual(ST.migrate({players:null}).players, {});
});

test("blankPlayer has every v2 field", function(){
  var p = ST.blankPlayer();
  ["xp","badges","boss","streak","lastDay","plays","history","last","concepts","seen","wrongQueue","completed","completedShown","openFlags"]
    .forEach(function(k){ assert.ok(k in p, "missing " + k); });
  assert.strictEqual(p.xp, 0);
  assert.strictEqual(p.completed, null);
});

test("load prefers v2 and falls back to migrating v1", function(){
  var store = {};
  store["salty-academy-game-v1"] = JSON.stringify(V1);
  var s1 = ST.load(function(k){ return store[k] || null; });
  assert.strictEqual(s1.players.Mo.xp, 1450);
  assert.strictEqual(s1.migratedFromV1, true);

  store["salty-academy-game-v2"] = JSON.stringify({current:"Rudo", players:{Rudo:ST.blankPlayer()}});
  var s2 = ST.load(function(k){ return store[k] || null; });
  assert.strictEqual(s2.current, "Rudo");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/storage.test.js`
Expected: FAIL, `Cannot find module '../engine/storage.js'`

- [ ] **Step 3: Write the implementation**

Create `engine/storage.js`:

```js
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/storage.test.js`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add engine/storage.js tests/storage.test.js
git commit -m "Storage v2 with a migration that keeps xp, rank and mastered packs"
```

---

### Task 3: The concept bank

**Files:**
- Create: `engine/concepts.js`
- Create: `tests/concepts.test.js`

**Interfaces:**
- Consumes: `window.SA_UTIL`.
- Produces: `window.SA_CONCEPTS` with `ALL` (array), `byId(id) -> concept|null`, `byPack(packId) -> concept[]`, `ids() -> string[]`, `findInText(text) -> concept[]` (used by the term expander in Task 9).

**Concept shape:**

```js
{ id:"c.p1.speed",              // stable forever, never renumber
  pack:"p1",
  name:"Load time",             // what it is called
  plain:"How long from tap to a usable page. Past three seconds most mobile visitors are already gone.",
  example:"A cafe site with huge unresized photos takes six seconds on hotel wifi. The visitor never sees the menu.",
  client:"Your site takes six seconds to open. Half your phone visitors leave before it appears, and they never tell you.",
  aliases:["load time","speed","slow","fast","three seconds","loading"] }
```

`plain`, `example` and `client` are exactly what the expandable term panel shows after an answer (brief item 4). `aliases` are what the rubric matcher and the term expander scan for, lowercase, no punctuation.

**Naming rule:** `c.<pack>.<short-slug>`. Slug is one or two words, no numbers, and never changes even if the wording of the concept name changes.

- [ ] **Step 1: Write the failing test**

Create `tests/concepts.test.js`:

```js
var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/concepts.js");
var C = global.window.SA_CONCEPTS;
var PACKS = ["p1","p2","m1","m2","m3","m4","m5","m6"];

test("every pack has at least eight concepts", function(){
  PACKS.forEach(function(p){
    assert.ok(C.byPack(p).length >= 8, p + " has only " + C.byPack(p).length);
  });
});

test("ids are unique and well formed", function(){
  var seen = {};
  C.ALL.forEach(function(c){
    assert.match(c.id, /^c\.(p1|p2|m1|m2|m3|m4|m5|m6)\.[a-z][a-z-]*$/, "bad id " + c.id);
    assert.ok(!seen[c.id], "duplicate id " + c.id);
    seen[c.id] = 1;
  });
});

test("every concept carries all four teaching fields and aliases", function(){
  C.ALL.forEach(function(c){
    ["name","plain","example","client"].forEach(function(k){
      assert.ok(c[k] && c[k].length > 10, c.id + " has a thin " + k);
    });
    assert.ok(Array.isArray(c.aliases) && c.aliases.length >= 2, c.id + " needs aliases");
  });
});

test("no em-dashes anywhere in the bank", function(){
  var bad = C.ALL.filter(function(c){
    return ["name","plain","example","client"].some(function(k){ return /—|--/.test(c[k]); });
  });
  assert.deepStrictEqual(bad.map(function(c){ return c.id; }), []);
});

test("byId and findInText work", function(){
  assert.strictEqual(C.byId("c.p1.speed").pack, "p1");
  assert.strictEqual(C.byId("c.nope.nope"), null);
  var hits = C.findInText("the page was slow so she bounced");
  assert.ok(hits.some(function(c){ return c.id === "c.p1.speed"; }));
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/concepts.test.js`
Expected: FAIL, `Cannot find module '../engine/concepts.js'`

- [ ] **Step 3: Write the module skeleton and the full p1 bank**

Create `engine/concepts.js`. This is the exact opening and the complete `p1` block. The other seven packs follow the same shape and are listed in Step 4.

```js
/* Salty Academy engine · the concept bank.
   One entry per teachable idea. IDs are permanent: rename the `name`, never the `id`. */
(function(root){
"use strict";
var U = root.SA_UTIL;

var ALL = [

/* ---- p1 · Why Websites Lose Customers ---- */
{ id:"c.p1.conversion", pack:"p1", name:"Conversion",
  plain:"The moment a visitor does the thing you wanted: books, buys, messages or calls.",
  example:"Two hundred people visit the dive shop site this week and nine send a booking request. Those nine are the conversions.",
  client:"Visits are not the score. The score is how many of them actually book.",
  aliases:["conversion","converts","books","booking","buys","takes action"] },

{ id:"c.p1.cta", pack:"p1", name:"Call to action",
  plain:"The button or line that tells the visitor exactly what to do next. One per screen beats three.",
  example:"A homepage with Book now, Learn more and Follow us gives three choices, so most people make none.",
  client:"Right now your page offers three next steps. Pick the one that pays you and make it impossible to miss.",
  aliases:["call to action","cta","button","next step","book now"] },

{ id:"c.p1.hero", pack:"p1", name:"The hero",
  plain:"The big first block of the page: headline, image and the main button. It does most of the selling.",
  example:"Arxon's hero says what he does and where in one line, so nobody has to scroll to understand.",
  client:"The first screen is the whole shop window. Everything below it is for people you already convinced.",
  aliases:["hero","first screen","top of the page","headline block"] },

{ id:"c.p1.fold", pack:"p1", name:"Above the fold",
  plain:"Everything visible before scrolling. Prime real estate, and most visitors never leave it.",
  example:"The opening hours sit in the footer, so the hungry visitor checks a competitor instead of scrolling.",
  client:"If it matters, it goes where nobody has to scroll for it.",
  aliases:["above the fold","before scrolling","without scrolling","first thing they see"] },

{ id:"c.p1.speed", pack:"p1", name:"Load time",
  plain:"How long from tap to a usable page. Past three seconds more than half of mobile visitors are gone.",
  example:"A cafe site with huge unresized photos takes six seconds on hotel wifi. The visitor never sees the menu.",
  client:"Your site takes six seconds to open. Half your phone visitors leave before it appears, and they never tell you.",
  aliases:["load time","loading","speed","slow","fast","three seconds","first paint"] },

{ id:"c.p1.bounce", pack:"p1", name:"Bounce",
  plain:"A visitor who lands and leaves without doing anything at all.",
  example:"She lands, scrolls twice, taps nothing, leaves. That is a bounce, and you never hear about it.",
  client:"Most of the people you lost never complained. They just left, and that is the number we are fixing.",
  aliases:["bounce","bounced","leaves","left without","back button"] },

{ id:"c.p1.friction", pack:"p1", name:"Friction",
  plain:"Anything that makes the visitor think, wait or guess. Every bit of it costs you customers.",
  example:"A booking form asking for a company name from a tourist on holiday adds friction for nothing.",
  client:"Every extra field, every extra tap, costs you a percentage of the people who were ready to book.",
  aliases:["friction","hesitate","extra step","makes them think","too many fields"] },

{ id:"c.p1.proof", pack:"p1", name:"Social proof",
  plain:"Evidence that other people already trusted you: real reviews, real clients, real numbers, real names.",
  example:"Two food stands side by side, one has a queue. You join the queue without anyone telling you to.",
  client:"Strangers believe other customers long before they believe your homepage. Put the proof where they doubt.",
  aliases:["social proof","proof","reviews","testimonials","evidence","references"] },

{ id:"c.p1.value-prop", pack:"p1", name:"Value proposition",
  plain:"One sentence saying what you offer, who it is for, and why you. If a competitor could paste it, it says nothing.",
  example:"We are passionate about quality fails the copy-paste test. Custom windsurfing sails, built on Bonaire, passes it.",
  client:"If your competitor could paste your homepage line onto their site and nobody would notice, it is not selling.",
  aliases:["value proposition","what you sell","one sentence","copy paste test","positioning line"] },

{ id:"c.p1.five-second", pack:"p1", name:"The five second test",
  plain:"Show anyone a homepage for five seconds, take it away, then ask: what do they sell, who is it for, what do I do next?",
  example:"Show your aunt the site for five seconds. If she cannot answer all three, a real visitor was already gone.",
  client:"Let me show your homepage to someone for five seconds and ask them three questions. That is the whole audit.",
  aliases:["five second test","5 second test","three questions","what do they sell"] },

{ id:"c.p1.choice-overload", pack:"p1", name:"Choice overload",
  plain:"Too many options slow the decision down until no decision happens at all.",
  example:"A menu of twelve services with equal weight means the visitor picks none and closes the tab.",
  client:"More options feels generous. It reads as work, and work gets postponed forever.",
  aliases:["choice overload","too many options","too many choices","paralysis"] },

{ id:"c.p1.credibility", pack:"p1", name:"Credibility",
  plain:"Whether a stranger decides in a second that you look trustworthy and still in business.",
  example:"A copyright line saying 2019 quietly tells every visitor the business might be gone.",
  client:"Three out of four people judge whether a company is real by the website alone. Yours is doing that job right now.",
  aliases:["credibility","trust","trustworthy","looks real","professional"] },

{ id:"c.p1.audit", pack:"p1", name:"The audit",
  plain:"A structured walk through a site the way a customer sees it, ending in a short list of fixes ranked by money.",
  example:"Speed, clarity, proof, in that order, with one sentence per problem and what it costs.",
  client:"I look at your site the way your customer does, and I send you the list of what is losing you bookings.",
  aliases:["audit","review","fix list","walkthrough"] },

{ id:"c.p1.salesperson", pack:"p1", name:"The site is a salesperson",
  plain:"The website is your hardest working salesperson: on duty every hour, opening the door fast, making the offer clear and proving it.",
  example:"You would not hire a salesperson who takes six seconds to answer and then mumbles. That is a slow vague homepage.",
  client:"Think of the site as staff, not as a brochure. Right now that member of staff is losing you customers quietly.",
  aliases:["salesperson","hardest working","always on","staff member"] },

/* ---- p2 through m6 follow here, same shape ---- */

];

function byId(id){ for (var i=0;i<ALL.length;i++){ if (ALL[i].id===id) return ALL[i]; } return null; }
function byPack(p){ return ALL.filter(function(c){ return c.pack===p; }); }
function ids(){ return ALL.map(function(c){ return c.id; }); }
function findInText(text){
  var n = " " + U.norm(text) + " ";
  return ALL.filter(function(c){
    return c.aliases.some(function(a){ return n.indexOf(" " + U.norm(a) + " ") >= 0; });
  });
}

root.SA_CONCEPTS = { ALL:ALL, byId:byId, byPack:byPack, ids:ids, findInText:findInText };
})(typeof window !== "undefined" ? window : global);
```

- [ ] **Step 4: Write the remaining seven packs**

Use the same shape. These are the exact IDs to create, one per line. They come from the existing flashcard terms in `data1.js` / `data2.js` plus the named teachables that are already canon in the study modules. Read each pack's flashcards in `data1.js` / `data2.js` for the `plain` wording, and each pack's `speak` points in `data3.js` for the `client` wording, so the bank agrees with what the modules already teach.

```
p2: c.p2.bottleneck, c.p2.workflow, c.p2.automation, c.p2.human-loop, c.p2.integration,
    c.p2.api, c.p2.single-source, c.p2.saas, c.p2.custom-software, c.p2.back-office,
    c.p2.dashboard, c.p2.process-map, c.p2.quick-win, c.p2.scope, c.p2.manual-entry,
    c.p2.bottleneck-bill
m1: c.m1.ux, c.m1.ui, c.m1.seo, c.m1.local-seo, c.m1.responsive, c.m1.cms, c.m1.domain,
    c.m1.hosting, c.m1.frontend, c.m1.backend, c.m1.https, c.m1.analytics,
    c.m1.landing-page, c.m1.launch, c.m1.phone-test
m2: c.m2.brand, c.m2.positioning, c.m2.differentiator, c.m2.niche, c.m2.messaging,
    c.m2.tone, c.m2.visual-identity, c.m2.brand-kit, c.m2.perceived-value,
    c.m2.touchpoint, c.m2.rebrand, c.m2.audience, c.m2.diagnosis-map
m3: c.m3.funnel, c.m3.lead, c.m3.lead-magnet, c.m3.organic, c.m3.paid, c.m3.targeting,
    c.m3.creative, c.m3.remarketing, c.m3.conversion-rate, c.m3.reach, c.m3.engagement,
    c.m3.algorithm, c.m3.crm, c.m3.acquisition, c.m3.retention, c.m3.garden-faucet
m4: c.m4.ai, c.m4.llm, c.m4.assistants, c.m4.prompt, c.m4.context, c.m4.hallucination,
    c.m4.chatbot, c.m4.agent, c.m4.ai-workflow, c.m4.human-loop, c.m4.grounding,
    c.m4.training, c.m4.fast-junior
m5: c.m5.database, c.m5.backend, c.m5.frontend, c.m5.api, c.m5.webhook, c.m5.integration,
    c.m5.dashboard, c.m5.back-office, c.m5.internal-tool, c.m5.booking-engine,
    c.m5.realtime, c.m5.migration, c.m5.uptime, c.m5.backup, c.m5.permissions,
    c.m5.cloud, c.m5.three-layers
m6: c.m6.spine, c.m6.two-thirds, c.m6.insider-question, c.m6.tuesday-move,
    c.m6.normalization, c.m6.reflect-first, c.m6.one-recommendation, c.m6.close-lite,
    c.m6.story-arc, c.m6.translation-rule
```

Cross-pack duplicates are intentional and correct: `c.p2.human-loop` and `c.m4.human-loop` are the same idea taught from two angles, and a learner can be strong in one pack and weak in the other. Task 4 treats them as separate concepts.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test tests/concepts.test.js`
Expected: PASS, 5 tests. The first test enforces at least eight concepts per pack, which the lists above satisfy.

- [ ] **Step 6: Commit**

```bash
git add engine/concepts.js tests/concepts.test.js
git commit -m "The concept bank: stable ids, plain definitions, client wording"
```

---

### Task 4: The item loader and the locked content schema

**Files:**
- Create: `engine/items.js`
- Create: `tests/items.test.js`

**Interfaces:**
- Consumes: `window.SA_UTIL`, `window.SA_CONCEPTS`, and the `window.ACADEMY_*` globals from `data1.js` to `data5.js`.
- Produces: `window.SA_ITEMS` with `build(globals) -> {items, byId, byPack, byConcept, packs}`. Every item is `{id, pack, format, concepts:[], use, data}`. This is the only module that knows the raw data shape, and it is the contract the content sweep in Task 13 writes against.

**This task locks the content schema. No pack of the Task 13 content sweep can start until it is merged.**

**The schema every content file writes from here on:**

```js
// multiple choice, in pack.quiz / pack.translate / pack.diagnose
{ id:"q.p1.five-second.a",      // format-letter . pack . concept-slug . variant-letter
  c:["c.p1.five-second"],       // one or more concept ids, first is the primary
  use:"module",                 // "module" = normal rounds, "mastery" = mastery tests only
  q:"...", a:["correct","wrong","wrong","wrong"], why:"..." }

// open answer, new in data5.js
{ id:"o.p1.speed.a", c:["c.p1.speed"], use:"module",
  ask:"A cafe owner says her site is fine, it just takes a few seconds. What do you tell her?",
  rubric:{ must:[["slow","seconds","speed","load"],["leave","lose","gone","bounce","back"]],
           nice:[["never","silent","complain","tell you"]],
           miss:[{ match:["google","ranking","seo"],
                   say:"Speed does affect ranking, but the money problem is the visitor who left before the page appeared." }],
           minMust:1 },   // how many must-groups earn PARTIAL credit. Omit and it defaults to half, rounded up.
                          // Hitting every group is what earns "understood", so minMust must be lower than must.length.
  model:"Three seconds of blank screen feels the same as a broken site. Most phone visitors leave, and none of them complain, so she never hears about it.",
  why:"The point is the silence: she cannot see the customers she lost." }

// matching, new in data5.js
{ id:"x.p2.bottleneck.a", c:["c.p2.bottleneck","c.p2.workflow"], use:"module",
  ask:"Match each complaint to what is actually broken.",
  pairs:[ {l:"'I retype every booking into the calendar'", r:"Manual entry"},
          {l:"'Nobody knows which list is current'", r:"No single source of truth"},
          {l:"'It only jams on Saturdays'", r:"A bottleneck"} ],
  why:"..." }
```

Rules the loader enforces, so a typo in a data file fails a test instead of silently breaking mastery:
- Every item has an `id` matching `^[qtdox]\.(p1|p2|m1|m2|m3|m4|m5|m6)\.[a-z][a-z-]*\.[a-z]$`.
- Every `id` is globally unique.
- Every `c` entry resolves to a real concept in `SA_CONCEPTS`.
- Every `c` entry's pack matches the item's pack, except in `data5.js` mastery items which may cross packs.
- Legacy untagged items (anything still lacking `id` or `c` while the sweep is in progress) are loaded with a generated id `legacy.<pack>.<kind>.<index>` and an empty `concepts` array, and are reported in `build().untagged` so progress through the sweep is measurable.

- [ ] **Step 1: Write the failing test**

Create `tests/items.test.js`:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/items.test.js`
Expected: FAIL, `Cannot find module '../engine/items.js'`

- [ ] **Step 3: Write the implementation**

Create `engine/items.js`:

```js
/* Salty Academy engine · item loader.
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/items.test.js`
Expected: PASS, 6 tests.

- [ ] **Step 5: Add a real-data smoke test**

Append to `tests/items.test.js`:

```js
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
```

Run: `node --test tests/items.test.js`
Expected: PASS. It prints the untagged count, which starts near 363 and must reach 0 by the end of Task 13. That number is the progress bar for the content sweep.

- [ ] **Step 6: Commit**

```bash
git add engine/items.js tests/items.test.js
git commit -m "Item loader: stable ids, concept tags, schema validation"
```

---

### Task 5: Concept mastery, confidence weighting and spaced repetition

**Files:**
- Create: `engine/mastery.js`
- Create: `tests/mastery.test.js`

**Interfaces:**
- Consumes: `window.SA_CONCEPTS`.
- Produces: `window.SA_MASTERY` with `record(player, conceptIds, correct, confidence, nowMs)`, `state(player, conceptId) -> {box, fragile, misconception, due, seen, ok}`, `packMastery(player, packId) -> 0..100`, `totalMastery(player) -> 0..100`, `due(player, nowMs) -> conceptId[]`, `weights(player) -> {conceptId: number}`, `label(player, conceptId) -> "new"|"shaky"|"getting there"|"solid"`.

**The model.** Each concept sits in a Leitner box 0 to 5. `BOX_DAYS = [0, 1, 3, 7, 16, 35]`. A concept's contribution to mastery is `box / 5`.

Confidence changes what an answer means, which is the whole point of brief item 3:

| Result | Confidence | Effect |
|---|---|---|
| correct | `know` | box + 1, clears fragile |
| correct | `pretty` | box + 1, clears fragile |
| correct | `guess` | box unchanged, `fragile = true`, due tomorrow. Right answer, fragile knowledge. |
| wrong | `know` | box drops to 0, `misconception = true`. The expensive kind of wrong. |
| wrong | `pretty` | box drops by 1 |
| wrong | `guess` | box drops by 1, no misconception flag |

`weights()` is what makes Mastery 3 adaptive: `3` if `misconception`, `2` if `fragile`, `2` if `box < 2`, `1` otherwise, and `2.5` if the concept has never been seen.

- [ ] **Step 1: Write the failing test**

Create `tests/mastery.test.js`:

```js
var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/concepts.js");
require("../engine/mastery.js");
var M = global.window.SA_MASTERY;
var DAY = 86400000;
var T0 = 1789000000000;

function p(){ return { concepts:{} }; }

test("a confident correct answer promotes the concept a box", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  var s = M.state(pl, "c.p1.speed");
  assert.strictEqual(s.box, 1);
  assert.strictEqual(s.fragile, false);
  assert.strictEqual(s.due, T0 + 1*DAY);
});

test("correct but guessing marks the concept fragile and due tomorrow", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], true, "guess", T0);
  var s = M.state(pl, "c.p1.speed");
  assert.strictEqual(s.box, 1, "a guess does not promote");
  assert.strictEqual(s.fragile, true);
  assert.strictEqual(s.due, T0 + DAY);
});

test("wrong while sure is a misconception and resets the box", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], false, "know", T0);
  var s = M.state(pl, "c.p1.speed");
  assert.strictEqual(s.box, 0);
  assert.strictEqual(s.misconception, true);
});

test("wrong while guessing only drops one box and flags nothing", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  M.record(pl, ["c.p1.speed"], false, "guess", T0);
  var s = M.state(pl, "c.p1.speed");
  assert.strictEqual(s.box, 1);
  assert.strictEqual(s.misconception, false);
});

test("a later correct answer clears the misconception flag", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], false, "know", T0);
  M.record(pl, ["c.p1.speed"], true, "pretty", T0 + DAY);
  assert.strictEqual(M.state(pl, "c.p1.speed").misconception, false);
});

test("box never leaves 0 to 5", function(){
  var pl = p();
  for (var i=0;i<12;i++) M.record(pl, ["c.p1.speed"], true, "know", T0);
  assert.strictEqual(M.state(pl, "c.p1.speed").box, 5);
  for (var j=0;j<12;j++) M.record(pl, ["c.p1.speed"], false, "guess", T0);
  assert.strictEqual(M.state(pl, "c.p1.speed").box, 0);
});

test("recording hits every concept on the item", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed","c.p1.bounce"], true, "pretty", T0);
  assert.strictEqual(M.state(pl, "c.p1.speed").box, 1);
  assert.strictEqual(M.state(pl, "c.p1.bounce").box, 1);
});

test("pack mastery is the mean box of that pack's concepts", function(){
  var pl = p();
  assert.strictEqual(M.packMastery(pl, "p1"), 0);
  global.window.SA_CONCEPTS.byPack("p1").forEach(function(c){
    M.record(pl, [c.id], true, "know", T0);
    M.record(pl, [c.id], true, "know", T0);
  });
  var pct = M.packMastery(pl, "p1");
  assert.ok(pct > 35 && pct < 45, "two of five boxes is about 40 percent, got " + pct);
});

test("due returns only concepts whose due date has passed", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], true, "know", T0);
  assert.deepStrictEqual(M.due(pl, T0 + 1000), []);
  assert.deepStrictEqual(M.due(pl, T0 + 2*DAY), ["c.p1.speed"]);
});

test("weights rank misconception above fragile above weak above solid", function(){
  var pl = p();
  M.record(pl, ["c.p1.speed"], false, "know", T0);
  M.record(pl, ["c.p1.bounce"], true, "guess", T0);
  for (var i=0;i<5;i++) M.record(pl, ["c.p1.hero"], true, "know", T0);
  var w = M.weights(pl);
  assert.strictEqual(w["c.p1.speed"], 3);
  assert.strictEqual(w["c.p1.bounce"], 2);
  assert.strictEqual(w["c.p1.hero"], 1);
  assert.strictEqual(w["c.m6.spine"], 2.5, "never seen");
});

test("label describes the state in plain words", function(){
  var pl = p();
  assert.strictEqual(M.label(pl, "c.p1.speed"), "new");
  M.record(pl, ["c.p1.speed"], true, "guess", T0);
  assert.strictEqual(M.label(pl, "c.p1.speed"), "shaky");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/mastery.test.js`
Expected: FAIL, `Cannot find module '../engine/mastery.js'`

- [ ] **Step 3: Write the implementation**

Create `engine/mastery.js`:

```js
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
  return player.concepts[id] || blank();
}

function record(player, conceptIds, correct, confidence, nowMs){
  if (!player.concepts) player.concepts = {};
  (conceptIds || []).forEach(function(id){
    var s = player.concepts[id] || blank();
    s.seen++;
    if (correct){
      s.ok++;
      s.misconception = false;
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/mastery.test.js`
Expected: PASS, 11 tests.

- [ ] **Step 5: Commit**

```bash
git add engine/mastery.js tests/mastery.test.js
git commit -m "Concept mastery: Leitner boxes weighted by how sure the learner was"
```

---

### Task 6: The open-answer grader and the remote-grader seam

**Files:**
- Create: `engine/rubric.js`
- Create: `engine/ai.js`
- Create: `tests/rubric.test.js`
- Create: `docs/GRADER-WORKER.md`

**Interfaces:**
- Consumes: `window.SA_UTIL`.
- Produces: `window.SA_RUBRIC.grade(answer, rubric) -> {state, hit, missed, misconception, lowConfidence, reason, nudge}` where `state` is `"understood" | "partial" | "notyet"`. And `window.SA_AI.grade(item, answer) -> Promise<result>` with the same result shape.

**How the local grader works.** It is deliberately not pretending to be a language model. It matches meaning through synonym groups the question author supplies, and when the match is ambiguous it says so instead of guessing, which is exactly what the brief asks for.

1. Normalise the answer with `SA_UTIL.norm`, then stem every word.
2. A `must` group counts as hit when any of its synonyms appears, matched on stems plus a prefix rule so "customers" finds "customer", "loading" finds "load" and "bouncing" finds "bounce". Multi-word synonyms are matched as a normalised substring.
3. `state`: all `must` groups hit is `understood`. At least `minMust` (default: half the groups, rounded up) is `partial`. Below that is `notyet`. `minMust` must always be lower than the number of groups, otherwise `partial` becomes unreachable.
4. A `miss` entry that matches flags a misconception, which caps the state at `partial` and supplies the nudge text.
5. `lowConfidence` is true when the grader should not be trusted: a very short answer that still hit everything (under 5 words), or a long answer (over 25 words) that hit nothing, which usually means the learner said it in words the rubric did not anticipate. The UI in Task 10 shows those with a "read the model answer and tell me honestly" self-override rather than a verdict.

- [ ] **Step 1: Write the failing test**

Create `tests/rubric.test.js`:

```js
var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/rubric.js");
var R = global.window.SA_RUBRIC;

var SPEED = {
  must: [ ["slow","seconds","speed","load"], ["leave","lose","gone","bounce","back"] ],
  nice: [ ["never","silent","complain","tell you"] ],
  miss: [ { match:["google","ranking","seo"],
            say:"Speed does affect ranking, but the money problem is the visitor who left before the page appeared." } ]
};

test("hitting every must group is understood", function(){
  var r = R.grade("Her site is slow, so most phone visitors leave before it even loads.", SPEED);
  assert.strictEqual(r.state, "understood");
  assert.strictEqual(r.lowConfidence, false);
  assert.strictEqual(r.misconception, null);
});

test("stems match across word endings", function(){
  var r = R.grade("The loading takes ages and customers are losing patience and bouncing.", SPEED);
  assert.strictEqual(r.state, "understood");
});

test("half the groups is partial and names what is missing", function(){
  var r = R.grade("Her site takes about six seconds to open.", SPEED);
  assert.strictEqual(r.state, "partial");
  assert.deepStrictEqual(r.missed, [1]);
  assert.ok(r.nudge.length > 0);
});

test("nothing relevant is notyet", function(){
  var r = R.grade("I would redesign the logo and add more colour.", SPEED);
  assert.strictEqual(r.state, "notyet");
});

test("a known misconception caps the state and supplies the reason", function(){
  var r = R.grade("It is slow so Google will rank her lower and she loses traffic.", SPEED);
  assert.strictEqual(r.state, "partial");
  assert.ok(r.misconception.indexOf("ranking") >= 0);
});

test("a very short answer that hits everything is low confidence", function(){
  var r = R.grade("slow, they leave", SPEED);
  assert.strictEqual(r.state, "understood");
  assert.strictEqual(r.lowConfidence, true);
});

test("a long answer that hits nothing is low confidence, not a confident fail", function(){
  var long = "Honestly I think the real issue is that when somebody opens it on their phone " +
             "while they are standing outside the shop they give up almost immediately and go " +
             "somewhere else instead which she has no way of ever finding out about at all.";
  var r = R.grade(long, SPEED);
  assert.strictEqual(r.state, "notyet");
  assert.strictEqual(r.lowConfidence, true);
});

test("an empty answer is notyet and never low confidence", function(){
  var r = R.grade("   ", SPEED);
  assert.strictEqual(r.state, "notyet");
  assert.strictEqual(r.lowConfidence, false);
});

test("minMust defaults to half the groups rounded up", function(){
  var three = { must:[["a"],["b"],["c"]] };
  assert.strictEqual(R.grade("a b", three).state, "partial");
  assert.strictEqual(R.grade("a", three).state, "notyet");
});

test("nice groups do not change the state but are reported", function(){
  var r = R.grade("It is slow so they leave and she never even hears about it.", SPEED);
  assert.strictEqual(r.state, "understood");
  assert.deepStrictEqual(r.niceHit, [0]);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/rubric.test.js`
Expected: FAIL, `Cannot find module '../engine/rubric.js'`

- [ ] **Step 3: Write the implementation**

Create `engine/rubric.js`:

```js
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
```

Check the "long answer that hits nothing" test against this code: the sentence contains "give up", "go somewhere else", "finding out", none of which are in the synonym groups, so `hit` is empty and `state` is `notyet` with 45 words, so `lowConfidence` is true. That is the honest result: a human would call that answer correct, and the grader correctly refuses to call it wrong.

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/rubric.test.js`
Expected: PASS, 10 tests.

- [ ] **Step 5: Write the remote-grader seam**

Create `engine/ai.js`:

```js
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
```

Note the payload: question, compact rubric, model answer, learner answer. No course content, no question history, no transcript, which is brief item 10.3.

- [ ] **Step 6: Document the worker contract**

Create `docs/GRADER-WORKER.md` with: the endpoint shape above, the exact JSON the worker must return (`{state, reason, nudge, misconception, lowConfidence}`), the instruction that the worker holds the API key as a Cloudflare secret and never returns it, a rate limit note, and a one-paragraph statement that the client always falls back to local grading when the worker errors or is slow, so the app can never be broken by the worker being down.

- [ ] **Step 7: Commit**

```bash
git add engine/rubric.js engine/ai.js tests/rubric.test.js docs/GRADER-WORKER.md
git commit -m "Open-answer grading: local rubric matcher plus a seam for a future worker"
```

---

### Task 7: The mastery test generator

**Files:**
- Create: `engine/generate.js`
- Create: `tests/generate.test.js`

**Interfaces:**
- Consumes: `window.SA_CONCEPTS`, `window.SA_MASTERY`, `window.SA_UTIL`.
- Produces: `window.SA_GENERATE` with `unlocked(player, packIds) -> boolean`, `build(testNo, player, index, opts) -> {testNo, title, focus, items, shortfall}`, and `pickWeighted(pool, weightOf, n, rng) -> array`.

**The three tests, from the brief:**

| Test | Focus | Size | Formats allowed | Weighting |
|---|---|---|---|---|
| 1 | Recall and recognition | 14 | quiz, translate, flash, match | flat, plus a light lift for fragile concepts |
| 2 | Application | 14 | diagnose, open, match | flat across concepts, at least one per pack |
| 3 | Transfer and weak spots | 18 | all | full `SA_MASTERY.weights()` |

**The two rules that matter most:**

1. **Never recycle.** Every item the learner has already answered lives in `player.seen`. The generator excludes those ids outright, preferring items authored as `use:"mastery"`. Only if a test cannot be filled does it fall back to module items the learner has not seen, and only after that does it allow a repeat, reporting the count in `shortfall` so the content gap is visible rather than silent.
2. **Still sample the whole course.** Every test guarantees at least one item from each of the eight packs before weighting fills the rest, so a learner cannot pass while being blind to a whole pack.

- [ ] **Step 1: Write the failing test**

Create `tests/generate.test.js`:

```js
var test = require("node:test");
var assert = require("node:assert");
global.window = {};
require("../engine/util.js");
require("../engine/concepts.js");
require("../engine/mastery.js");
require("../engine/generate.js");
var G = global.window.SA_GENERATE;
var M = global.window.SA_MASTERY;
var PACKS = ["p1","p2","m1","m2","m3","m4","m5","m6"];

/* A fake index: 6 mastery items and 6 module items per pack, spread over that pack's concepts. */
function index(){
  var byPack = {}, byId = {}, items = [];
  PACKS.forEach(function(pk){
    var concepts = global.window.SA_CONCEPTS.byPack(pk);
    byPack[pk] = [];
    ["quiz","diagnose","open","match","translate","flash"].forEach(function(fmt, f){
      [0,1].forEach(function(v){
        var it = { id: fmt.charAt(0)+"."+pk+".gen"+f+"."+(v?"b":"a"),
                   pack: pk, format: fmt,
                   concepts: [concepts[(f+v) % concepts.length].id],
                   use: v ? "mastery" : "module", data: {} };
        items.push(it); byPack[pk].push(it); byId[it.id] = it;
      });
    });
  });
  return { items:items, byPack:byPack, byId:byId };
}

function player(){ return { boss:{}, seen:{}, concepts:{} }; }
function allMastered(p){ PACKS.forEach(function(k){ p.boss[k] = 1; }); return p; }

test("unlocked only once every pack is mastered", function(){
  var p = player();
  assert.strictEqual(G.unlocked(p, PACKS), false);
  PACKS.slice(0, 7).forEach(function(k){ p.boss[k] = 1; });
  assert.strictEqual(G.unlocked(p, PACKS), false);
  p.boss.m6 = 1;
  assert.strictEqual(G.unlocked(p, PACKS), true);
});

test("each test has the right size and covers every pack", function(){
  var idx = index(), p = allMastered(player());
  [[1,14],[2,14],[3,18]].forEach(function(pair){
    var t = G.build(pair[0], p, idx, {});
    assert.strictEqual(t.items.length, pair[1], "test " + pair[0] + " size");
    var packs = {};
    t.items.forEach(function(i){ packs[i.pack] = 1; });
    assert.strictEqual(Object.keys(packs).length, 8, "test " + pair[0] + " misses a pack");
  });
});

test("test 2 only uses application formats", function(){
  var t = G.build(2, allMastered(player()), index(), {});
  t.items.forEach(function(i){
    assert.ok(["diagnose","open","match"].indexOf(i.format) >= 0, "bad format " + i.format);
  });
});

test("a test never repeats an item inside itself", function(){
  var t = G.build(3, allMastered(player()), index(), {});
  var seen = {};
  t.items.forEach(function(i){ assert.ok(!seen[i.id], "repeat " + i.id); seen[i.id] = 1; });
});

test("items the learner has already answered are skipped while alternatives exist", function(){
  var idx = index(), p = allMastered(player());
  idx.items.filter(function(i){ return i.use === "module"; }).forEach(function(i){ p.seen[i.id] = 1; });
  var t = G.build(1, p, idx, {});
  t.items.forEach(function(i){ assert.strictEqual(p.seen[i.id], undefined, i.id + " was already answered"); });
  assert.strictEqual(t.shortfall, 0);
});

test("shortfall counts forced repeats instead of silently shrinking the test", function(){
  var idx = index(), p = allMastered(player());
  idx.items.forEach(function(i){ p.seen[i.id] = 1; });
  var t = G.build(3, p, idx, {});
  assert.strictEqual(t.items.length, 18);
  assert.ok(t.shortfall > 0, "expected a reported shortfall");
});

test("pickWeighted favours heavy entries with a stubbed rng", function(){
  var pool = ["light","heavy"];
  var w = function(x){ return x === "heavy" ? 9 : 1; };
  assert.deepStrictEqual(G.pickWeighted(pool, w, 1, function(){ return 0.5; }), ["heavy"]);
  assert.deepStrictEqual(G.pickWeighted(pool, w, 1, function(){ return 0.99; }), ["light"]);
  assert.strictEqual(G.pickWeighted(pool, w, 5, Math.random).length, 2, "never exceeds the pool");
});

test("test 3 leans on the learner's weak concepts", function(){
  var idx = index(), p = allMastered(player());
  var weak = global.window.SA_CONCEPTS.byPack("m4")[0].id;
  M.record(p, [weak], false, "know", 1789000000000);
  global.window.SA_CONCEPTS.ALL.forEach(function(c){
    if (c.id !== weak) for (var i=0;i<5;i++) M.record(p, [c.id], true, "know", 1789000000000);
  });
  var hits = 0;
  for (var r=0;r<40;r++){
    var t = G.build(3, p, idx, {});
    if (t.items.some(function(i){ return i.concepts.indexOf(weak) >= 0; })) hits++;
  }
  assert.ok(hits >= 30, "the weak concept appeared in only " + hits + " of 40 tests");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/generate.test.js`
Expected: FAIL, `Cannot find module '../engine/generate.js'`

- [ ] **Step 3: Write the implementation**

Create `engine/generate.js`:

```js
/* Salty Academy engine · mastery test assembly.
   Builds the three cumulative tests from the concept bank and the mastery-only item pools.
   Never copies a question the learner has already answered while any alternative exists. */
(function(root){
"use strict";
var C = root.SA_CONCEPTS;
var M = root.SA_MASTERY;

var SPEC = {
  1: { n:14, title:"Mastery 1", focus:"Recall and recognition",
       formats:["quiz","translate","flash","match"], weighted:false },
  2: { n:14, title:"Mastery 2", focus:"Application",
       formats:["diagnose","open","match"], weighted:false },
  3: { n:18, title:"Mastery 3", focus:"Transfer and weak spots",
       formats:null, weighted:true }
};

function unlocked(player, packIds){
  return packIds.every(function(id){ return !!(player.boss && player.boss[id]); });
}

function pickWeighted(pool, weightOf, n, rng){
  rng = rng || Math.random;
  var left = pool.slice(), out = [];
  while (out.length < n && left.length){
    var total = 0, i;
    for (i=0;i<left.length;i++) total += Math.max(0.0001, weightOf(left[i]));
    var r = rng() * total, acc = 0, chosen = left.length - 1;
    for (i=0;i<left.length;i++){
      acc += Math.max(0.0001, weightOf(left[i]));
      if (r < acc){ chosen = i; break; }
    }
    out.push(left.splice(chosen, 1)[0]);
  }
  return out;
}

function build(testNo, player, index, opts){
  opts = opts || {};
  var rng = opts.rng || Math.random;
  var spec = SPEC[testNo];
  var packIds = Object.keys(index.byPack);
  var conceptW = spec.weighted ? M.weights(player) : null;

  function allowed(it){ return !spec.formats || spec.formats.indexOf(it.format) >= 0; }
  function unseen(it){ return !(player.seen && player.seen[it.id]); }

  function weightOf(it){
    var base = 1;
    if (conceptW){
      var top = 0;
      it.concepts.forEach(function(cid){ top = Math.max(top, conceptW[cid] || 1); });
      base = top || 1;
    } else {
      var fragile = it.concepts.some(function(cid){
        var s = M.state(player, cid);
        return s.fragile || s.misconception;
      });
      base = fragile ? 1.6 : 1;
    }
    return base * (it.use === "mastery" ? 2 : 1);
  }

  /* Tier 1: unseen mastery-authored. Tier 2: unseen module. Tier 3: anything, counted as shortfall. */
  var tiers = [
    index.items.filter(function(it){ return allowed(it) && unseen(it) && it.use === "mastery"; }),
    index.items.filter(function(it){ return allowed(it) && unseen(it) && it.use === "module"; }),
    index.items.filter(allowed)
  ];

  var taken = {}, out = [], shortfall = 0;

  function takeFrom(pool, n, packFilter){
    var avail = pool.filter(function(it){
      return !taken[it.id] && (!packFilter || it.pack === packFilter);
    });
    var got = pickWeighted(avail, weightOf, n, rng);
    got.forEach(function(it){ taken[it.id] = 1; out.push(it); });
    return got.length;
  }

  /* One from each pack first, so the whole course stays sampled. */
  packIds.forEach(function(pk){
    for (var t=0;t<tiers.length;t++){
      if (takeFrom(tiers[t], 1, pk)) { if (t === 2) shortfall++; return; }
    }
  });

  /* Then fill to size, cheapest tier first. */
  for (var t=0;t<tiers.length && out.length < spec.n;t++){
    var before = out.length;
    var added = takeFrom(tiers[t], spec.n - out.length, null);
    if (t === 2) shortfall += added;
    if (out.length === before && t === 2) break;
  }

  return { testNo:testNo, title:spec.title, focus:spec.focus,
           items:root.SA_UTIL.shuffle(out).slice(0, spec.n), shortfall:shortfall };
}

root.SA_GENERATE = { unlocked:unlocked, build:build, pickWeighted:pickWeighted, SPEC:SPEC };
})(typeof window !== "undefined" ? window : global);
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/generate.test.js`
Expected: PASS, 8 tests.

If the "right size" test fails on test 2, the fake index does not hold enough application-format items per pack. That is the generator telling the truth about a content gap, and it is the same signal the real app uses: `shortfall` above zero on test 2 means Task 13 has not yet written enough `open`, `match` and `diagnose` mastery variants yet.

- [ ] **Step 5: Commit**

```bash
git add engine/generate.js tests/generate.test.js
git commit -m "Mastery test generator: no recycled questions, weighted at the weak spots"
```

---

### Task 8: Wire the engine into the app

**Files:**
- Modify: `index.html` (script tags at `:246-249`; the IIFE header at `:251-299`; `itemsOf`/`mastery`/`recalled`/`toRevisit`/`markCorrect`/`markWrong` at `:328-357`)

**Interfaces:**
- Consumes: every engine module from tasks 1 to 7.
- Produces: inside the IIFE, `IDX` (the built item index), `NOW()`, and a rewritten `mastery(m)` that delegates to `SA_MASTERY.packMastery`. `run.items` entries gain `.item` pointing at the indexed item. Nothing outside `index.html` changes.

This task must not change any visible behaviour except the pack percentages, which now mean demonstrated understanding instead of questions ticked off. It is the seam where everything could break, so it gets browser-verified on its own before any feature lands on top of it.

- [ ] **Step 1: Add the script tags**

In `index.html`, replace lines 246 to 249:

```html
<script src="data1.js"></script>
<script src="data2.js"></script>
<script src="data3.js"></script>
<script src="data4.js"></script>
```

with:

```html
<script src="config.js"></script>
<script src="engine/util.js"></script>
<script src="engine/concepts.js"></script>
<script src="engine/storage.js"></script>
<script src="engine/mastery.js"></script>
<script src="engine/rubric.js"></script>
<script src="engine/ai.js"></script>
<script src="data1.js"></script>
<script src="data2.js"></script>
<script src="data3.js"></script>
<script src="data4.js"></script>
<script src="data5.js"></script>
<script src="engine/items.js"></script>
<script src="engine/generate.js"></script>
<script src="views-mastery.js"></script>
```

Order matters: `items.js` must load after the data files, and `generate.js` after `mastery.js`.

- [ ] **Step 2: Create the two files that do not exist yet so the page does not 404**

Create `data5.js` with `window.ACADEMY_OPEN = {};` and a comment saying Task 13 fills it.
Create `views-mastery.js` with an empty IIFE and a comment saying Task 12 fills it.

- [ ] **Step 3: Replace the IIFE header**

In `index.html`, replace lines 253 to 261 (the `MODS` / `EXTRAS` / `MORE` merging block) with:

```js
var IDX = window.SA_ITEMS.build(window);
var MODS = IDX.packs;
var CN = window.SA_CONCEPTS, MY = window.SA_MASTERY, GEN = window.SA_GENERATE;
function NOW(){ return Date.now(); }
```

The merging of `ACADEMY_EXTRAS` and `ACADEMY_MORE` into the packs now happens inside `SA_ITEMS.build`, which is why it is deleted here.

- [ ] **Step 4: Replace storage and the player shape**

Replace lines 291 and 297 to 305:

```js
var KEY = "salty-academy-game-v1";
...
var S = load();
function load(){ try { return JSON.parse(localStorage.getItem(KEY)||"{}"); } catch(e){ return {}; } }
function save(){ localStorage.setItem(KEY, JSON.stringify(S)); }
if (!S.players) S.players = {};
function P(){ return S.players[S.current]; }
function newPlayer(name){
  S.players[name] = { xp:0, correct:{}, wrongQueue:[], badges:[], boss:{}, streak:0, lastDay:null, plays:0 };
  S.current = name; save();
}
```

with:

```js
var KEY = window.SA_STORAGE.KEY;
var S = window.SA_STORAGE.load(function(k){ return localStorage.getItem(k); });
function save(){ localStorage.setItem(KEY, JSON.stringify(S)); }
if (!S.players) S.players = {};
function P(){ return S.players[S.current]; }
function newPlayer(name){
  S.players[name] = window.SA_STORAGE.blankPlayer();
  S.current = name; save();
}
```

Then, immediately after, add the one-time migration notice so the learner understands why their pack bars reset:

```js
var migrationNotice = !!S.migratedFromV1;
if (migrationNotice){ delete S.migratedFromV1; save(); }
```

- [ ] **Step 5: Replace the item-level progress functions**

Replace lines 328 to 357 (`itemsOf` through `clearWrong`) with:

```js
function itemsOf(m){ return (IDX.byPack[m.id] || []).map(function(it){ return it.id; }); }
function mastery(m){ return MY.packMastery(P(), m.id); }
function totalMastery(){ return MY.totalMastery(P()); }
function recalled(m){
  var p = P(), n = 0;
  (IDX.byPack[m.id] || []).forEach(function(it){
    if (it.format === "flash" && p.seen[it.id]) n++;
  });
  return n;
}
function toRevisit(m){
  var p = P(), n = 0;
  (p.wrongQueue || []).forEach(function(id){
    var it = IDX.byId[id];
    if (it && it.pack === m.id) n++;
  });
  return n;
}
/* One call from every answer path: records the concept movement, the seen flag and the review queue. */
function recordAnswer(item, correct, confidence){
  var p = P();
  p.seen[item.id] = (p.seen[item.id] || 0) + 1;
  MY.record(p, item.concepts, correct, confidence, NOW());
  var at = p.wrongQueue.indexOf(item.id);
  if (correct){ if (at >= 0) p.wrongQueue.splice(at, 1); }
  else {
    if (at >= 0) p.wrongQueue.splice(at, 1);
    if (confidence === "know") p.wrongQueue.unshift(item.id);
    else p.wrongQueue.push(item.id);
  }
  save();
  checkAll();
}
```

`checkAll` at line 358 must also be updated: replace its flashcard loop with `p.seen` lookups over `IDX.items` where `format === "flash"`, and leave the `boss` check as it is.

- [ ] **Step 6: Point every call site at `recordAnswer`**

Four places currently write progress directly. Replace them:

- `GA.card` (`:799-804`): replace `markCorrect(it.id)` / `clearWrong` / `markWrong` with `recordAnswer(it.item, knew, knew ? "pretty" : "guess")`.
- `GA.speakGrade` (`:823-829`): level 2 becomes `recordAnswer(it.item, true, "pretty")`, level 1 becomes `recordAnswer(it.item, true, "guess")`, level 0 becomes `recordAnswer(it.item, false, "guess")`.
- `GA.answer` (`:830-853`): replace the `markCorrect` / `markWrong` / manual `wrongQueue.unshift` block with a single `recordAnswer(it.item, picked.ok, it.conf)`. The confident-miss reordering now lives inside `recordAnswer`, so delete the inline splice at `:844`.
- `reviewRun` (`:652-662`): rebuild it off the index instead of parsing the id string:

```js
function reviewRun(){
  var p = P(), items = [];
  p.wrongQueue.slice(0, 12).forEach(function(id){
    var it = IDX.byId[id];
    if (it) items.push({ kind: it.format, id: it.id, data: it.data, mod: mod(it.pack), item: it });
  });
  startRun("review", null, items, "learn");
  step();
}
```

- [ ] **Step 7: Attach `.item` wherever a run is built**

`wrapItems`, `poolMC`, `sprintRun`, `bossRun`, `cardsRun` and `speakOne` all build `{kind, id, data, mod}` objects. Every one of them must also set `item: IDX.byId[id]`. The simplest change is a single helper placed above `startRun`:

```js
function wrap(it){ return { kind:it.format, id:it.id, data:it.data, mod:mod(it.pack), item:it }; }
```

and rewriting the pool builders to map over `IDX.byPack[m.id]` filtered by format, rather than over `m.quiz` / `m.cards` with positional indices. `poolMC(m)` becomes:

```js
function poolMC(m){
  return (IDX.byPack[m.id] || []).filter(function(it){
    return it.use === "module" && ["quiz","translate","diagnose"].indexOf(it.format) >= 0;
  }).map(wrap);
}
```

and `cardsRun` uses the same filter with `format === "flash"`.

- [ ] **Step 8: Show the migration notice**

In `learn()` (`index.html:408`), after the resume banner block at `:427`, add:

```js
if (migrationNotice){
  h += '<div class="resume" style="border-color:var(--line)"><div class="grow">'
    + '<b>Your questions were rewritten.</b><br><span class="muted">'
    + 'The pack bars start fresh because they now track understanding per concept, not questions ticked off. '
    + 'Your xp, your rank and the packs you mastered are all still here.</span></div></div>';
  migrationNotice = false;
}
```

- [ ] **Step 9: Verify in the browser**

Run: `python3 -m http.server 8777 --directory ~/Desktop/SaltyCode/05-Marketing/salty-academy`

Open `http://localhost:8777` with the claude-in-chrome tools, reusing the existing tab group and working in one tab. Check, in order:
1. The console is clean, no 404s and no exceptions.
2. An existing player still shows their xp and rank.
3. The migration notice appears once, then not again after a reload.
4. Starting a Sprint still serves 8 questions and the pack bar moves after answering.
5. `localStorage.getItem("salty-academy-game-v2")` contains a `concepts` object with boxes in it.

- [ ] **Step 10: Commit**

```bash
git add index.html data5.js views-mastery.js
git commit -m "Point the app at the concept engine: mastery now means understanding"
```

---

### Task 9: Every question teaches

**Files:**
- Modify: `index.html` (`renderMC` at `:714-736`, `GA.answer` at `:830-853`, CSS near `:159`)

**Interfaces:**
- Consumes: `CN.byId`, `CN.findInText`, `IDX`.
- Produces: `teachPanel(item, headline) -> html` and `GA.term(conceptId)`, used again by the mastery tests in Task 12.

Brief item 4 in three parts: do not give the concept away before answering, teach after every answer whether right or wrong, and make key terms expandable.

- [ ] **Step 1: Remove the pre-selected confidence default**

In `renderMC`, delete line 721 (`it.conf = "pretty";`) and change line 731 from `class="chip sel"` to `class="chip"`. Then gate submission: the option buttons stay disabled until a confidence chip is chosen.

Replace the option loop and confidence block in `renderMC` with:

```js
  it.conf = null;
  h += '<p class="muted" style="margin:.2rem 0 .3rem">First: how sure are you?</p>'
    + '<div class="confrow">'
    + '<button class="chip" id="conf-guess" onclick="GA.conf(\'guess\')">I am guessing</button>'
    + '<button class="chip" id="conf-pretty" onclick="GA.conf(\'pretty\')">Pretty sure</button>'
    + '<button class="chip" id="conf-know" onclick="GA.conf(\'know\')">I know this</button>'
    + '</div>';
  it.shuffled.forEach(function(o,i){
    h += '<button class="opt" id="opt'+i+'" disabled onclick="GA.answer('+i+')">'
      + '<span class="letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(o.txt)+'</span></button>';
  });
  h += '<p class="muted" id="confhint" style="font-size:.78rem">Pick one of the three above to unlock the answers. Being honest here is the whole point.</p>';
```

and update `GA.conf` to enable the options once a chip is picked:

```js
  conf:function(level){
    var it = run.items[run.i]; it.conf = level;
    ["guess","pretty","know"].forEach(function(l){
      var b = document.getElementById("conf-"+l);
      if (b) b.classList.toggle("sel", l===level);
    });
    document.querySelectorAll(".opt").forEach(function(b){ b.disabled = false; });
    var hint = document.getElementById("confhint");
    if (hint) hint.textContent = "No timer. Think it through.";
  },
```

**Why the order flipped:** asking after the options are visible invites the learner to pick a chip that matches the answer they already committed to. Asking first makes it a real prediction.

- [ ] **Step 2: Write the teaching panel**

Add above `GA` (around `:770`):

```js
function teachPanel(item, headline){
  var d = item.data;
  var primary = item.concepts.length ? CN.byId(item.concepts[0]) : null;
  var h = '<div class="why">' + (headline || "")
    + esc(d.why || "") + '</div>';
  if (primary){
    h += '<div class="teach"><p class="eyebrow">The idea underneath</p>'
      + '<b>' + esc(primary.name) + '</b>'
      + '<p>' + esc(primary.plain) + '</p>'
      + '<p class="muted"><b>For example:</b> ' + esc(primary.example) + '</p>'
      + '<p class="clientline"><b>Say it to a client:</b> &ldquo;' + esc(primary.client) + '&rdquo;</p>'
      + '</div>';
  }
  var extra = CN.findInText([d.q, d.setup, d.say, d.ask, d.why, (d.a||[])[0]].join(" "))
    .filter(function(c){ return !primary || c.id !== primary.id; })
    .slice(0, 4);
  if (extra.length){
    h += '<p class="muted" style="margin:.7rem 0 .3rem">Terms in this question, tap to open:</p><div class="termrow">';
    extra.forEach(function(c){
      h += '<button class="chip term" onclick="GA.term(\'' + c.id + '\')">' + esc(c.name) + '</button>';
    });
    h += '</div><div id="termbox"></div>';
  }
  return h;
}
```

and in `GA`:

```js
  term:function(id){
    var c = CN.byId(id), box = document.getElementById("termbox");
    if (!c || !box) return;
    box.innerHTML = '<div class="teach"><b>' + esc(c.name) + '</b>'
      + '<p>' + esc(c.plain) + '</p>'
      + '<p class="muted"><b>For example:</b> ' + esc(c.example) + '</p>'
      + '<p class="clientline"><b>Say it to a client:</b> &ldquo;' + esc(c.client) + '&rdquo;</p></div>';
  },
```

- [ ] **Step 3: Use it in `GA.answer`**

Replace the `extra` construction at `:849-850` with:

```js
    var headline = picked.ok
      ? '<b>Correct.</b> '
      : '<b>The answer was:</b> ' + esc(d.a[0]) + '<br>';
    var extra = teachPanel(it.item, headline + esc(confNote) + ' ')
      + '<button class="btn wide" onclick="GA.next()">'
      + (run.i+1 >= run.items.length ? 'Finish' : 'Next') + ' →</button>';
```

Note that the correct answer is now shown on a correct answer too, not only on a miss, which is the "whether right or wrong" half of brief item 4.

- [ ] **Step 4: Add the CSS**

Near the play-flow styles at `:159`, add:

```css
  .teach { border:1px solid var(--line); border-left:3px solid var(--coral);
    border-radius:10px; padding:.85rem 1rem; margin:.7rem 0; background:var(--card); }
  .teach p { margin:.4rem 0 0; font-size:.92rem; line-height:1.5; }
  .teach .clientline { font-style:italic; }
  .termrow { display:flex; gap:.4rem; flex-wrap:wrap; }
  .chip.term { cursor:pointer; border-style:dashed; }
  .opt[disabled] { opacity:.45; cursor:not-allowed; }
```

- [ ] **Step 5: Verify in the browser**

Reload `http://localhost:8777`, start a Sprint, and confirm: the options are greyed out until a confidence chip is picked, a correct answer still shows what the answer was, the idea panel appears on every question, and tapping a term chip opens its definition without reloading the view.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "Every question teaches: confidence first, then the answer, the idea and the terms"
```

---

### Task 10: Open answers and matching in the runner

**Files:**
- Modify: `index.html` (`step()` at `:679-692`, the `GA` object, CSS)

**Interfaces:**
- Consumes: `SA_AI.grade`, `teachPanel` from Task 9.
- Produces: `renderOpen(it)`, `renderMatch(it)`, `GA.submitOpen()`, `GA.selfGrade(state)`, `GA.matchPick(side, i)`, `GA.submitMatch()`.

Brief item 1 asks for a mix of formats instead of four-option multiple choice everywhere. Two new formats carry that: a typed open answer graded against its rubric, and a small matching grid.

- [ ] **Step 1: Route the new formats**

In `step()`, replace the three-way branch at `:686-688`:

```js
  if (it.kind==="cards" || it.kind==="flash") h += renderCard(it);
  else if (it.kind==="speak") h += renderSpeak(it);
  else if (it.kind==="open") h += renderOpen(it);
  else if (it.kind==="match") h += renderMatch(it);
  else h += renderMC(it);
```

Note `"cards"` and `"flash"`: the run mode is still called `cards`, but `SA_ITEMS` names the format `flash`, so both must route to `renderCard`.

- [ ] **Step 2: Render the open answer**

```js
function renderOpen(it){
  var d = it.data;
  it.conf = null;
  return '<p class="eyebrow">In your own words</p>'
    + '<p class="qtext">' + esc(d.ask) + '</p>'
    + '<p class="muted" style="margin:.2rem 0 .3rem">First: how sure are you?</p>'
    + '<div class="confrow">'
    + '<button class="chip" id="conf-guess" onclick="GA.conf(\'guess\')">I am guessing</button>'
    + '<button class="chip" id="conf-pretty" onclick="GA.conf(\'pretty\')">Pretty sure</button>'
    + '<button class="chip" id="conf-know" onclick="GA.conf(\'know\')">I know this</button>'
    + '</div>'
    + '<textarea id="openans" rows="4" placeholder="Two or three sentences is plenty. Write it the way you would say it out loud."></textarea>'
    + '<button class="btn wide" id="opensubmit" disabled onclick="GA.submitOpen()">Check my answer</button>'
    + '<p class="muted" id="confhint" style="font-size:.78rem">Pick one of the three above first.</p>';
}
```

`GA.conf` from Task 9 enables `.opt` buttons. Extend it to also enable `#opensubmit` and `#matchsubmit` when they exist.

- [ ] **Step 3: Grade it**

```js
  submitOpen:function(){
    var it = run.items[run.i];
    var answer = document.getElementById("openans").value;
    document.getElementById("opensubmit").disabled = true;
    document.getElementById("openans").disabled = true;
    document.querySelectorAll(".confrow button").forEach(function(b){ b.disabled = true; });
    window.SA_AI.grade(it.item, answer).then(function(r){ showOpenResult(it, r); });
  },
```

```js
function showOpenResult(it, r){
  var d = it.data;
  var icon = r.state === "understood" ? "🌊" : r.state === "partial" ? "〰️" : "🫧";
  var word = r.state === "understood" ? "Understood" : r.state === "partial" ? "Partly understood" : "Not yet";
  var h = "";

  if (r.lowConfidence){
    /* The grader is not sure, so it does not pretend. The learner decides, honestly. */
    h = '<div class="why"><b>I am not sure how to score that one.</b><br>'
      + 'Read the model answer and tell me honestly.</div>'
      + '<div class="teach"><b>The answer we were looking for</b><p>' + esc(d.model) + '</p></div>'
      + '<button class="btn wide" onclick="GA.selfGrade(\'understood\')">I said that, in my own words</button>'
      + '<button class="btn wide dark" onclick="GA.selfGrade(\'partial\')">Half of it</button>'
      + '<button class="btn wide ghost" onclick="GA.selfGrade(\'notyet\')">No, I missed it</button>';
    document.querySelector(".narrow").appendChild(el(h));
    window.scrollTo(0, document.body.scrollHeight);
    return;
  }

  gradeOpenFinal(it, r.state, '<b>' + icon + ' ' + word + '.</b> ' + esc(r.reason) + ' ' + esc(r.nudge) + '<br>');
}

function gradeOpenFinal(it, state, headline){
  var correct = state === "understood";
  var conf = it.conf || "pretty";
  /* Partly understood counts as a miss for the concept box but is not sent to the review queue as a
     confident error, so it drops one box instead of resetting. That is what "partial" should cost. */
  recordAnswer(it.item, correct, correct ? conf : (conf === "know" && state === "partial" ? "pretty" : conf));
  var gain = correct ? (run.mode === "boss" || run.mode === "mastery" ? XP.bossQ : XP.sprint) + (CONF_BONUS[conf] || 0)
                     : (state === "partial" ? Math.floor(XP.sprint / 2) : 0);
  if (correct) run.score++;
  if (state === "partial") run.partial = (run.partial || 0) + 1;
  run.xp += gain; addXP(gain);
  var extra = teachPanel(it.item, headline)
    + '<div class="teach"><b>The answer we were looking for</b><p>' + esc(it.data.model) + '</p></div>'
    + '<button class="btn wide" onclick="GA.next()">'
    + (run.i+1 >= run.items.length ? 'Finish' : 'Next') + ' →</button>';
  var box = document.getElementById("selfgrade");
  if (box) box.remove();
  document.querySelector(".narrow").appendChild(el(extra));
  window.scrollTo(0, document.body.scrollHeight);
}
```

```js
  selfGrade:function(state){
    var it = run.items[run.i];
    var p = P();
    p.openFlags.push({ id: it.item.id, at: NOW(), said: state });
    if (p.openFlags.length > 50) p.openFlags = p.openFlags.slice(-50);
    save();
    document.querySelectorAll(".narrow .btn").forEach(function(b){ b.remove(); });
    gradeOpenFinal(it, state, "<b>Your call.</b> ");
  },
```

`openFlags` is the honest by-product of low-confidence grading: a local list of questions the matcher could not score. It is the raw material for rewriting bad rubrics later, and it is why question-quality monitoring was deferred rather than faked.

- [ ] **Step 4: Render and grade matching**

```js
function renderMatch(it){
  var d = it.data;
  it.conf = null;
  it.picks = {};
  it.left = d.pairs.map(function(p, i){ return { i:i, txt:p.l }; });
  it.right = window.SA_UTIL.shuffle(d.pairs.map(function(p, i){ return { i:i, txt:p.r }; }));
  var h = '<p class="eyebrow">Match them up</p><p class="qtext">' + esc(d.ask) + '</p>'
    + '<p class="muted" style="margin:.2rem 0 .3rem">First: how sure are you?</p>'
    + '<div class="confrow">'
    + '<button class="chip" id="conf-guess" onclick="GA.conf(\'guess\')">I am guessing</button>'
    + '<button class="chip" id="conf-pretty" onclick="GA.conf(\'pretty\')">Pretty sure</button>'
    + '<button class="chip" id="conf-know" onclick="GA.conf(\'know\')">I know this</button>'
    + '</div><div class="matchgrid">';
  it.left.forEach(function(l){
    h += '<div class="matchrow"><div class="ml">' + esc(l.txt) + '</div><select class="mr" id="m'+l.i+'">'
      + '<option value="">pick one</option>';
    it.right.forEach(function(r){ h += '<option value="'+r.i+'">' + esc(r.txt) + '</option>'; });
    h += '</select></div>';
  });
  h += '</div><button class="btn wide" id="matchsubmit" disabled onclick="GA.submitMatch()">Check</button>'
    + '<p class="muted" id="confhint" style="font-size:.78rem">Pick one of the three above first.</p>';
  return h;
}
```

```js
  submitMatch:function(){
    var it = run.items[run.i], right = 0, total = it.left.length;
    it.left.forEach(function(l){
      var sel = document.getElementById("m"+l.i);
      sel.disabled = true;
      var ok = sel.value !== "" && Number(sel.value) === l.i;
      sel.parentNode.classList.add(ok ? "correct" : "wrong");
      if (ok) right++;
    });
    document.getElementById("matchsubmit").disabled = true;
    document.querySelectorAll(".confrow button").forEach(function(b){ b.disabled = true; });
    var correct = right === total;
    recordAnswer(it.item, correct, it.conf || "pretty");
    var gain = correct ? XP.sprint + (CONF_BONUS[it.conf] || 0) : 0;
    if (correct) run.score++;
    run.xp += gain; addXP(gain);
    var headline = '<b>' + right + ' of ' + total + ' matched.</b> ';
    var extra = teachPanel(it.item, headline)
      + '<button class="btn wide" onclick="GA.next()">'
      + (run.i+1 >= run.items.length ? 'Finish' : 'Next') + ' →</button>';
    document.querySelector(".narrow").appendChild(el(extra));
    window.scrollTo(0, document.body.scrollHeight);
  },
```

- [ ] **Step 5: Add the CSS**

```css
  textarea#openans { width:100%; font:inherit; font-size:1rem; padding:.8rem;
    border:1px solid var(--line); border-radius:10px; background:var(--card); color:var(--ink);
    resize:vertical; margin:.4rem 0 .8rem; }
  .matchgrid { display:flex; flex-direction:column; gap:.5rem; margin:.6rem 0 1rem; }
  .matchrow { display:flex; gap:.6rem; align-items:center; flex-wrap:wrap;
    border:1px solid var(--line); border-radius:10px; padding:.6rem .7rem; }
  .matchrow .ml { flex:1 1 55%; font-size:.95rem; }
  .matchrow select { flex:1 1 40%; font:inherit; padding:.45rem; border-radius:8px;
    border:1px solid var(--line); background:var(--bg); color:var(--ink); }
  .matchrow.correct { border-color:#3F7D5F; }
  .matchrow.wrong { border-color:#B0452F; }
```

- [ ] **Step 6: Add one of each format to prove the wiring**

In `data5.js`, add the p1 open item and the p2 match item shown verbatim in the Task 4 schema block. Both must pass `node --test tests/items.test.js`.

- [ ] **Step 7: Verify in the browser**

Reload, start a p1 Sprint until the open item appears (or temporarily force it by filtering `poolMC` to `format === "open"`). Confirm: the submit button unlocks only after a confidence chip, a good answer grades as Understood, a two-word answer triggers the "I am not sure how to score that" self-grade path, and the model answer always appears.

- [ ] **Step 8: Commit**

```bash
git add index.html data5.js
git commit -m "Two new formats: typed open answers graded on meaning, and matching"
```

---

### Task 11: Home progress, gradient fills and the XP splash

**Files:**
- Modify: `index.html` (`learn()` at `:408-462`, `.bar` CSS near `:100`, `addXP` at `:364`)

Brief item 5, four parts.

- [ ] **Step 1: Put level and XP on the home screen**

In `learn()`, replace the chips block at `:416-419` with a progress block that shows the rank, the XP total and the bar to the next rank:

```js
    + '<div class="levelblock">'
    + '<div class="lvline"><span class="lvico">' + rankIco(p.xp) + '</span>'
    + '<span class="lvname">' + esc(rank(p.xp)) + '</span>'
    + '<span class="lvxp">' + p.xp + ' xp</span></div>'
    + (nr
       ? '<div class="lvbar"><i style="width:' + rankPct(p.xp) + '%"></i></div>'
         + '<p class="muted lvnext">' + (nr[0]-p.xp) + ' xp to ' + nr[2] + ' ' + esc(nr[1]) + '</p>'
       : '<p class="muted lvnext">Top of the ladder. ' + rankIco(p.xp) + '</p>')
    + '<div class="chips"><span class="chip">🔥 <b>' + p.streak + '</b> day' + (p.streak===1?'':'s') + '</span>'
    + '<span class="chip">🧠 <b>' + totalMastery() + '%</b> understood</span></div>'
    + '</div>'
```

and add the helper next to `nextRank`:

```js
function rankPct(xp){
  var cur = rankObj(xp), nx = nextRank(xp);
  if (!nx) return 100;
  var span = nx[0] - cur[0];
  return span > 0 ? Math.round(100 * (xp - cur[0]) / span) : 0;
}
```

- [ ] **Step 2: Gradient fill on the pack cards**

Replace the `.bar` rules near `:100` with:

```css
  .bar { height:8px; border-radius:99px; background:rgba(255,255,255,.22); overflow:hidden; }
  .bar i { display:block; height:100%; border-radius:99px; width:0;
    transition:width .85s cubic-bezier(.22,.9,.3,1); }
  .lvbar { height:10px; border-radius:99px; background:var(--line); overflow:hidden; margin:.5rem 0 .2rem; }
  .lvbar i { display:block; height:100%; border-radius:99px;
    background:linear-gradient(90deg, var(--coral), var(--coral-dark));
    transition:width .85s cubic-bezier(.22,.9,.3,1); }
  .levelblock { margin:.6rem 0 0; max-width:380px; }
  .lvline { display:flex; align-items:baseline; gap:.5rem; }
  .lvico { font-size:1.5rem; }
  .lvname { font-weight:700; font-size:1.1rem; }
  .lvxp { margin-left:auto; color:var(--soft); font-size:.9rem; }
  .lvnext { font-size:.82rem; margin:.1rem 0 .5rem; }
```

and in the pack loop at `:444`, give the fill the pack's own gradient plus the percentage as secondary text:

```js
      + '<div class="bar"><i style="width:' + pct + '%;background:linear-gradient(90deg,'
      + t.acc + ',' + t.btn + ')"></i></div>'
      + '<div class="recall" style="margin-top:.35rem"><span>' + pct + '% understood</span>'
      + '<span>' + (rev ? rev + ' to revisit' : '') + '</span></div>'
```

**Animate from zero on first paint.** Set the width to `0` in the markup and raise it on the next frame, otherwise the transition never runs:

```js
  requestAnimationFrame(function(){
    document.querySelectorAll(".bar i[data-w]").forEach(function(i){ i.style.width = i.getAttribute("data-w") + "%"; });
  });
```

Use `data-w="' + pct + '"` with `width:0` in the inline style for that to work.

- [ ] **Step 3: The XP splash**

Replace `addXP` at `:364-365`:

```js
function addXP(n){
  var p = P(), before = rank(p.xp);
  p.xp += n; save();
  if (n > 0) splash(n);
  if (rank(p.xp) !== before) toastRank = rank(p.xp);
}
function splash(n){
  if (!n) return;
  var d = document.createElement("div");
  d.className = "xpsplash";
  d.setAttribute("aria-hidden", "true");
  d.innerHTML = '<svg viewBox="0 0 60 40"><path d="M4 32 q 12 -22 26 -6 q 10 10 26 -14" '
    + 'fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>'
    + '<span>+' + n + ' xp</span>';
  document.body.appendChild(d);
  setTimeout(function(){ if (d.parentNode) d.parentNode.removeChild(d); }, 1200);
}
```

```css
  .xpsplash { position:fixed; left:50%; bottom:18%; transform:translateX(-50%);
    display:flex; align-items:center; gap:.4rem; pointer-events:none; z-index:60;
    color:var(--coral); font-weight:700; font-size:1.05rem;
    animation:xpfloat 1.2s ease-out forwards; }
  .xpsplash svg { width:44px; height:30px; }
  @keyframes xpfloat {
    0%   { opacity:0; transform:translate(-50%, 14px) scale(.85); }
    18%  { opacity:1; transform:translate(-50%, 0) scale(1.06); }
    35%  { transform:translate(-50%, -2px) scale(1); }
    100% { opacity:0; transform:translate(-50%, -46px) scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .xpsplash { animation:none; opacity:1; }
    .bar i, .lvbar i { transition:none; }
  }
```

Under reduced motion the number still appears and still disappears after 1.2 seconds, it just does not move. Non-blocking in both cases: nothing waits on it.

- [ ] **Step 4: Kill the rank-up alert**

Delete line 461 and replace the rank-up feedback with a banner, since `alert()` blocks the whole page and is forbidden in this codebase:

```js
  if (toastRank){
    var t = toastRank; toastRank = null;
    var b = el('<div class="rankup">' + rankIco(P().xp) + ' Rank up. You are now <b>' + esc(t) + '</b>.</div>');
    app.insertBefore(b.firstChild, app.firstChild);
  }
```

```css
  .rankup { border:1px solid var(--coral); border-radius:12px; padding:.7rem 1rem;
    margin:0 0 1rem; background:var(--card); font-size:.95rem; }
```

- [ ] **Step 5: Verify in the browser**

Reload and confirm: the home screen shows rank, xp and the bar to the next rank; pack bars animate from zero on load and use the pack's own colours; answering correctly floats a splash that does not block the next tap; reaching a new rank shows the banner and never an alert dialog. Then flip macOS System Settings to Reduce Motion and reload to confirm nothing animates.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "Home progress: rank and xp up front, gradient pack fills, an ocean splash"
```

---

### Task 12: The three mastery tests, the cinematic and the replay

**Files:**
- Create: the real contents of `views-mastery.js`
- Modify: `index.html` (`learn()` for the finals block, `progressView()` for the achievement area, `results()` for the mastery branch, `GA` for the new entry points)

**Interfaces:**
- Consumes: `SA_GENERATE`, `SA_MASTERY`, `RANKS`, and the run loop (`startRun`, `step`, `results`).
- Produces: `window.SA_VIEWS` with `finalsCard(ctx) -> html`, `finalsHome(ctx)`, `cinematic(onDone)`, `achievements(ctx) -> html`. `ctx` is `{P, S, save, MODS, IDX, RANKS, rank, rankIco, esc, el, render, playbar, startRun, step, GA}`, passed in once from `index.html` so `views-mastery.js` needs no globals of its own.

Brief items 6, 7 and 8.

- [ ] **Step 1: Pass the context in**

At the bottom of the IIFE in `index.html`, just before `learn();`, add:

```js
var VCTX = { P:P, S:S, save:save, MODS:MODS, IDX:IDX, RANKS:RANKS, rank:rank, rankIco:rankIco,
             esc:esc, el:el, render:render, playbar:playbar, startRun:startRun, step:step,
             addXP:addXP, XP:XP, GEN:GEN, MY:MY, mod:mod, TH:TH, nav:function(v){ GA.nav(v); } };
window.SA_VIEWS.init(VCTX);
```

- [ ] **Step 2: The finals entry point on the home screen**

In `learn()`, after the pack grid closes at `:453`, add:

```js
  h += window.SA_VIEWS.finalsCard();
```

`finalsCard` returns a locked card listing how many of the eight packs are mastered when `GEN.unlocked` is false, and an unlocked card with the three tests when it is true. Locked copy: `"Three final tests unlock when all eight packs are mastered. You have five of eight."` Unlocked copy: `"The finals are open. Three tests, new questions, everything you have learned."`

- [ ] **Step 3: Build a mastery run**

```js
function startMastery(testNo){
  var p = ctx.P();
  var t = ctx.GEN.build(testNo, p, ctx.IDX, {});
  if (t.shortfall > 0) console.warn("mastery test " + testNo + " reused " + t.shortfall + " items: the pool is thin");
  var items = t.items.map(function(it){
    return { kind:it.format, id:it.id, data:it.data, mod:ctx.mod(it.pack), item:it };
  });
  ctx.startRun("mastery", null, items, "learn", { testNo: testNo });
  ctx.step();
}
```

`startRun` needs two changes in `index.html`: accept a null module for mode `mastery` exactly as it already does for `review`, and take an optional fifth argument whose keys are copied onto `run` (that is how `testNo` gets there, since `run` is private to the IIFE and not exposed on `ctx`). `step()`'s label expression at `:682` needs a `mastery` branch reading `"Mastery " + run.testNo`.

- [ ] **Step 4: Pass and record**

Pass mark is 70 percent, rounded up: 10 of 14 on tests 1 and 2, 13 of 18 on test 3. In `results()` in `index.html`, add a branch before the boss branch:

```js
  if (run.mode === "mastery"){
    var need = Math.ceil(run.items.length * 0.7);
    var passedTest = sc >= need;
    if (passedTest){
      if (!p.finals) p.finals = {};
      if (!p.finals[run.testNo]){ p.finals[run.testNo] = NOW(); addXP(120); run.xp += 120; }
      if (p.finals[1] && p.finals[2] && p.finals[3] && !p.completed){
        p.completed = NOW();
        p.completedShown = false;
      }
    }
    save();
  }
```

and in the result screen, when `p.completed && !p.completedShown`, replace the Done button with a single `"See your journey →"` button calling `GA.cinematic()`.

- [ ] **Step 5: The cinematic**

Eight to twelve seconds, native SVG and CSS, no video file, stepping through the actual configured `RANKS` ladder rather than a hard-coded sequence.

```js
function cinematic(onDone){
  var p = ctx.P(), name = ctx.S.current;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stages = ctx.RANKS;                       // 🪱 Worm through ⛵ Fleet, read live from the config
  var per = Math.max(700, Math.floor((window.SA_CONFIG.cinematicMs - 2600) / stages.length));

  var rungs = stages.map(function(r, i){
    return '<div class="rung" data-i="' + i + '"><span class="rico">' + r[2] + '</span>'
      + '<span class="rname">' + ctx.esc(r[1]) + '</span>'
      + '<span class="rxp">' + r[0] + ' xp</span></div>';
  }).join("");

  var html = '<div class="cine" id="cine"><button class="cineskip" onclick="GA.cineSkip()">Skip</button>'
    + '<div class="cinein"><p class="eyebrow">' + ctx.esc(name) + '</p>'
    + '<h2 class="cinetitle">Look how far you came.</h2>'
    + '<div class="ladder">' + rungs + '</div>'
    + '<div class="cinefinal" id="cinefinal"></div></div></div>';

  document.body.appendChild(ctx.el(html).firstChild);

  function finish(){
    document.getElementById("cinefinal").innerHTML =
      '<div class="finalcard"><div class="fico">' + ctx.rankIco(p.xp) + '</div>'
      + '<h1>You completed Salty Code Academy.</h1>'
      + '<p class="sub">' + ctx.esc(name) + ' · ' + ctx.esc(ctx.rank(p.xp)) + ' · ' + p.xp + ' xp</p>'
      + '<p class="muted">You started at Worm. You did not stay there.</p>'
      + '<button class="btn wide" onclick="GA.cineDone(\'progress\')">View my results</button>'
      + '<button class="btn wide ghost" onclick="GA.cineDone(\'replay\')">Replay my journey</button></div>';
    document.getElementById("cinefinal").classList.add("show");
  }

  if (reduced){ document.querySelectorAll(".rung").forEach(function(r){ r.classList.add("lit"); }); finish(); }
  else {
    stages.forEach(function(r, i){
      setTimeout(function(){
        var node = document.querySelector('.rung[data-i="' + i + '"]');
        if (node) node.classList.add("lit");
      }, 400 + i * per);
    });
    setTimeout(finish, 400 + stages.length * per + 500);
  }
  cinematic.onDone = onDone;
}
```

CSS: `.cine` is `position:fixed; inset:0; z-index:200;` over a dark ocean gradient, `.rung` starts at `opacity:.2` and `.rung.lit` transitions to full opacity with a small `translateX`, `.cinefinal` fades in. `.cineskip` sits top right. With seven rungs at roughly 900ms each that lands at about nine seconds, inside the 8 to 12 second window in the brief.

- [ ] **Step 6: Auto-play once, then user-triggered forever**

In `learn()`, after render, add:

```js
  var p0 = P();
  if (p0.completed && !p0.completedShown){
    p0.completedShown = true; save();
    window.SA_VIEWS.cinematic(function(){ learn(); });
  }
```

`GA.cineDone(where)` removes the overlay and either navigates to `progress` or replays. `GA.cineSkip()` removes it and calls `learn()`.

- [ ] **Step 7: The permanent achievement area**

In `progressView()`, above the badge grid, add `h += window.SA_VIEWS.achievements();` which renders, only when `p.completed` is set:

```
COURSE COMPLETE
[final rank icon] Salty Code Academy · completed 15 September 2026
Final standing: Fleet · 3,410 xp
[Replay my journey]  [See the three finals]
```

The replay button calls `GA.cinematic()` directly, which is the "after that it is user-triggered only" half of brief item 8.

- [ ] **Step 8: Verify in the browser**

Force the state rather than playing through everything: in the console set `S.players[S.current].boss = {p1:1,p2:1,m1:1,m2:1,m3:1,m4:1,m5:1,m6:1}` and save, reload, then confirm the finals card unlocks, each test builds with the right size, no question inside a test repeats, and the console warns rather than silently shrinking when the pool is thin. Then set `finals = {1:1,2:1,3:1}` and `completed` and reload to watch the cinematic once, confirm it does not replay on the next reload, and confirm the profile replay button plays it on demand. Re-check with Reduce Motion on: the ladder should be fully lit immediately and the final card should appear without motion.

- [ ] **Step 9: Commit**

```bash
git add views-mastery.js index.html
git commit -m "The finals: three cumulative tests, the completion cinematic and the replay"
```

---

### Task 13: The content sweep, one pack at a time

**Files:**
- Modify: `data1.js` (p1, p2, m1, m2), `data2.js` (m3, m4, m5, m6), `data3.js` (speak prompts), `data4.js` (the human bank)
- Modify: `data5.js` (new open and matching items, and the mastery-only variants)

**Run this task eight times, once per pack. Each run is a separate commit and a separate review.** A pack is done when `node --test tests/items.test.js` reports zero untagged items for it and the browser still plays that pack end to end.

- [ ] p1 · Why Websites Lose Customers
- [ ] p2 · Bottlenecks, Custom Software and AI
- [ ] m1 · Website Building
- [ ] m2 · Branding and Positioning
- [ ] m3 · Growth and Marketing
- [ ] m4 · AI and Education
- [ ] m5 · Systems and Software
- [ ] m6 · The Sales Arena

**The procedure for one pack:**

- [ ] **Step 1: Tag what already works**

The roughly 100 items added on 2026-09-11 in `data4.js` are already in the right voice. Do not rewrite them. Add an `id` and a `c` to each, using the ID scheme from Task 4. Variant letters run `a`, `b`, `c` within a concept.

- [ ] **Step 2: Judge every legacy item against five tests**

For each item in that pack's `quiz`, `translate` and `diagnose` arrays in `data1.js` / `data2.js`, apply these and write the verdict in the commit message:

1. **The daily-life test.** Is this a scene a person could actually be in, or is it a textbook asking you to recall a definition? `"What share of mobile visitors leave if a site takes more than 3 seconds to load?"` fails. Rewrite it as the moment it matters: `"Your customer opens your site on slow hotel wifi. What matters most right now?"`
2. **The length test.** Is the correct option the longest or most detailed one? If so, either trim it or pad the distractors. Vary which position the correct answer is authored in, since `shuffle` only helps if the pool is not systematically biased.
3. **The plausibility test.** Could a reasonable person pick each wrong option for a real reason? Options like `"Google removes slow sites from search"` are fine because people believe that. Options like `"Slow sites cost more in hosting"` are filler and must be replaced.
4. **The stat test.** A number-recall question survives only if Mo would actually say that number on a sales call. `53% of mobile visitors leave after three seconds` survives. `Stanford says 75%` survives. Trivia about which year something launched does not.
5. **The guessability test.** Read only the four options, not the question. If you can pick the right one, the options give it away.

Verdicts are `keep`, `rewrite` or `retire`. Retired items are deleted, not commented out. The human bank already gives each pack roughly 28 multiple-choice items, so deleting weak legacy ones does not starve the pools.

- [ ] **Step 3: Write the new formats**

Per pack, add to `data5.js`:
- **2 open-answer items** with full rubrics, on the pack's two most important concepts. Rubric authoring rules: 2 or 3 `must` groups, 4 to 6 synonyms each including the way a normal person would phrase it, at least one `miss` entry capturing the misconception you have actually heard, a `model` answer of 2 to 3 sentences in spoken register, and `minMust` left out so it defaults correctly.
- **1 matching item** with 3 or 4 pairs.
- **6 mastery-only variants** marked `use:"mastery"`, at least 2 of them `open` or `diagnose`, all on concepts from that pack but written from a different angle than the module questions. This is what keeps the finals from recycling: mastery items are authored once and never appear in a Sprint.

- [ ] **Step 4: Tag the flashcards and the speak prompts**

Every card in that pack gets `id:"f.<pack>.<slug>.a"` and `c:["c.<pack>.<slug>"]`. Every speak prompt in `data3.js` gets an `id` and a `c` listing the two or three concepts it exercises.

- [ ] **Step 5: Run the tests**

```bash
node --test tests/
```

Expected: everything passes, and the untagged count printed by the items smoke test has dropped by that pack's item count.

- [ ] **Step 6: Play the pack in the browser**

Sprint, flashcards, the mastery round and at least one open answer. Confirm the teaching panel names the right concept for each question, which is the fastest way to catch a mis-tagged `c`.

- [ ] **Step 7: Commit**

```bash
git add data1.js data2.js data3.js data4.js data5.js
git commit -m "Content sweep: <pack> rewritten to the human voice and tagged to concepts"
```

**Delegation note:** the drafting in steps 2 and 3 is schema-bound bulk copy, which is exactly the work to hand to a cheaper model. Dispatch one subagent per pack with the voice rules above, the pack's concept list, and the existing items, and require it to return items matching the Task 4 schema. Review every returned item against the five tests yourself before committing. Never let the subagent commit.

---

### Task 14: Verification and deploy

**Files:** none changed unless verification finds something.

- [ ] **Step 1: Full test run**

```bash
cd ~/Desktop/SaltyCode/05-Marketing/salty-academy && node --test tests/
```

Expected: all suites pass, and the items smoke test prints `untagged items remaining: 0`.

- [ ] **Step 2: A full pass as a new learner**

Serve locally, create a fresh player, and walk the whole thing: a Sprint, flashcards, an open answer, a matching item, a mastery round, then force all eight `boss` flags and play all three finals to completion and the cinematic. Watch the console the entire time. Nothing may throw, and no request may leave the machine. Confirm that last point with the network panel: zero third-party requests.

- [ ] **Step 3: The returning-learner path**

In a second browser profile, restore a `salty-academy-game-v1` blob into localStorage, load the app, and confirm the migration keeps xp, rank, badges and mastered packs, shows the notice once, and does not throw.

- [ ] **Step 4: Phone check**

Resize to 390 by 844 and walk the same flow. The matching selects, the textarea and the cinematic ladder must all fit without horizontal scrolling.

- [ ] **Step 5: Deploy**

```bash
git push origin main
```

GitHub Pages rebuilds automatically. Then load `https://salty-code-studio.github.io/salty-academy/` and repeat step 2 in short form against the live copy.

- [ ] **Step 6: Update the memory note**

Update `~/.claude/projects/-Users-monischahieroms/memory/project_salty_academy.md` with: the concept layer, the v2 storage key and what the migration drops, the three finals and their unlock rule, the local rubric grader plus the dormant `SA_CONFIG.graderUrl` seam, and the fact that new content now needs `id` and `c` fields or the loader throws.

---

## Self-Review

**Spec coverage.** Brief item 1 is Task 13 steps 2 and 3 plus Task 10's formats. Item 2 is Task 6. Item 3 is Task 5's confidence table plus Task 9 step 1. Item 4 is Task 9. Item 5 is Task 11. Item 6 is Task 7 and Task 12. Item 7 is Task 12 steps 5 and 6. Item 8 is Task 12 steps 6 and 7. Item 9's spaced repetition and concept mastery are Task 5; the placement test and question monitoring are explicitly out of scope, with `openFlags` in Task 10 left as the honest seed for monitoring later. Item 10's six rules: architecture preserved (no framework, no build, Task 8 is a re-point not a rebuild), stable concept IDs (Task 3), compact context (the `SA_AI` payload carries only question, rubric, model answer and the learner's answer), short structured output with expandable detail (Task 9's teach panel), on-demand small-batch generation (Task 7 builds one test at a time), and no new game systems (nothing added but the finals, which are assessment).

**Known gaps, deliberately left.** The pass mark of 70 percent on the finals is my choice, not Mo's, and is a one-line change in Task 12 step 4 if she wants it harder. The prefix rule in the rubric matcher will occasionally accept a loose match; that is the price of grading offline, and `openFlags` will surface it. Mastery test sizes are fixed at 14, 14 and 18 rather than ranged, because a range adds a variable with no learning benefit.

**Riskiest task.** Task 8. It rewires progress tracking under a live app in one commit. It is browser-verified on its own before any feature lands on top of it, and it is the one task worth reviewing line by line.
