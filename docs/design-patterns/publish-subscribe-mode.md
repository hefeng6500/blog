# 发布订阅模式

发布-订阅模式又叫观察者模式（但本人对此持否定意见），他定义了一种一对多的依赖关系，即当一个对象的状态发生改变的时候，所有依赖他的对象都会得到通知。

订阅者将数据存储在一个数组中，当发布者有新的状态更新时，遍历这个缓存数组进行函数调用，从而达到新消息通知。

作为一名前端开发人员，给 DOM 节点绑定事件可是再频繁不过的事情。比如如下代码

```js
document.body.addEventListener(
  'click',
  function() {
    alert(2333);
  },
  false,
);

document.body.click(); //模拟点击事件
```

这里我们订阅了 document.body 的 click 事件，当 body 被点击的时候，他就向订阅者发布这个消息，弹出 2333.我们也可以随意的增加和删除订阅者，当消息一发布，所有的订阅者都会收到消息。

```js
document.body.addEventListener(
  'click',
  function() {
    alert(11111);
  },
  false,
);
document.body.addEventListener(
  'click',
  function() {
    alert(222);
  },
  false,
);
document.body.addEventListener(
  'click',
  function() {
    alert(333);
  },
  false,
);
document.body.click(); //模拟点击事件
```

值得注意的是，手动触发事件这里我们直接用了 document.body.click()；但是更好的做法是 IE 下用 fireEvent，标准浏览器下用 dispatchEvent，如下：

```js
let fireEvent = function(element, event) {
  if (document.createEventObject) {
    var evt = document.createEventObject();
    return element.fireEvent('on' + event, evt);
  } else {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, true, true);
    return element.dispatchEvent(evt);
  }
};
document.addEventListener('shout', function(event) {
  alert('shout');
});
fireEvent(document, 'shout');
```

```js
let Event = (function() {
  let clientList = {};
  let listen;
  let trigger;
  let remove;

  listen = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  trigger = function() {
    let key = Array.prototype.shift.call(arguments);
    let fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  };

  remove = function(key, fn) {
    let fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    }

    for (let i = 0; i < fns.length; i++) {
      if (fn === fns[i]) {
        fns.splice(i, 1);
      }
    }
  };

  return {
    listen,
    trigger,
    remove,
  };
})();
let fn1 = function(price) {
  console.log(`价格${price}`);
};
Event.listen('square88', fn1);
// Event.remove('square88', fn1)

Event.trigger('square88', 2000000);
```

### **JavaScript 实现发布-订阅模式的便利性**

因为 JavaScript 有回调函数这个优势存在，我们写开发-订阅显得更简单一点。传统的发布-订阅比如 Java 通常会把订阅者自身当成引用传入发布者对象中，同时订阅者对象还需提供一个名为诸如 update 的方法，供发布者对象在合适的时候调用。下面代码用 js 模拟下传统的实现。

```js
function Dep() {
  this.subs = [];
}
Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
};
Dep.prototype.notify = function() {
  this.subs.forEach(sub => sub.update());
};
function Watcher(fn) {
  this.fn = fn;
}
Watcher.prototype.update = function() {
  this.fn();
};

var dep = new Dep();
dep.addSub(
  new Watcher(function() {
    console.log('okokok');
  }),
);
dep.notify();
```
