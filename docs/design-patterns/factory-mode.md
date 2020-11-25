# 简单工厂模式

- 将 new 操作单独封装
- 遇到 new 时，就要考虑是否该使用工厂模式

```js
class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log('init');
  }
  fn1() {
    console.log('fn1');
  }
  fn2() {
    console.log('fn2');
  }
}

class Creator {
  create(name) {
    return new Product(name);
  }
}

let creator = new Product('test01');
creator.init(); // init
creator.fn1(); // fn1
```

```js
class jQuery {
  constructor(selector) {
    let slice = Array.prototype.slice;
    let dom = slice.call(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for (let i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || '';
  }
  append(node) {}
  addClass(name) {}
  html(data) {}
  // 此处省略若干 API
}
window.$ = function(selector) {
  return new jQuery(selector);
};
```

如上述代码，window.\$实现一个工厂函数，将构造方法与用户隔离开，让用户操作工厂构造出来的对象而不是直接操作 new 返回的实例

## 应用场景

1. **React.createElement()**

```js
var profile = (
  <div>
    <img src="avatar. png" className="profile" />
    <h3>{[user.firstName, user.lastName].join('')}</h3>
  </div>
);
```

```js
var profile = React.createElement(
  'div',
  null,
  React.createElement('img', { src: 'avatar. png', className: 'profile' }),
  React.createElement('h3', null, [user.firstName, user.lastNamel].join(' ')),
);
```

```js
class Vnode {
  constructor(tag, attrs, chilren) {}
  // 省略内部代码
}

React.createElement = function(tag, attrs, children) {
  return new Vnode(tag, attrs, chilren);
};
```

**2. Vue 异步组件**

```js
Vue.components('async-example', function(resolve, reject) {
  setTimeout(() => {
    resolve({
      template: '<div>I am async!</div>',
    });
  }, 1000);
});
```

**设计原则验证：**

- **构造函数和创建者分离**
- **符合开发封闭原则**
