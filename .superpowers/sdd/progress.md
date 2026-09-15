# Salty Academy v2 · progress ledger
Plan: docs/superpowers/plans/2026-09-15-salty-academy-update.md
Branch: feat/academy-v2 (base: fced5f2)

Task 7: complete (commits f4600b0..9f19a75, review clean after two fix passes). 75 tests green, suite runs in ~450ms.
  Critical caught in review: the generator narrowed to max-weight items, so Mastery 3 served identical questions on every retake. Now draws proportionally.
  The statistical test is now pinned from both sides, [550,800] of 2000 trials, proven to fail against flat, squared and collapsed weighting.
  My plan's pickWeighted unit test asserted an arbitrary rng-to-item mapping; the implementer reversed the iteration to satisfy it. Both directions are valid samplers.
ENGINE PHASE COMPLETE (Tasks 1-7). UI phase begins at Task 8.
Task 8: complete (commits b7fb3fa..feb1230, review clean after one fix pass). The app now runs on the concept engine.
  Implementer caught two bugs the plan missed: step() dispatched on "cards" while items carry format "flash" (would crash flashcards), and speakHome() read the removed p.correct field (would throw on the Speak tab).
  Review caught: an ordinary repeat miss was demoting an item to the back of the review queue, where it could be starved out of the 12 item window.
  Plan defect found and corrected: the rewire pointed "X of Y recalled" and the Word collector badge at p.seen (merely shown) instead of "got it right". Added a p.right map, written only on a correct answer, never unset. p.seen stays as the never-recycle signal for the mastery tests.
  Browser-verified by the controller twice: v1 migration, notice fires once, all five views, every answer path, queue position held on repeat miss, recalled counter correct, boots fine on a save with no right map.
Task 9: complete (commits d128793..4225866, review clean after one fix pass). Every question now teaches.
  Review caught a pre-existing hole the new guard made obvious: a question could be answered twice by calling GA.answer again, re-scoring and appending a second panel. Guarded GA.answer, GA.card and GA.speakGrade.
  My own first browser check of this was inconclusive and I nearly accepted it: the repeat answer I used was wrong, and a wrong answer awards no xp, so xp stayed flat either way. Re-verified with a correct answer.
  CSS note: the plan's teach panel used var(--card), which does not exist. The file uses var(--paper).
  CARRY TO TASK 13: teachPanel shows up to four extra terms from CN.findInText, chosen in concept-bank declaration order rather than by relevance. Once content is tagged, check the terms shown are the useful ones.
Task 10: complete (commits 55eb9a4..76525c8, review clean after one fix pass). Open answers and matching are live.
  Review caught a Critical async race: a pending grade resolved against whatever run was current, so quitting mid-grade wrote concept mastery and then threw, and starting a different run injected the stale panel into an unrelated question and inflated its score. Dormant with local grading, live the moment a worker is configured. Fixed with a run token guard.
  Also fixed: GA.submitOpen could be entered twice before the grade resolved, producing duplicate selfgrade nodes.
  Two findings from my own browser pass: .btn[disabled] had no styling so "Check my answer" looked clickable while disabled; and poolMC never served the new formats, so they were unreachable in normal play. Renamed to modulePool and widened it. Verified over 120 sprints: "in your own words" now appears in 22 of 60 p1 sprints and "match them up" in 14 of 60 p2 sprints.
  Browser-verified the whole open answer loop, including the low confidence path refusing to deliver a verdict, and the first real concept mastery written from the UI (c.p1.speed to box 1).
  GOTCHA hit during testing: a stress loop earned enough xp to trigger the pre-existing rank-up alert(), and a native modal froze the renderer so hard that CDP timed out through a reload. Task 11 removes that alert. Do not drive many sprints until it is gone.
Task 11: complete (commits 065c72f..fc7b1a5, review clean after one fix pass). The rank-up alert() is GONE.
  Review caught a CSS specificity bug I could not have seen in the browser: the reduced-motion block used .bar i and .fg, both less specific than the .pack .bar i and .ring .fg rules they were meant to override, so pack bars AND mastery rings kept animating for anyone who asked their system for reduced motion. Two broken overrides, both fixed.
  My browser findings, all fixed: "N to revisit" printed twice per card; the bars never filled in a hidden or unfocused tab because rAF is suspended there (now snaps directly when document.hidden, with a self-cleaning visibilitychange listener); GA.answer had no bounds check on the option index.
  Verified after the fix: bar reads 1% while the tab is hidden, "to revisit" appears once.
Task 12: complete (commits e40adab..4c8ae71, review clean after one fix pass). The finals, the cinematic and the replay all work.
  Review caught a stale-timer bleed: the cinematic never stored its timeouts and found its targets by global selector, so skipping and replaying let the old chain light the new overlay's rungs and slam its final card up early.
  I proved empirically that a second invocation stacked overlays and a single skip removed only one, leaving the learner trapped under a full screen overlay. The reviewer had reasoned that path unreachable; the browser disagreed. Now idempotent: three calls leave one overlay, one skip leaves zero.
  Also fixed: TEST_SPEC duplicated the engine's SPEC (drift risk), finalsHome did not set the nav view, GA.answer had no mastery xp branch, and the cinematic ran ~7.3s against a specified 8 to 12s window.
  Observed and worth keeping: Mastery 2 reports shortfall 1 today, honestly flagging that the application-format pool is thin. Task 13 is what fills it.
UI PHASE COMPLETE (Tasks 8-12). Content sweep begins at Task 13.
Task 13 content sweep, pack by pack (each its own commit):
  p1 done (df1f97f) 45 untagged -> 0. 14 rewritten, 1 retired. Longest-correct ratio 0.26.
  Schema amendment (6c17805): speak prompts got their own id letter `s`, so they no longer share the flashcard namespace.
  p2 done (17e5a6a) 48 -> 0. 13 rewritten, 3 retired. Ratio 0.35, capped because I had forbidden touching data4 options.
  AMENDED for later packs: data4 items keep their scenes and why-lines, but option wording and length may be adjusted to kill the longest-answer tell.
  m1 done (e435994) 44 -> 0. 9 rewritten, 5 retired. Ratio 0.226.
  m2 done (ccac815) 44 -> 0. 12 rewritten, 2 retired. Ratio 0.125.
  CARRY TO TASK 14: p2's ratio of 0.35 is above the one third target. Fix it in the final pass now that data4 options are fair game.
  m3 done 46 -> 0. Legacy had a quiz+translate+diagnose array I initially miscounted (16 legacy items, not 12): 15 rewritten, 1 retired (a redundant remarketing definition question, duplicate in spirit of data4's kite-surf scene). First-pass ratio came back 0.79 using character-length measurement instead of eyeballed word count; fixed by trimming/padding down to 0.138. Added 1 new mastery quiz (targeting), 1 new mastery diagnose (conversion-rate), 2 open module items (funnel, garden-faucet), 1 match item (reach/engagement/paid/organic), 2 open mastery items (acquisition, creative). 6 mastery items total, 4 of them open/diagnose. All 16 m3 concepts now have at least 2 tagged items.
  CARRY TO TASK 14: measure the longest-correct ratio by character length, not eyeballed word count. The two diverged badly on this pack.
