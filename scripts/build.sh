#! /bin/bash

# exit with non-zero exit code if anything fails
set -e

echo "before npm install"
echo "$PWD"
echo "========================================================================"
ls -l $PWD/node_modules

npm install

echo "after npm install"
echo "$PWD"
echo "========================================================================"
ls -l $PWD/node_modules

grunt
