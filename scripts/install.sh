#! /bin/bash

# exit with non-zero exit code if anything fails
set -e

echo "========================================================================"
echo "-- Install step"
echo "========================================================================"
ls -l "$PWD"
echo "========================================================================"
ls -l "$PWD/node_modules"

npm install
