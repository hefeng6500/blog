# 单例模式

> **保证一个类仅有一个实例，并提供一个访问它的全局访问点。** ----《JavaScript 设计模式与开发实践》

```js
class SingleObject {
  login() {
    console.log('login...');
  }
}

SingleObject.getInstance = (function() {
  let instance;
  return function() {
    if (!instance) {
      instance = new SingleObject();
    }
    return instance;
  };
})();

let obj1 = SingleObject.getInstance();
obj1.login(); // login...
let obj2 = SingleObject.getInstance();
obj2.login(); // login...
console.log('obj1 === obj2', obj1 === obj2); // obj1 === obj2 true

// JS无法控制用户直接new
let obj3 = new SingleObject();
obj3.login(); // login...
console.log('obj1 === obj3', obj1 === obj3); // obj1 === obj3 false
```

```js
class LoginForm {
  constructor() {
    this.state = 'hide';
  }

  show() {
    if (this.state === 'show') {
      alert('已经显示');
      return;
    }
    this.state = 'show';
    console.log('登录框显示成功');
  }

  hide() {
    if (this.state === 'hide') {
      alert('已经隐藏');
      return;
    }
    this.state = 'hide';
    console.log('登录框隐藏成功');
  }
}

LoginForm.getInstance = (function() {
  let instance;
  return function() {
    if (!instance) {
      instance = new LoginForm();
    }
    return instance;
  };
})();

let log1 = LoginForm.getInstance();
let log2 = LoginForm.getInstance();
log1.show(); // 已经显示
log2.hide(); // 已经隐藏

console.log('log1 === log2', log1 === log2); // log1 === log2 true
```

场景：

1. 购物车
2. Vuex 、Redux 的 Store

首先创建一个普通的单例模式，保证一个类仅有一个示例，并且提供全局访问，全局单例嘛！

```js
let Singleton = function() {
  this.name = name;
  this.instance = null;
};

Singleton.getInstance = function() {
  if (!this.instance) {
    this.instance = new Singleton();
  }
};

let obj1 = Singleton.getInstance();
let obj2 = Singleton.getInstance();

console.log('obj1 === obj2', obj1 === obj2); // obj1 === obj2 true
```

若某个使用者并不知道这是一个单例模式呢？而是直接使用了 new 关键词呢？那么就不能保证全局单例了，如下改进方法：通过闭包封装实例对象

```js
let CreateDiv = (function() {
  let instance;
  let CreateDiv = function(html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();

    return (instance = this);
  };

  CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };

  return CreateDiv;
})();

let div1 = new CreateDiv('div1');
let div2 = new CreateDiv('div2');

console.log('div1 === div2', div1 === div2); // div1 === div2 true
```

如上书写还有问题，就是不符合 “**单一职责原则**”，将创建对象的职责和管理单例的职责都包在自执行函数里面了，应该将以上代码解耦合。

```js
// 单一职责： 管理全局单例
let ProxySingletonCreateDiv = (function() {
  let instance;
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  };
})();

// 单一职责： 创建对象
let CreateDiv = (function() {
  let CreateDiv = function(html) {
    this.html = html;
    this.init();
  };

  CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();

let div1 = new ProxySingletonCreateDiv('div1');
let div2 = new ProxySingletonCreateDiv('div2');

console.log('div1 === div2', div1 === div2); // div1 === div2 true
```

实例一般都狮子啊使用的时候才去会创建。有如下需求：

点击一个按钮可以创建一个 div 标签，多次点击还是一个 div 标签；把这个需求做成通用需求，比如创建一个 iframe、script 等等

```js
// 通用惰性单例
let getSingle = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
};

var createLoginLayer = function() {
  var div = document.createElement('div');
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
};

let createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function() {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
};
```

个人总结：

单例模式就是：全局只有一个这个类的一个示例。核心代码如下：

如果存在，直接导出；如果不存在，就创建；

```js
var obj;
if (!obj) {
  obj = new CreateDiv();
}
return obj;
```
