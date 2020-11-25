# 原型、原型链和继承

# **基本概念**

## **什么是原型？**

> 每个构造函数都有一个原型对象（prototype），每个实例都有自己的原型属性（**proto**）指向原型对象

## **什么式原型链？**

> 其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。简单回顾一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。那么，假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念

## **类式继承**

```js
function SuperClass() {
  this.superValue = true;
}
SuperClass.prototype.getSuperValue = function() {
  console.log(this.superValue);
};

function SubClass() {
  this.subValue = false;
}

SubClass.prototype = new SuperClass();
SubClass.prototype.getSubValue = function() {
  console.log(this.subValue);
};

var instance = new SubClass();
instance.getSuperValue(); // true
instance.getSubValue(); // false

console.log(instance instanceof SuperClass); // true
console.log(instance instanceof SubClass); // true

console.log(SubClass instanceof SuperClass); // false
console.log(SubClass.prototype.__proto__ === SuperClass.prototype); // true
console.log(SubClass.prototype instanceof SuperClass); // true
```

此处 `SubClass.prototype = new SuperClass()`, 所以`SubClass.prototype` 是构造函数 `SuperClass` 的实例, `SubClass.prototype.proto === SuperClass.prototype`所以说明构造函数 `SuperClass`的原型（`SuperClass.prototype`） 在 `SubClass.prototype` 的原型链(`SubClass.prototype.proto`)上

## **构造函数继承**

```js
function SuperClass(id) {
  this.books = ['Javascript', 'html', 'css'];
  this.id = id;
}
SuperClass.prototype.showBooks = function() {
  console.log(this.books);
};

function SubClass(id) {
  SuperClass.call(this, id);
}

var instance1 = new SubClass(10);
var instance2 = new SubClass(11);

instance1.books.push('设计模式');
console.log(instance1.books); // ["Javascript", "html", "css", "设计模式"]
console.log(instance2.books); // ["Javascript", "html", "css"]
console.log(instance1.id); // 10
console.log(instance2.id); // 11
instance1.showBooks(); // Uncaught TypeError: instance1.showBooks is not a function
```

**注意：** 子类 SubClass 中，调用 SuperClass.call(this, id)，是将子类的变量在父类构造函数中执行一遍，由于父类中是给 this 绑定值，因此子类自然继承父类的共有属性

**缺点：**通过构造函数这种继承方式，无法将父类原型上的方法继承，如果想继承父类原型上的方法只能把原型方法写在共有属性中，这样会导致每次 new 一个实例的时候都会实例化这个函数，没有放在原型上进行共享，违背了复用原则

## **组合继承**

```js
function SuperClass(name) {
  this.books = ['Javascript', 'html', 'css'];
  this.name = name;
}
SuperClass.prototype.getName = function() {
  console.log(this.name);
};

function SubClass(name, time) {
  SuperClass.call(this, name);
  this.time = time;
}
SubClass.prototype = new SuperClass();
SubClass.prototype.getTime = function() {
  console.log(this.time);
};

var instance1 = new SubClass('JS book', 2014);
var instance2 = new SubClass('css book', 2015);

instance1.books.push('设计模式');
console.log(instance1.books); // ["Javascript", "html", "css", "设计模式"]
instance1.getName(); // JS book
instance1.getTime(); // 2014

console.log(instance2.books); // ["Javascript", "html", "css"]
instance2.getName(); // css book
instance2.getTime(); // 2015
```

**缺点**：`SubClass.prototype = new SuperClass()`子类原型被赋值为超类构造函数的实例，虽然子类继承到了超类 `prototype`上的方法，但是在实例化超类时，再一次调用了超类构造函数导致在新对象上创建属性，因为子类构造函数中 `SuperClass.call(this, name)` 已经调用过一次，两次调用累赘！

## **原型继承**

> 道格拉斯·克罗克福在《javascript 中原型式继承》中提出：“ 借助原型 prototype 可以根据已有的对象创建一个新对象，同时不必创建新的自定义对象类型。 ”

```js
function inheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var book = {
  name: 'js book',
  alikeBook: ['css book', 'html book'],
};

var newBooks = inheritObject(book);
newBooks.name = 'Ajax book';
newBooks.alikeBook.push('xml book');

var otherBooks = inheritObject(book);
otherBooks.name = 'flash book';
otherBooks.alikeBook.push('as book');

console.log(newBooks.name); // Ajax book
console.log(newBooks.alikeBook); // ["css book", "html book", "xml book", "as book"]

console.log(otherBooks.name); // flash book
console.log(otherBooks.alikeBook); // ["css book", "html book", "xml book", "as book"]
```

结果看出： 跟类式继承一样，父类对象的**引用类型**的属性被公用，`newBooks`改变`alikeBook`时，`otherBooks`的`alikeBook`也被改变

## **寄生式继承**

```js
function inheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var book = {
  name: 'js book',
  alikeBook: ['css book', 'html book'],
};

function createBook(obj) {
  // 通过原型继承方式创建新对象
  var o = new inheritObject(obj);
  // 拓展新对象
  o.getName = function() {
    console.log(name);
  };
  // 返回拓展后的新对象
  return o;
}

var newBooks = createBook(book);
newBooks.name = 'Ajax book';
newBooks.alikeBook.push('xml book');

var otherBooks = createBook(book);
otherBooks.name = 'flash book';
otherBooks.alikeBook.push('as book');

console.log(newBooks.name); // Ajax book
console.log(newBooks.alikeBook); // ["css book", "html book", "xml book", "as book"]

console.log(otherBooks.name); // flash book
console.log(otherBooks.alikeBook); // ["css book", "html book", "xml book", "as book"]
```

查看结果： 效果同原型式继承，引用类型会受到影响

## **寄生组合继承**

```js
// 原型继承
function inheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subClass, superClass) {
  // 复制一份超类的原型副本保存在变量中
  var p = inheritObject(superClass.prototype);
  // 修正因为重写子类原型导致子类的 constructor 属性被修改
  p.constructor = subClass;
  // 设置子类的原型
  subClass.prototype = p;
}
```

```js
function SuperClass(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperClass.prototype.getName = function() {
  console.log(this.name);
};

function SubClass(name, time) {
  SuperClass.call(this, name);
  this.time = time;
}

inheritPrototype(SubClass, SuperClass);

SubClass.prototype.getTime = function() {
  console.log(this.time);
};

var instance1 = new SubClass('js book', 2014);
var instance2 = new SubClass('css book', 2013);
instance1.colors.push('black');

console.log(instance1.colors); // ["red", "blue", "green", "black"]
console.log(instance2.colors); // ["red", "blue", "green"]

instance1.getName(); // js book
instance1.getTime(); // 2014

instance2.getName(); // css book
instance2.getTime(); // 2013
```

这个示例中的 `inheritPrototype()`函数实现了寄生组合式继承的最简单形式。这个函数接收两个参数：子类型构造函数和超类型构造函数。在函数内部，第一步是创建超类型原型的一个副本。第二步是为创建的副本添加 `constructor`属性，从而弥补因重写原型而失去的默认的 `constructor`属性。最后一步，将新创建的对象（即副本）赋值给子类型的原型。

所谓寄生组合式继承，**即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法**。其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，**就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型**。

**寄生组合式继承应该是目前最稳定的继承模式**
