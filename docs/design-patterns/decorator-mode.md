# 装饰器模式

> 装饰者模式可以动态地 给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象

继承与装饰器相比，都是拓展对象的功能，但继承往往会存在很多问题，一方面会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之改变；另一方面，继承这种功能复用方式通常被称为“白箱复用”，“白箱”是相对可见性而言的， 在继承方式中，超类的内部细节是对子类可见的，继承常常被认为破坏了封装性。

我们如果用装饰器模式给对象进行封装，首先定义对象的基本功能属性，如果需要拓展我们可以使用装饰器对它进行操作，也就是按需添加功能的意思。如果我们一上来就把对象所有的功能全部安装好，会使得这个对象特别大，封装了不必要的属性和方法。

如下示例：

```js
var Plane = function() {};
Plane.prototype.fire = function() {
  console.log('发射普通子弹');
};
var MissileDecorator = function(plane) {
  this.plane = plane;
};
MissileDecorator.prototype.fire = function() {
  this.plane.fire();
  console.log('发射导弹');
};
var AtomDecorator = function(plane) {
  this.plane = plane;
};
AtomDecorator.prototype.fire = function() {
  this.plane.fire();
  console.log('发射原子弹');
};

var plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire(); // 发射普通子弹、发射导弹、发射原子弹
```

对 Plane 进行装饰为 MissileDecorator，再对 MissileDecorator 进行装饰为 AtomDecorator，当调用 plane.fire()时会触发链式调用

![img](https://gblobscdn.gitbook.com/assets%2F-Lx6LIX48CTpC4QvxWxD%2F-M-IRG9dpI2cedRaIAr2%2F-M-Ifc0TtfCyzFVoOZHM%2FQQ%E6%88%AA%E5%9B%BE20200205124912.png?alt=media&token=90720919-77d6-4c92-899e-ceb5a993fc98)

# **\*\*装饰函数\*\***

**装饰器在 javascript 中的使用实践**

---

```js
window.onload = function() {
  console.log(1);
};

// 假设需要在原有的 window.onload 上再添加一些功能（不修改原有 window.onload 函数）
var _onload = window.onload;
window.onload = function() {
  console.log('添加的新功能');
  _onload();
};
// 添加的新功能
// 1
```

**AOP 装饰函数（面向切片编程）**

利用装饰器模式可以在某个固定的函数前面添加**前置装饰**和**后置装饰**，在不改变原函数的情况下为原函数添加更多的职责。

```js
Function.prototype.before = function(fn) {
  var self = this;
  return function() {
    fn.apply(this, arguments);
    return self.apply(this, arguments);
  };
};

Function.prototype.after = function(fn) {
  var self = this;
  return function() {
    var result = self.apply(this, arguments);
    fn.apply(this, arguments);
    return result;
  };
};

function bar() {
  console.log('是谁在昭明书院风度翩翩');
}
var foo = bar
  .before(function() {
    console.log('是谁在逢源桥上惊鸿一现');
  })
  .after(function() {
    console.log('小桥流水');
  });
js;
foo();
// 是谁在逢源桥上惊鸿一现
// 是谁在昭明书院风度翩翩
// 小桥流水
```

> 用 AOP 装饰函数的技巧在实际开发中非常有用。不论是业务代码的编写，还是在框架层面， 我们都可以把行为依照职责分成粒度更细的函数，随后通过装饰把它们合并到一起，这有助于我 们编写一个松耦合和高复用性的系统

再来一个示例：

在原有封装好的 Ajax 函数上添加 Token，不修改原有 ajax，而是使用装饰器

**重点说明的是：before 函数内修改 arguments 时会使得 ajax 内的 arguments 也跟着变化**

```js
var ajax = function(type, url, param) {
  console.log(param); // 发送ajax 请求的代码略
};
var getToken = function() {
  return 'Token';
};
Function.prototype.before = function(fn) {
  var self = this;
  return function() {
    fn.apply(this, arguments);
    return self.apply(this, arguments);
  };
};
ajax = ajax.before(function(type, url, param) {
  param.Token = getToken();
});
ajax('get', 'http:// xxx.com/userinfo', {
  name: 'sven',
});
```

[
](https://2443992009.gitbook.io/web-fullstack/she-ji-mo-shi/kuo-pei-qi-mo-shi)
