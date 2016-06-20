#! /bin/bash

# exit with non-zero exit code if anything fails
set -e

ls -l "$PWD"
echo "========================================================================"
ls -l "$PWD/node_modules"

$PWD/node_modules/.bin/grunt
