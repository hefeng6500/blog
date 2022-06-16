# JavaScript 高级之手写系列

## 1、forEach

```js
Array.prototype.forEach = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError(' this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const length = this.length;
  let i = 0;
  while (i < length) {
    callback(this[i], i, this);
    i++;
  }
};
```

## 2、map

```js
Array.prototype.map = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const length = this.length;
  let i = 0;
  let result = [];

  while (i < length) {
    result[i] = callback.call(thisArg, this[i], i, this);
    i++;
  }
  return result;
};
```

```js
Array.prototype.map = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  return this.reduce((acc, cur, index, array) => {
    const res = callback.call(thisArg, cur, index, array);
    acc.push(res);
    return acc;
  }, []);
};
```

```js
var xs = ['10', '10', '10'];

xs = xs.map(parseInt);

console.log(xs); // 输出结果为(3) [10, NaN, 2]
```

## 3、reduce

```js
Array.prototype.reduce = function(callback, initValue) {
  if (this === null) {
    throw new TypeError(
      'Array.prototype.reduce ' + 'called on null or undefined',
    );
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const length = this.length;
  let acc = typeof initValue === 'undefined' ? this[0] : initValue;
  let i = typeof initValue === 'undefined' ? 1 : 0;

  while (i < length) {
    acc = callback(acc, this[i], i, this);
    i++;
  }
  return acc;
};
```

## 4、new

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.speak = function() {
  console.log('my name is' + this.name);
};

const person = new (Person, 'jack', 18)();
```

**new 操作符做了什么？**

1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[ 原型 ]] 连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

```js
function myNew(fn, ...rest) {
  const obj = Object.create(fn.prototype);
  const temp = fn.call(obj, ...rest);

  return temp instanceof Object ? temp : obj;
}
```

这里需要需要明确 Object.create() API，源于 ES5，它的 polyfill 实现如下，它是 **克罗克福德** 主张的 **原型式继承**

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

## 5、call

在 context 上添加 fn 属性的目的其实就是在 call 的目标对象 obj 上添加一个属性 fn，使用了 js 语言特有的 this 隐式上下文绑定关系

```js
Function.prototype.call = function(context, ...rest) {
  const fn = Symbol();

  context[fn] = this;

  const result = context[fn](...rest);

  delete context[fn];

  return result;
};
```

## 6、apply

```js
Function.prototype.apply = function(context, argsArray) {
  return this.call(context, ...argsArray);
};
```

## 7、bind

```js
Function.prototype.bind = function(context, ...args) {
  return (...newArgs) => this.apply(context, ...args, ...newArgs);
};
```

bind 还有一个特点，源于：冴羽博客：[JavaScript 深入之 bind 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)

> 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子：

```js
var value = 2;

var foo = {
  value: 1,
};

function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

bind 优化版本

```js
Function.prototype.bind = function(context, ...args) {
  const self = this;
  const fn = function(...newArgs) {
    self.apply(this instanceof fn ? this : context, args.concat(newArgs));
  };

  fn.prototype = Object.create(this.prototype);

  return fn;
};
```
