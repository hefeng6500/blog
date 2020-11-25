# vue3-app

## v-model 指令

```html
// vue 2.x
<ant-input v-model="inputValue"></ant-input>

// vue 3.x
<ant-input v-model:inputValue="inputValue"></ant-input>
```

v-model 指令在 vue 2.x 和 vue 3.0 存在一些差别

- 2.x 中 v-model 语法糖底层使用的是 :value 和 emit('input')， 绑定属性值是 value
- 3.0 中可以绑定一个自定义值，v-model:firstName="firstName", :value="firstName" 和 @input="$emit('update:firstName', $event.target.value)"
- 添加自定义修饰符 v-model.capitalize

## setup 函数

- 只执行一次

- 优先于 created 执行

- 接收两个参数：`props`、`context`

  1. `props`为组件传参绑定的属性

     `props`是响应性的值。如果使用 ES6 对其进行结构会破坏响应性结构，可以使用 `toRefs` 函数在 `setup()` 中操作

     ```js
     import { toRefs } from 'vue'
     setup(props) {
     	const { title } = toRefs(props)
     	console.log(title.value)
     }
     ```

  **爸爸你可以给，但是要不要得看我**
  另需要注意的是： 在给某个组件传入参数时，例如 `v-model:foo="'foo'"` 或者 `v-bind:bar="'bar'"`， 都需要在子组件的 props 中注册，才能在 `setup()` 的 `props` 中获取到。


都说到 `props` 了，那就继续聊一聊 props 和 v-model 的变化



在 Vue 2.2 版本中添加了 `model ` Option，用于自定义组件在使用 `v-model` 时定制 `prop `和 `event`，但是如果需要在组件上同步绑定多个值，在已使用 `v-model` 的前提下，就只能使用 `v-bind.sync` 了, 但是 ` v-bind.sync` 和 `v-model` 做着同样的事情，所以为什么不把他们合并到一个中呢？所以 Vue 3.0 就丰富了 `v-model` 语法糖的建设，可以使用 `<el-input v-model:value="value" v-model:foo="foo" :bar="foo"></el-input>` 绑定多个值，实现数据的双向绑定。[**rfcs-0011-v-model-api-change**](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0011-v-model-api-change.md)



v-model不携带参数时，编译代码如下：

```js
h(Comp, {
  modelValue: foo,
  'onUpdate:modelValue': value => (foo = value)
})
```

绑定了 `modelValue ` 值，生命周期函数 `onUpdate ` 时更新 `v-model` 绑定的值



v-model不携带参数时，编译代码如下：

```js
h(Comp, {
  value: foo,
  'onUpdate:value': value => (foo = value)
})
```

可以绑定了多个 `value `值，生命周期函数 `onUpdate ` 时更新 `v-model` 绑定的值



既然说到了 v-model，`v-model` 还可以自定义修饰符， 如 `v-model.capitalize` ，但是这都是基于组件级别的修饰符，不是添加 全局或者类似于 `v-model.trim` 到处可用的 修饰符。



看完回头思考下，上述说到这么多关于 `v-model` 的语法糖，对于组件来说，不都是基于 单项数据流 的 **值传递 ( props )** 和 **事件传播 ( $emit )**么？

感悟：

​		框架 --> 基础建筑 ,语法糖 --> 上层建筑，

​		原生JS --> 基础建筑， 框架 --> 上层建筑



所以，作为初中级前端，应该扎实 原生js 能力，不仅仅是 API 的使用，需要懂得背后的原理，和用于构建上层建筑的架构建设，你看，在 Vue 这样流行的框架上，作者的 JS 能力可不可以说是登峰造极呢？



2. `context ` 对象包含三个属性 slots、attr、emit

   ​	slots: 作用域插槽

   ​	attr: 属性

   ​	emit: 事件传播函数

   与 `prop` 不同，context 是普通对象，不是响应式的，slots 和 attr 的值会在组件时更新而更新，如果需要监听  `slots` 、'attr' 的更新触发的副作用，建议在 `setup()` 函数中添加 `onUpdated` 函数监听副作用

3. 1212



- 如果`setup`返回一个对象，则可以在组件的模板中访问该对象的属性

  ```vue
  <template>
    <div>{{ readersNumber }} {{ book.title }}</div>
  </template>

  <script>
  import { ref, reactive } from 'vue';

  export default {
    setup() {
      const readersNumber = ref(0);
      const book = reactive({ title: 'Vue 3 Guide' });

      // expose to template
      return {
        readersNumber,
        book,
      };
    },
  };
  </script>
  ```

* `setup` 还可以返回一个渲染函数，该渲染函数可以直接使用在同一作用域中声明的反应状态。

  可以把 `script` 标签中的代码独立到一个 js 文件中，作为一个 **函数式组件** 应用

  ```vue
  // MyBook.vue
  <script>
  import { h, ref, reactive } from 'vue';
  export default {
    setup() {
      const readersNumber = ref(0);
      const book = reactive({ title: 'Vue 3 Guide' });
      // Please note that we need to explicitly expose ref value here
      return () => h('div', [readersNumber.value, book.title]);
    },
  };
  </script>
  ```

* `setup()` 中的 `this` 不是当前组件实例，实际打印发现为 `undefined` ， 不建议 `setup()` 与 Option API 混用，可能会造成混乱。

  | Options API       | Hook inside inside `setup` |
  | ----------------- | -------------------------- |
  | `beforeCreate`    | Not needed\*               |
  | `created`         | Not needed\*               |
  | `beforeMount`     | `onBeforeMount`            |
  | `mounted`         | `onMounted`                |
  | `beforeUpdate`    | `onBeforeUpdate`           |
  | `updated`         | `onUpdated`                |
  | `beforeUnmount`   | `onBeforeUnmount`          |
  | `unmounted`       | `onUnmounted`              |
  | `errorCaptured`   | `onErrorCaptured`          |
  | `renderTracked`   | `onRenderTracked`          |
  | `renderTriggered` | `onRenderTriggered`        |

## reactive 函数

- 接收一个普通对象然后返回该普通对象的响应式代理。等同于 2.x 的 `Vue.observable()`
- 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
- 返回的代理对象**不等于**原始对象
- 建议仅使用代理对象而避免依赖原始对象

```js
import { reactive } from 'vue';
setup() {
  const state = reactive({
    org: {
      name: "W3C",
    },
  });
  return {
    state
  }
},
```

需要搞清楚一点的是，reactive API 返回的响应式对象 state，在 `setup()` 中访问可以直接 state.org.name 访问到值，不需要添加 `.value`,在 template 中访问也不用 `.vaule`

```vue
<template>
  <div>
    <h2>{{ state }}</h2>
    <h2>{{ state.org.name }}</h2>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      org: {
        name: 'W3C',
      },
    });
    setTimeout(() => {
      console.log(state); // W3C
      state.org.name = 'vue';
    }, 1000);
    return {
      state,
    };
  },
};
</script>
```

## ref 函数

- 接受一个参数值并返回一个响应式且可改变的 ref 对象
- ref 对象拥有一个指向内部值的单一属性 `.value`
- 当 `ref` 作为渲染上下文的属性返回并在模板中进行访问时，它将自动解构为内部值。无需`.value`在模板中追加：
- 如果传入 ref 的是一个对象，将调用 `reactive` 方法进行深层响应转换

```vue
<template>
  <div>
    <h2>{{ obj }}</h2>
    <h3>{{ count }}</h3>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
export default {
  setup() {
    const obj = ref({
      org: {
        name: 'W3C',
      },
    });
    const count = ref(0);

    console.log(obj); // RefImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}
    console.log(count); // RefImpl {_rawValue: 0, _shallow: false, __v_isRef: true, _value: 0}

    console.log(obj.value); // Proxy {org: {…}}
    console.log(obj.value.org.name); // W3C
    console.log(obj.value); // 0

    return {
      obj,
      count,
    };
  },
};
</script>

<style scoped></style>
```

可以看到：

​ `ref()` 返回一个 RefImpl 对象

​ 可以看到 `ref()` 函数传入一个对象，返回值需要用 `.value` 访问，`obj.value` 返回的是一个 Proxy 代理响应式对象

- 当 ref 作为 reactive 对象的 property 被访问或修改时，也将自动解套 value 值，其行为类似普通属性

```js
const count = ref(0);
const state = reactive({
  count,
});

console.log(state.count); // 0

state.count = 1;
console.log(count.value); // 1
```

- 如果将一个新的 ref 分配给现有的 ref， 将替换旧的 ref

```js
const otherCount = ref(2);

state.count = otherCount; // 修改了 count 值指向
console.log(state.count); // 2
console.log(count.value); // 1
```

- 当嵌套在 reactive `Object` 中时，ref 才会解套。从 `Array` 或者 `Map` 等原生集合类中访问 ref 时，不会自动解套：

```js
const arr = reactive([ref(0)]);
// 这里需要 .value
console.log(arr[0].value);

const map = reactive(new Map([['foo', ref(0)]]));
// 这里需要 .value
console.log(map.get('foo').value);
```

- 有时我们可能需要为 ref 做一个较为复杂的类型标注。我们可以通过在调用 `ref` 时传递泛型参数来覆盖默认推导： **_这点我还没看懂_**

```js
const foo = (ref < string) | (number > 'foo'); // foo 的类型: Ref<string | number>

foo.value = 123; // 能够通过！
```

## toRefs 函数

- toRefs() 传入的对象必须是一个响应式对象，可以对该响应式对象进行解构,在模板中可以直接访问该对象的 key
- 将 reactive() 创建出来的响应式对象，转换为普通的对象，这个普通对象上的每个属性节点，都是 ref() 类型的响应式数据

```js
<template>
  <h1>{{ count }}</h1>
</template>

import { toRefs } from 'vue';

setup() {
  const state = reactive({
    count: 0
  })
}

return {
	...toRefs(state)
}
```

## watch 函数

```js
const route = useRoute();

watch(
  () => route.path,
  newValue => {
    state.seletctedKeys = [newValue];
  },
);
```

## computed 函数

```js
const seletctedKeys = computed(() => {
  return [route.path];
});
```

## effect 函数

**effect、watch、watchEffect 的区别？**

1. watch 用于观察特定的数据源，并在回掉函数处理数据源变化的逻辑，默认情况下是 **惰性** 的，在监视的数据源更新下才会执行回调函数。
   特点：

- 懒惰的执行副作用
- 更具体地说明应触发观察程序重新运行的状态 ？？？
- 可以访问 watch 数据源变化的前后值
- 与 Options API 的 watch 效果相同

```js
// watching a getter
const state = reactive({ count: 0 });
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  },
);

// directly watching a ref
const count = ref(0);
watch(count, (count, prevCount) => {
  /* ... */
});
```

观察多个数据源

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
});
```

2. watchEffect

- 立即运行回调函数
- 首次运行时收集依赖属性，当依赖属性发生变化时，会再次执行回调函数
- 返回停止句柄，可以调用该句柄以显式停止观察程序

```js
const stop = watchEffect(() => {
  /* ... */
});

// later
stop();
```

## data 函数

在 rfcs 中就有提到 `data()` 将不在支持作为一个对象，只能作为一个 `function` 返回一个对象。虽然在 Vue 2.x 中可以返回一个状态进行状态共享，但是这势必会引发一些问题，而且如果要实现这种状态共享，function 完全可以替代，通过 `function` 返回对象，`v-bind` 给子组件就可以实现状态共享，使用 object 会对逻辑造成紊乱，并且需要示例去说明，更加重了学习者的心智负担！所以在 Vue 3.0 中不再支持 `object` 方式，强行使用编译不会通过，并且给出警告：`[Vue warn]: data() should return an object.` [Detailed design](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0019-remove-data-object-declaration.md#detailed-design)

## Global API & Composition API

在 Vue2.x 的版本中，在 Vue.prototype 定义了全局 API，如下：这会导致 Vue 库的整体体积较大，部署生产时即使未用到的 API ，也会被打包。

```js
import Vue from 'vue';

Vue.nextTick(() => {});

const obj = Vue.observable({});
```

Vue 3.0 在平衡功能和包体积大小做了一定的努力，力图在 Vue 包做到更新并且不限制其功能。Vue 3.0 中使用了 **组合式 API**，通过 ES Modules 的静态分析的设计，与现代的 捆绑器 webpack 和 rollup 相结合，Tree-shaking 中剔除了那些未在项目使用却导出 ES Module API，如此，用户只会使用到那些 `import` 的 API.

**需要注意的是**: 在使用模块打包器构建 ES Module 包时可以 Tree-shaking，在打包 UMD 构建包时还是会全局打包 API 至 Vue 全局变量中.

## teleport 传送

teleport 组件的实现动机时，解决了组件树的一个弱点， 能够将组件中的模板迁移带 DOM 的其他位置，在没有我们的 DOM 树的情况下，将其从深层嵌套的位置中分解出来。

example:

```html
<body>
  <div id="app">
    <h1>Move the #content with the portal component</h1>
    <teleport to="#endofbody">
      <div id="content">
        <p>
          this will be moved to #endofbody.<br />
          Pretend that it's a modal
        </p>
        <Child />
      </div>
    </teleport>
  </div>
  <div id="endofbody"></div>
  <script>
    new Vue({
      el: '#app',
      components: {
        Child: { template: '<div>Placeholder</div>' },
      },
    });
  </script>
</body>
```

result:

```html
<div id="app">
  <!-- -->
</div>
<div id="endofbody">
  <div id="content">
    <p>
      this will be moved to #endofbody.<br />
      Pretend that it's a modal
    </p>
    <div>Placeholder</div>
  </div>
</div>
```

[Detailed design](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0025-teleport.md#detailed-design)

[1][vuejs-rfcs. https://github.com/vuejs/rfcs](https://github.com/vuejs/rfcs)

[2][composition-api https://composition-api.vuejs.org/zh/](https://composition-api.vuejs.org/zh/)

[3][vue 3.0. https://v3.vuejs.org/api/application-config.html](https://v3.vuejs.org/api/application-config.html)
