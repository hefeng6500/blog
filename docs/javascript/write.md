# JavaScript 高级之各种手写系列

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
  return (...newArgs) => this.apply(context, args.concat(newArgs));
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

## 8、promise

1、实现基本 `promise` 架构

```js
class Promise {
  static resolve() {}
  static reject() {}

  constructor() {}

  then() {}

  catch() {}
}
```

2、实现 `exector` 执行器，`resolve`，`reject` 函数

```js
class Promise {
  static resolve() {}
  static reject() {}

  static PENDING = 'pending';
  static RESOLVED = 'resolved';
  static REJECTED = 'rejected';

  constructor(exector) {
    this.state = Promise.PENDING;
    this.value = undefined;
    this.reason = undefined;

    const resolve = value => {
      if (this.state === Promise.PENDING) {
        this.value = value;
        this.state = Promise.RESOLVED;
      }
    };
    const resolve = reason => {
      if (this.state === Promise.PENDING) {
        this.reason = reason;
        this.state = Promise.REJECTED;
      }
    };

    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then() {}

  catch() {}
}
```

3、实现 `promise` 的同步 `resolve`，`reject`

```js
class Promise {
  static resolve() {}
  static reject() {}

  static PENDING = 'pending';
  static RESOLVED = 'resolved';
  static REJECTED = 'rejected';

  constructor(exector) {
    this.state = Promise.PENDING;
    this.value = undefined;
    this.reason = undefined;

    const resolve = value => {
      if (this.state === Promise.PENDING) {
        this.value = value;
        this.state = Promise.RESOLVED;
      }
    };
    const resolve = reason => {
      if (this.state === Promise.PENDING) {
        this.reason = reason;
        this.state = Promise.REJECTED;
      }
    };

    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulFilled, onRejected) {
    if (this.state === Promise.RESOLVED) {
      onFulFilled(this.value);
    }

    if (this.state === Promise.REJECTED) {
      onRejected(this.reason);
    }
  }

  catch() {}
}
```

4、实现 `promise` 异步的 `resolve`， `reject`

```js
class Promise {
  static resolve() {}
  static reject() {}

  static PENDING = 'pending';
  static RESOLVED = 'resolved';
  static REJECTED = 'rejected';

  constructor(exector) {
    this.state = Promise.PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.state === Promise.PENDING) {
        this.value = value;
        this.state = Promise.RESOLVED;
        this.onResolvedCallbacks.forEach(fn => fn(this.value));
      }
    };
    const reject = reason => {
      if (this.state === Promise.PENDING) {
        this.reason = reason;
        this.state = Promise.REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn(this.reason));
      }
    };

    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulFilled, onRejected) {
    if (this.state === Promise.PENDING) {
      this.onResolvedCallbacks.push(onFulFilled);
      this.onRejectedCallbacks.push(onRejected);
    }

    if (this.state === Promise.RESOLVED) {
      onFulFilled(this.value);
    }

    if (this.state === Promise.REJECTED) {
      onRejected(this.reason);
    }
  }

  catch() {}
}
```

5、实现 `promise` 的链式调用

```js
class Promise {
  static resolve() {}
  static reject() {}

  static PENDING = 'pending';
  static RESOLVED = 'resolved';
  static REJECTED = 'rejected';

  constructor(exector) {
    this.state = Promise.PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      if (this.state === Promise.PENDING) {
        this.value = value;
        this.state = Promise.RESOLVED;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    const reject = reason => {
      if (this.state === Promise.PENDING) {
        this.reason = reason;
        this.state = Promise.REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulFilled, onRejected) {
    // 针对 then 传入的回调函数为 null 的情况，直接将值返回
    // p.then(null).then((res) => {
    //   console.log(res);
    // });
    onFulFilled =
      typeof onFulFilled === 'function' ? onFulFilled : value => value;

    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason;
          };

    // 实现链式调用
    let promise = new Promise((resolve, reject) => {
      if (this.state === Promise.PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
              resolvePromise(promise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }

      if (this.state === Promise.RESOLVED) {
        setTimeout(() => {
          try {
            // 上一个 then 函数里面可能有很多逻辑
            // 可能报错
            // 可能返回一个固定值
            // 可能返回一个同步的 promise
            // 可能返回一个异步的 promise

            let x = onFulFilled(this.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
    });

    return promise;
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // let promise = new Promise((resolve) => {
  //   resolve(1);
  // }).then(() => {
  //   return promise;
  // });

  // 出现循环引用
  if (x === promise) {
    reject(
      new TypeError(
        'TypeError: Chaining cycle detected for promise #<Promise>',
      ),
    );
  }

  // 加锁，防止别人的 promise 不遵守 "状态一旦被修改不可再变化"
  let called = false;

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            // 如果返回的 promise 还是一个 promise
            // 递归解析 y 的值，直至为常量为止
            resolvePromise(promise, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
      } else {
        // 带有then的对象
        // x: {
        //   then: {}
        // }
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      // 有可能 x.then 的时候报错
      reject(error);
    }
  } else {
    // 上一个 then return 了普通值
    resolve(x);
  }
}

// 使用 promises-aplus-tests 测试
Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
```

6、实现

- Promise.resolve
- Promise.reject
- catch
- finally
- all
- race
- allSettled
- promisify
- promisifyAll

```js
// 1、基本架构：
//   状态
//   then
//   执行器函数 executor

// 2、executor、resolve、reject
// 3、then 同步下调用
// 4、then 异步下调用
// 5、then 链式调用
//   返回 Promise
//   then 函数递归返回常量结果，供下个 then 使用
//   考虑 then 成功的回调为 null 的情况

class Promise {
  static PENDING = 'pending';
  static RESOLVED = 'resolved';
  static REJECTED = 'rejected';

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  constructor(executor) {
    this.state = Promise.PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }

      if (this.state === Promise.PENDING) {
        this.state = Promise.RESOLVED;
        this.value = value;

        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    const reject = reason => {
      this.state = Promise.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn());
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason;
          };

    let promise = new Promise((resolve, reject) => {
      if (this.state === Promise.PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }

      if (this.state === Promise.RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });

    return promise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  all(arr) {
    let count = 0;
    let result = [];

    return new Promise((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        Promise.resolve(arr[i])
          .then(res => {
            result[i] = res;
            if (++count === arr.length) {
              resolve(res);
            }
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  race(arr) {
    return new Promise((resolve, reject) => {
      arr.forEach(item => Promise.resolve(item).then(resolve, reject));
    });
  }

  finally(callback) {
    return this.then(
      value => {
        return Promise.resolve(callback()).then(() => value);
      },
      reason => {
        return Promise.resolve(callback()).then(() => {
          throw reason;
        });
      },
    );
  }

  allSettled(arr) {
    let count = 0;
    let result = [];

    return new Promise((resolve, reject) => {
      const fn = (i, data) => {
        if (count === arr.length) {
          resolve(result);
        }

        result[i] = data;
        count++;
      };

      for (let i = 0; i < arr.length; i++) {
        Promise.resolve(arr[i])
          .then(res => {
            fn(i, { status: 'fulfilled', value: res });
          })
          .catch(error => {
            fn(i, { status: 'rejected', reason: error });
          });
      }
    });
  }

  // from Node Util.promisify
  promisify(f) {
    return function(...args) {
      return new Promise((resolve, reject) => {
        function callback(error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }

        args.push(callback);

        f.call(this, ...args);
      });
    };
  }

  // from Node Util.promisifyAll
  promisifyAll(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'function') {
        obj[key] = this.promisify(obj[key]);
      }
    }
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // let promise = new Promise((resolve) => {
  //   resolve(1);
  // }).then((res) => {
  //   return promise;
  // });

  if (x === promise) {
    throw TypeError('循环引用');
  }

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called;

    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
      } else {
        // x: { then: {} }
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 返回了常量，直接 resolve
    resolve(x);
  }
}

const p = new Promise((resolve, reject) => {
  reject(1);
});

p.catch(error => {
  console.log('error + ', error);
  return error;
}).then(res => {
  console.log(res);
});

Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
```

## 9、防抖

```js
function debounce(fn, options) {
  const { delay } = options;
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, ...args);
      timer = null;
    }, wait);
  };
}
```

## 10、节流

```js
function throttle(fn, options) {
  const { delay } = options;
  let timer;

  return function(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      fn.call(this, ...args);
      timer = null;
    }, delay);
  };
}
```

## 11、函数柯里化

**柯里化** 是一种转换，将 `f(a,b,c)` 转换为可以被以 `f(a)(b)(c)` 的形式进行调用。JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回**偏函数**。

```js
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.call(this, ...args);
    } else {
      return function(...args2) {
        return curried.call(this, ...args, ...args2);
      };
    }
  };
}
```

用例：

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
alert(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
alert(curriedSum(1)(2)(3)); // 6，全柯里化
```

## 12、函数反柯里化

反柯里化的思想与柯里化正好相反，如果说柯里化的过程是将函数拆分成功能更具体化的函数，那反柯里化的作用则在于扩大函数的适用性，使本来作为特定对象所拥有的功能函数可以被任意对象所使用。

```js
function unCarry(func) {
  return function(...args) {
    return func.call(...args);
  };
}
```

一行代码：

```js
const unCarry = func => (...args) => func.apply(args);
```

用例：

```js
const obj = {
  name: 'yang',
  age: 18,
};

function F() {}

// 拼接属性值的方法
F.prototype.concatProps = function() {
  let args = Array.from(arguments);
  return args.reduce((prev, next) => `${this[prev]}&${this[next]}`);
};

let concatProps = unCurry(F.prototype.concatProps);

console.log(concatProps(obj, 'name', 'age')); // yang&18
```

## 13、pipe

```js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```

用例：

```js
const getName = person => person.name;
const uppercase = string => string.toUpperCase();
const get6Characters = string => string.substring(0, 6);
const reverse = string =>
  string
    .split('')
    .reverse()
    .join('');

pipe(getName, uppercase, get6Characters, reverse)({ name: 'Buckethead' }); // 'TEKCUB'
```

## 14、compose

与 pipe 方向相反，使用 reduceRight

```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
```

## 15、sleep

```js
function sleep(wait) {
  return new Promise(resolve => setTimeout(resolve, wait));
}
```

用例：

```js
console.log('Hello');
sleep(2000).then(() => {
  console.log('World!');
});
```

## 16、delay

```js
function delay(fn, wait, ...args) {
  return new Promise(resolve => {
    setTimeout(() => {
      // resolve(fn(...args));

      // 相比 resolve(fn(...args)) 代码健壮性更高，如果 fn 函数报错，执行 delay 后能够得到错误信息
      Promise.resolve(fn(...args))
        .then(resolve)
        .catch(reject);
    }, wait);
  });
}
```

用例：

```js
async function test() {
  let data = await delay(str => Promise.resolve(str), 3000, 'hello, world');

  console.log(data);
}

test();
```

## 17、LazyMan

problem from: https://bigfrontend.dev/problem/create-lazyman

考察知识点：闭包，事件轮询机制，链式调用，队列

```js
// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  // your code here
  return new _LazyMan(name, logFn);
}

class _LazyMan {
  constructor(name, logFn) {
    this.logFn = logFn;
    this.tasks = [];

    const task = () => {
      this.logFn(`Hi, I'm ${name}.`);
      this.next();
    };

    this.tasks.push(task);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const task = this.tasks.shift();

    task && task();
  }

  eat(food) {
    const task = () => {
      this.logFn(`Eat ${food}.`);
      this.next();
    };

    this.tasks.push(task);

    return this;
  }

  sleep(time) {
    return this.sleepWapper(time);
  }

  sleepFirst(time) {
    return this.sleepWapper(time, true);
  }

  sleepWapper(time, isFirst = false) {
    const task = () => {
      const sleep = time => new Promise(resolve => setTimeout(resolve, time));

      sleep(time * 1000).then(() => {
        this.logFn(
          `Wake up after ${time} ${time === 1 ? 'second' : 'seconds'}.`,
        );
        this.next();
      });
    };

    if (isFirst) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }

    return this;
  }
}
```

用例：

```js
LazyMan('Jack', console.log)
  .eat('banana')
  .sleep(10)
  .eat('apple')
  .sleep(1);
// Hi, I'm Jack.
// Eat banana.
// Wake up after 10 seconds.
// Eat apple.
// Wake up after 1 seconds.
```

## 18、深拷贝

主要考察目标：

- 数据类型校验
- 循环引用

```js
function deepClone(data, hash = new WeakMap()) {
  if (data == undefined) return data;
  if (typeof data !== 'object') return data;
  if (data instanceof RegExp) return new RegExp(data);
  if (data instanceof Date) return new Date(data);

  var v = hash.get(data);
  if (v) return v;

  var instance = new data.constructor();
  hash.set(data, instance);
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      instance[key] = deepClone(data[key], hash);
    }
  }
  return instance;
}

var a = {
  name: 'bob',
  desc: {
    age: 12,
  },
};

var b = deepClone(a);
b.desc.age = 100;
console.log(b);
console.log(a);

// js循环引用
var t = {};
t.t = t;
console.log(deepClone(t));
```

Vuex 源码的深拷贝

```js
function find(list, fn) {
  return list.filter(fn)[0];
}

function deepCopy(obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const hit = find(cache, v => v.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};

  cache.push({
    original: obj,
    copy,
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache);
  });
  return copy;
}
```
