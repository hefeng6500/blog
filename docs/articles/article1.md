---
nav:
  title: 博客
  order: 1
---

# 使用 GitHub Actions 实现 Dumi 博客自动化部署

作为技术人，相信大家都会想有一个自己的专属博客，用于记录自己走过路的，趟过的坑，或是沉淀工作和学习心得！

首先讲下行业现状，目前主流搭建博客用到的方式：

- [dumi](https://d.umijs.org/zh-CN)： 蚂蚁金服出品，一款为组件开发场景而生的文档工具
- [VuePress](https://vuepress.vuejs.org/zh/)：Vue 官方出品，支持第三方主题，可搭配 commento 实现博客评论
- [Hexo](https://hexo.io/zh-cn/)： 一个快速、简洁且高效的博客框架，热度蛮高
- [GitHub Pages](https://pages.github.com/)： Github 官方提供的为项目提供的文档
- [Github issue]： 本是用于提交代码缺陷的，但目前发现有很多人用作写博客
- 手写博客源码，搭建真正属于自己的博客，技术胖博客(https://jspang.com/)
- ......

<br />

本文主要讲下使用 Dumi 搭建一个属于自己博客

dumi官网： https://d.umijs.org/zh-CN

## 一、创建静态站点脚手架


```shell
$ npx @umijs/create-dumi-app
# or
$ yarn create @umijs/dumi-app
```
<br />

安装依赖
```shell
yarn install
```

启动文档
```shell
yarn start
```

效果图

![dumi](../assets/dumi-init.png)

接下来可根据自己需要是否使用国际化，我就去掉了国际化支持，只考虑中文内容

查阅官方文档可以根据自己配置修改自己的博客配置

## 二、创建 github 仓库

### 1、创建 blog 仓库

在刚创建的文档根目录运行如下命令，将工作目录下所有上传 github 远程仓库

```shell
git remote add origin https://github.com/hefeng6500/blog-test.git
git branch -M main
git push -u origin main
```

### 2、创建 [username].github.io 仓库

username 指的是你的 github 用户名

## 三、Github生成访问令牌

github -> setting -> Developer settings -> Personal access tokens -> Generate new token

为保证后续发布顺利，可以将下面所有的权限全部勾选

![generate-new-token](../assets/generate-new-token.png)


## 三、配置 github Actions 流水线

设置 blog 的 DEPLOY_KEY

![dumi](../assets/DEPLOY_KEY.png)



打开当前仓库的 Actions 

![github-actions](../assets/github-actions-init.png)

配置 yml 文件

```yml
# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

# This workflow will install Deno and run tests across stable and nightly builds on Windows, Ubuntu and macOS.
# For more information see: https://github.com/denolib/setup-deno

name: release blog to hefeng6500.github.io

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ${{ matrix.os }} # runs a test on Ubuntu, Windows and macOS

    strategy:
      matrix:
        node: [12]
        os: [ubuntu-latest]

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js 15.x
      uses: actions/setup-node@v1
      with:
        node-version: 15.x

    - name: yarn install, build
      run: |
        yarn
        yarn build
    - name: Deploy
      uses: JamesIves/github-pages-deploy-action@3.7.1
      with:
        ACCESS_TOKEN: ${{ secrets.DEPLOY_KEY }}
        BRANCH: master
        FOLDER: dist
        REPOSITORY_NAME: hefeng6500/hefeng6500.github.io
        TARGET_FOLDER: blog

      env:
        CI: true
```

- on: push、pull request 会触发该 CI
- ACCESS_TOKEN: ${{ secrets.DEPLOY_KEY }} 即为刚刚配置的 ACCESS_TOKEN
- REPOSITORY_NAME：[username]/[username].github.io
- FOLDER: 发布的包文件夹
- TARGET_FOLDER： 发布到哪个目录下


参考： https://www.codenong.com/j5ec65e7df265da771a1fc356/








