# JavaScript 面试题之各种打印

**From 明源云**

```js
function test(a, b) {
  b = a + 10;
  alert(b);

  return {
    test: function(a, b) {
      return test(a, b);
    },
  };
}

var a = test(100, 200); // 110
a.test(300); // 310
a.test(400); // 410

var b = test(101)
  .test(201)
  .test(401); // 111, 211, 411

var c = test(102).test(202, 302); // 112, 212
c.test(); // undefined + 10 = NaN
```

这题其实很简单，理解了函数执行栈就明白了，一个函数执行后返回的对象，这个对象 test 属性对应的函数有自己的 a, b 作用域内的属性值，不会从父级作用域去寻找。

再来一道理解一下函数调用栈

```js
function test(a, b) {
  b = a + 10;
  alert(b);

  return {
    test: function(a) {
      return test(a + b, b);
    },
  };
}

var a = test(100, 200); // 110
a.test(300); // 420
a.test(400); // 520
a.test(300).test(400); // 420, 830
```
