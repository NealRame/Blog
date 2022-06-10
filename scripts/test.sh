#! /bin/bash

# exit with non-zero exit code if anything fails
set -e

MOCHA="$PWD/node_modules/.bin/mocha"
export NODE_PATH="$PWD/src/js"

"$MOCHA" tests/handlebars-helpers.js
"$MOCHA" --compilers js:babel-core/register tests/common.js
