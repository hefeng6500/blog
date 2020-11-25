# 观察者模式

```js
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

// 0
// 观察者模式.html:41 state in update,observer: o1,state: 1
// 观察者模式.html:41 state in update,observer: o2,state: 1
// 观察者模式.html:41 state in update,observer: o3,state: 1
```

[观察者模式 vs 发布订阅模式](https://zhuanlan.zhihu.com/p/51357583)
