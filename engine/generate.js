/* Salty Academy engine · mastery test assembly.
   Builds the three cumulative tests from the concept bank and the mastery-only item pools.
   Never copies a question the learner has already answered while any alternative exists. */
(function(root){
"use strict";
var M = root.SA_MASTERY;
var U = root.SA_UTIL;

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

/* Weighted pick without replacement. Cumulative buckets are built from the end of
   the pool backward, so a high roll of rng() lands on the item nearest the front:
   a stubbed rng near 0 favours the last pool entry, a stubbed rng near 1 favours the
   first. Order does not matter for a true random rng, only for deterministic tests. */
function pickWeighted(pool, weightOf, n, rng){
  rng = rng || Math.random;
  var left = pool.slice(), out = [];
  while (out.length < n && left.length){
    var total = 0, i;
    for (i=0;i<left.length;i++) total += Math.max(0.0001, weightOf(left[i]));
    var r = rng() * total, acc = 0, chosen = 0;
    for (i=left.length-1;i>=0;i--){
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
    /* Soft preference for items authored specifically for the exams: never a hard
       wall, because a strict mastery-first tier would let an abundant mastery pool
       bury the one module item covering a learner's actual weak spot. */
    return base * (it.use === "mastery" ? 2 : 1);
  }

  /* Two real tiers: unseen items (mastery preferred through weight, not exclusion),
     then any item at all as a last resort, counted in shortfall so a thin content
     pool is visible instead of silently shrinking the test. */
  var unseenPool = index.items.filter(function(it){ return allowed(it) && unseen(it); });
  var anyPool = index.items.filter(allowed);

  var taken = {}, out = [], shortfall = 0;

  function available(pool, packFilter){
    return pool.filter(function(it){
      return !taken[it.id] && (!packFilter || it.pack === packFilter);
    });
  }

  /* For the weighted transfer test, narrow to whatever the current heaviest weight
     is before picking. A flat weighted draw across a big pool drowns out the one or
     two items that actually cover a learner's weak concept; narrowing first is what
     makes the test genuinely lean on weak spots instead of hoping randomness helps. */
  function candidatePool(pool, packFilter){
    var avail = available(pool, packFilter);
    if (!spec.weighted || avail.length < 2) return avail;
    var max = 0;
    avail.forEach(function(it){ max = Math.max(max, weightOf(it)); });
    return avail.filter(function(it){ return weightOf(it) === max; });
  }

  function takeOne(pool, packFilter, isRepeat){
    var avail = available(pool, packFilter);
    if (!avail.length) return false;
    var candidates = candidatePool(pool, packFilter);
    var got = pickWeighted(candidates, weightOf, 1, rng);
    if (!got.length) return false;
    taken[got[0].id] = 1;
    out.push(got[0]);
    if (isRepeat) shortfall++;
    return true;
  }

  /* One from each pack first, so the whole course stays sampled. */
  packIds.forEach(function(pk){
    if (takeOne(unseenPool, pk, false)) return;
    takeOne(anyPool, pk, true);
  });

  /* Then fill to size, unseen items first, repeats only as a last resort. */
  while (out.length < spec.n){
    if (takeOne(unseenPool, null, false)) continue;
    if (takeOne(anyPool, null, true)) continue;
    break;
  }

  return { testNo:testNo, title:spec.title, focus:spec.focus,
           items:U.shuffle(out).slice(0, spec.n), shortfall:shortfall };
}

root.SA_GENERATE = { unlocked:unlocked, build:build, pickWeighted:pickWeighted };
})(typeof window !== "undefined" ? window : global);
