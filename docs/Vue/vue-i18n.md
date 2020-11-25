# vue-i18n

Vue I18n 是 Vue.js 的国际化插件。它可以轻松地将一些本地化功能集成到你的 Vue.js 应用程序中。

## 快速上手

### 安装

```sh
yarn add vue-i18n
```

```js
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en_US: {
    message: {
      hello: 'hello world',
    },
  },
  zh_CN: {
    message: {
      hello: '你好、世界',
    },
  },
};

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh_CN', // 设置地区
  messages, // 设置地区信息
});

// 通过 `i18n` 选项创建 Vue 实例
new Vue({ i18n }).$mount('#app');
```

### 基于组件的本地化

通常语言环境信息 (例如：locale、messages 等) 会被设置为 VueI18n 实例的构造函数选项，并且该实例会被作为 i18n 选项设置在 Vue 的根实例上。

因此你可以全局地在 Vue 的根实例以及任何被组合的组件中使用 $t 或者 $tc 进行翻译。当然面向 Vue 组件的设计，你也可以更方便的分别控制每个组件的语言环境信息。

基于组件的本地化示例：

```vue
<template>
  <div id="app">
    <p>{{ $t('message.hello') }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  i18n: {
    // `i18n` 选项，为组件设置语言环境信息
    messages: {
      en_US: { message: { hello: 'hello world' } },
      zh_CN: { message: { hello: '你好、世界' } },
    },
  },
};
</script>
```

### 需求

<br>

> Vue 项目中使用 vue-i18n 插件实现语言的切换，支持路由切换国际化延迟加载（没切到指定路由，该路由依然保持原有国际化语言）

<br>

分析：

- 语言环境变更: 设置下拉框切换语言，当前页面语言被切换
- 动态延迟加载国际化翻译

#### 语言环境变更

通常，使用 Vue 根实例作为起点，使用 VueI18n 类的 locale 属性作为参考来本地化所有子组件。

有时你可能希望动态更改语言环境。在这种情况下，你可以更改 VueI18n 实例的 locale 属性的值。

```vue
<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
        lang
      }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data() {
    return { langs: ['zh_CN', 'en_US'] };
  },
};
</script>
```

#### 延迟加载翻译

一次加载所有翻译文件是过度和不必要的。

使用 Webpack 时，延迟加载或异步加载转换文件非常简单。

让我们假设我们有一个类似于下面的项目目录

```js
// i18n/index.js
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './lang/en_US';
import store from '../store';
import axios from 'axios';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: store.state.locale, // 设置语言环境
  messages, // 设置语言环境信息
});

const loadedLanguages = ['en_US']; // 我们的预装默认语言
localStorage.setItem('lang', loadedLanguages);

// 设置 i18n 语言类型
export function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(
        /* webpackChunkName: "lang-[request]" */ `./lang/${lang}`
      ).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default);
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      });
    }
    return Promise.resolve(setI18nLanguage(lang));
  }
  return Promise.resolve(lang);
}
```

简而言之，我们正在创建一个新的 VueI18n 实例。然后我们创建一个 loadedLanguages 数组，它将跟踪我们加载的语言。接下来是 setI18nLanguage 函数，它将实际更改 vueI18n 实例、axios 以及其它需要本地化的地方。

loadLanguageAsync 是实际用于更改语言的函数。加载新文件是通过 import 功能完成的，import 功能由 Webpack 慷慨提供，它允许我们动态加载文件，并且因为它使用 promise，我们可以轻松地等待加载完成。

你可以在 Webpack 文档 中了解有关导入功能的更多信息。

使用 loadLanguageAsync 函数很简单。一个常见的用例是在 vue-router beforeEach 钩子里面。

```js
// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Foo from '../views/foo';
import Bar from '../views/bar';
import { loadLanguageAsync } from '../i18n';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// 路由前置钩子函数，
router.beforeEach((to, from, next) => {
  const lang = store.state.locale;
  loadLanguageAsync(lang).then(() => next());
});

export default router;
```

完成项目见 github 仓库[vue-i18n-demo](https://github.com/hefeng6500/vue-i18n-demo)

## 源码分析
