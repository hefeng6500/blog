#!/usr/bin/env sh

# 当发生错误时终止脚本
set -e

# 构建
yarn build

# cd 到构建输出的目录下
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
git push -f git@github.com:hefeng6500/hefeng6500.github.io.git master

cd -
