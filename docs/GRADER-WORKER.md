# Grader worker contract

Salty Academy is a static site with no backend and nowhere to keep a secret, so
open answer questions are graded locally by `engine/rubric.js` using synonym
groups the question author supplies. `engine/ai.js` is the seam that lets a
future Cloudflare Worker take over grading with a real model, without any
other file in the app changing. Today `SA_CONFIG.graderUrl` is `null`, so this
worker does not exist yet and every answer is graded on device.

## When the seam activates

Set `SA_CONFIG.graderUrl` (in `config.js`) to the worker's URL. From that
point on, `SA_AI.grade(item, answer)` posts to the worker instead of grading
locally. Leave it `null` and the app never makes a network call for grading.

## Request

`POST` to `graderUrl` with a JSON body:

```json
{
  "ask": "What is the actual money problem with a five second load time?",
  "rubric": { "must": [["slow","seconds","speed","load"], ["leave","lose","gone","bounce","back"]] },
  "model": "Her site takes five seconds to load, so most visitors leave before it appears.",
  "answer": "the learner's own words go here"
}
```

The payload is only the question, the compact rubric, the model answer, and
the learner's typed answer. No course content, no question history, and no
transcript is ever sent. The worker does not need any of that to grade one
answer against one rubric.

## Response

The worker must return exactly this shape:

```json
{
  "state": "understood",
  "reason": "You named the parts that matter.",
  "nudge": "",
  "misconception": null,
  "lowConfidence": false
}
```

- `state` is one of `"understood"`, `"partial"`, or `"notyet"`.
- `reason` is a short, human sentence explaining the verdict.
- `nudge` is what to show the learner when they are not fully there yet. Empty
  string when there is nothing to add.
- `misconception` is either `null` or a short sentence naming the specific
  wrong idea, the same role it plays in the local rubric.
- `lowConfidence` is `true` when the model itself is not sure the verdict is
  right, so the client can show a self-override instead of a flat verdict.

Any other shape, a non 200 response, a network error, or a timeout is treated
by the client as a failed call. The client waits at most 8 seconds for a
response, using `AbortController` to cancel the request; a worker that
accepts the connection and never replies is treated the same as one that is
down.

## Untrusted response fields

`misconception`, `reason`, and `nudge` come from the worker, which means they
are untrusted input by the time `engine/ai.js` reads them. `engine/ai.js`
passes them through unescaped on purpose. The renderer that puts these
strings on the page is responsible for escaping them before they reach the
DOM. Escaping them a second time in `engine/ai.js` would show the learner
literal entity codes instead of the worker's text, so do not add escaping
there. If a new renderer is added for this data, it must escape these three
fields itself.

## Key handling

The worker holds the model API key as a Cloudflare Worker secret, set with
`wrangler secret put`. The key never appears in client code, never appears in
a response body, and is never logged back to the caller. The client sends a
question, a rubric, and an answer, nothing that requires the key to be shared
back.

## Rate limiting

The worker should rate limit by IP or by a lightweight per session token, and
return a plain error status (for example 429) when the limit is hit. The
client does not need a friendly error message for this case because it never
sees the difference between a rate limit, a timeout, or the worker being
offline: any failure falls back to local grading.

## The fallback guarantee

`engine/ai.js` always tries the worker first when `graderUrl` is set, but
every failure path, a rejected fetch, a non OK response, a response that is
not valid JSON, or a JSON body that does not match the shape above, catches
silently and re-grades the same answer locally with `SA_RUBRIC.grade`. This
means the worker is purely additive: if it is slow, if it is down, if it is
never built at all, the learner still gets a verdict and the app keeps
working exactly as it does today, offline and for free.

## Guidance for rubric authors: pick distinctive synonyms

The local matcher accepts a stem as a match when it is a prefix of a longer
stem in the learner's answer, but only when the two stems differ in length
by at most one character. This is what lets "losing" match the synonym
"lose" and "bouncing" match "bounce", while stopping a short synonym like
"back" from matching an unrelated word like "background" (five characters
apart, well outside the window). What the one character window still allows
is a short synonym colliding with another short, unrelated word that starts
the same way. "car" is the worked example. Both words are short enough that
the stemmer leaves them alone, so the stemmer is not what confuses them:
"car" stays "car" and "care" stays "care". The collision happens one step
later, in the prefix rule, because "car" is a prefix of "care" and the two
are only one character apart. A rubric using "car" as a synonym will
therefore credit an answer that only mentions taking care of something.
Prefer whole, distinctive words over short ones, and check any three or
four character synonym against the other short, common words it might
accidentally match. If you are ever chasing a false match, look at
stemsMatch before you look at stem.
