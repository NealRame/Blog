#! /bin/bash

# exit with non-zero exit code if anything fails
set -e

export DEST_DIR="build"
export NODE_ENV="production"

USER_NAME="Travis CI"
USER_EMAIL="julien@graziano.fr"

GH_REF="${GH_REF:-NealRame/NealRame.github.io.git}"
DATE=$(date +"%m.%d.%y")
SHA=$(git rev-parse HEAD)

grunt

pushd "$DEST_DIR"
	echo "nealrame.com" > CNAME
	git init
	git config user.name "$USER_NAME"
	git config user.email "$USER_EMAIL"
	git add .
	git commit -F- <<-EOF
		Deploy $DATE
		commit: NealRame/Blog@$SHA
	EOF
	git push --force --quiet "https://${GH_TOKEN}@github.com/${GH_REF}" master:master > /dev/null 2>&1
popd
