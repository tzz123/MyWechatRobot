#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd lib
mv bundle.esm.js index.js

git init
git add -A
git commit -m 'deploy'

git push https://github.com/tzz123/MyWechatRobot.git master

cd -
