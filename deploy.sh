#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd lib

mv bundle.esm.js index.js

cd -
git init
git add -A
git commit -m 'deploy'
git push

git checkout master
git checkout origin/develop/lib/index.js

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
