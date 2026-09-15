#!/bin/bash
# Salty Academy local preview.
# Double click this file in Finder, or run it from a terminal.
# It serves the app on http://localhost:8777 and opens your browser.
# Close the terminal window when you are done to stop it.

cd "$(dirname "$0")" || exit 1

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
echo "Salty Academy preview"
echo "Branch: $BRANCH"
if [ "$BRANCH" != "feat/academy-v2" ]; then
  echo ""
  echo "Heads up: you are not on feat/academy-v2, so this is NOT the new version."
  echo "Run: git checkout feat/academy-v2"
  echo ""
fi

PORT=8777
while lsof -i :$PORT >/dev/null 2>&1; do
  PORT=$((PORT+1))
done

echo "Serving on http://localhost:$PORT"
echo "Leave this window open. Close it to stop."
echo ""

sleep 1 && open "http://localhost:$PORT/index.html" &
python3 -m http.server $PORT
