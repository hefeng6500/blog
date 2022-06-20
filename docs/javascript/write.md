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

## 10、节流

## 11、函数柯里化

## 12、函数反柯里化

## 13、compose

## 14、sleep

## 15、delay

## 16、LazyMan
