#! /bin/bash

# exit with non-zero exit code if anything fails
set -e

npm install
npm install grunt-cli

ls $PWD/node_modules

$PWD/node_modules/.bin/grunt
