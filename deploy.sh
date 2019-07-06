#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件，但在win中执行sh脚本，会找不到npm，可以在子系统中安装一个，但是算了，手动吧
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'docs.conanan.top' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io，有问题，手动把
# git push -f git@github.com:apple54whn/apple54whn.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:apple54whn/docs.git master:gh-pages

cd -