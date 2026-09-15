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
by the client as a failed call.

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
