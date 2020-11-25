# 原型模式

```js
let prototype = {
  getName() {
    return this.first + '  ' + this.last;
  },
  say() {
    alert('hello');
  },
};

let obj1 = Object.create(prototype);
obj1.first = 'a';
obj1.last = 'b';
alert(obj1.getName()); // a  b

let obj2 = Object.create(prototype);
obj2.first = 'c';
obj2.last = 'd';
alert(obj2.getName()); // c  d
```

```js
Object.create = function(obj) {
  var B = {};
  Object.setPrototypeOf(B, obj);
  return B;
};
```

[深入理解 Object.create](https://juejin.im/post/5a9ce60b6fb9a028cc60b69c)
