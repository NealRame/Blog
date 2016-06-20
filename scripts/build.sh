#! /bin/bash

# exit with non-zero exit code if anything fails
set -e

ls "$PWD/node_modules/.bin"

$PWD/node_modules/.bin/grunt
