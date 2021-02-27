# 观察者模式 和 发布-订阅 模式

<Badge>设计模式</Badge>

为了便于后续概念讲解，首先分别用两段代码实现一下 `观察者模式` 和 `发布-订阅模式`;

**观察者模式**

```js
// Subject 作为被观察者，向外提供接口 attach 供观察者 Observe 调用
// 而观察者 Observe 也会向外提供接口 update 供被观察者在状态变化时进行通知
function Subject() {
  this.state = 0;
  this.observers = [];
}
Subject.prototype = {
  getState: function() {
    return this.state;
  },
  setState: function(state) {
    this.state = state;
    this.notifyAllObservers();
  },
  notifyAllObservers: function() {
    this.observers.forEach(observer => {
      observer.update();
    });
  },
  attach: function(observer) {
    this.observers.push(observer);
  },
};

function Observer(name, subject) {
  this.name = name;
  this.subject = subject;
  this.subject.attach(this);
}
Observer.prototype.update = function() {
  console.log(
    'state in update,' +
      'observer: ' +
      this.name +
      ',state: ' +
      this.subject.state,
  );
};

var s = new Subject();
var o = new Observer('o1', s);
var o1 = new Observer('o2', s);
var o2 = new Observer('o3', s);
console.log(s.getState());
s.setState(1);
```

**发布-订阅模式**

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
      console.log(this);
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

## 观察者模式

- Subject: **被观察者**（或 **主题**）
- Observer: **观察者**

打个简单的比喻： 戏院(**被观察者**)和观众(**观察者**)，观众只要再戏院网站买了票(调用 `attach` 方法)，戏院只要有节目演出，就会以短信的形式告诉你：“我这里有戏看！”(调用 `observer.update()`)，

```js
var s = new Subject();
var o = new Observer('o1', s);
var o1 = new Observer('o2', s);
var o2 = new Observer('o3', s);
console.log(s.getState());
s.setState(1);
```

可以看到 o, o1, o2 作为观察者都在观察 s, s 只要状态一发生变化，o, o1, o2 中的 `update()` 就会被调用！

## 发布-订阅模式

我们使用了一个对面描述发布-订阅模式

- Event.listen: 订阅者
- Event.trigger: 发布者

可以看到 **发布者** 和 **订阅者** 之间并没有像观察者一样，初始的时候就被 `attach()`，反而是两者互不关联，而是通过 Event 这个 **事件中心** 在协调两者之间的通信。

## 总结

- 观察者模式中，观察者知道主题，主题也知道观察者；发布-订阅模式中，发布者和订阅者不需要彼此了解，它们只是在消息队列或代理的帮助下进行通信。
- 在发布者-订阅者模式中，与观察者模式相反，组件是松散耦合的
- 观察者模式大多数时候是同步的，比如当事件触发，Subject 就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）
- 观察者 模式需要在单个应用程序地址空间中实现，而发布-订阅更像交叉应用模式。

[观察者模式 vs 发布-订阅模式](https://juejin.cn/post/6844903513009422343)

观察者模式

![](../assets/Observer_design_pattern.png)

发布订阅模式

![](../assets/Pub-Sub_Pattern.gif)

观察者模式和发布订阅模式的区别

![](../assets/major_difference.jpeg)
