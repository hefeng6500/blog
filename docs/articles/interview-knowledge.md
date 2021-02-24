# 面试知识点

## 计算机基础

- 计算机组成原理
- 计算机网络 TCP、HTTP 1.0、HTTP 1.1、HTTP 2、TLS、HTTPS

## 前端基础 HTML

- html 版本及历史发展
- html 语义化
- html5 新特性：表单、Stroage、Canvas、SVG、音视频、WebGL、WebWorker、WebSocket

## 前端技术 CSS

- 常用 CSS 属性及值得含义
- 盒子模型
- 定位
- float 布局，浮动清除方式、BFC
- Flex 布局，各个属性的含义及实际使用的效果，flex: 1
- CSS3 新特性：shadow、liner-grident、flex、@keyframes、@font-face、2D/3D 转换(transform、translate、rotate、scale、skew)
- 经典布局：圣杯布局、双飞翼布局、左侧定宽右侧自适应
- 响应式开发：媒体查询 @media
- rem 开发
- less、scss、stylus 预编译器

### 浏览器页面渲染

- 加载页面流的方式
- 从输出 url 到加载完页面的整体过程？
- 阻塞页面渲染的方式和原因？以及如何解决？常用性能优化手段以及项目中使用了哪些？
- 如何调试？ F12 debugger、network、waterfall、调用栈
- performance API 性能监控，报错监控
- 浏览器兼容性
- 浏览器存储：Stroage、Cookie、IndexDB

## 前端技术 javaScript

## 基础 javaScript

- 基本数据类型，隐式转换
- Object 数据类型
- 函数闭包
- 原型和继承、组合
- 作用域、this、call/apply、bind、new
- DOM API
- BOM API： window、location、history、navigator、screen
- 事件代理
- ES6+
- requestAnimationFrame()

## 高阶 javaScript

- 事件循环
- 高阶函数
- 防抖节流
- 递归

## 算法

- 快速排序
- 分组排序-
- 链
- 树

## 设计模式

- 工厂模式
- 发布订阅模式
- 观察者模式
- 装饰器模式
- 单例模式
- 策略模式

## 前端工程化

- 模块规范 ES6、AMD、CMD、UMD
- webpack
- glup
- rollup
- lerna、monorepo 多包管理
- vue-cli、vite、react-script
- 组件模块化
- CI/CD
- 代码规范、编程风格、eslint、prettier
- 版本管理 Git，git flow

## webpack

- 基本配置
- chunks
- 插件
- loaders
-

## Vue

- 基本特点：渐进式、模板语法、双向绑定、指令、生命周期、计算属性、监听、动态 class/style、props/emit、slot、keep-alive 等等
- 每个生命周期函数底层原理
- vue-router 特点：路由分发，提供导航、动态路由、query/params 路由带参、组件懒加载
- vuex 特点：全局状态管理，state、mutation、action、getter、命名空间
- ElementUI、Antd、Material、Iview 等等

### Vue 源码分析

- 双向数据绑定原理：

```
Object.defineProperty() 劫持对象、重写数组api实现数组变化劫持;
使用 Dep 收集 Watcher，
采用发布订阅模式：
diff 差异算法实现最小的 dom 修改
```
