/* Salty Academy runtime config.
   graderUrl stays null in the repo. Setting it to a deployed Cloudflare Worker
   URL switches open-answer grading from the local rubric matcher to a real model.
   See docs/GRADER-WORKER.md for the contract. Never put an API key in this file. */
window.SA_CONFIG = {
  graderUrl: null,
  cinematicMs: 9000
};
