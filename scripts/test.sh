#! /bin/bash

# exit with non-zero exit code if anything fails
set -e

MOCHA="$PWD/node_modules/.bin/mocha"

"$MOCHA" tests/handlebars-helpers.js
