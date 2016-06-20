#! /bin/bash

# exit with non-zero exit code if anything fails
set -e

<<<<<<< HEAD
ls -l "$PWD"
echo "========================================================================"
ls -l "$PWD/node_modules"
=======
ls "$PWD/node_modules/.bin"

$PWD/node_modules/.bin/grunt
>>>>>>> 2ee845a898a0aa91474916879c6bff4e62e63d64
