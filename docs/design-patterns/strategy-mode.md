# 策略模式

> **定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。**
>
> ​ ----《JavaScript 设计模式与开发实践》

很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为 S 的人年 终奖有 4 倍工资，绩效为 A 的人年终奖有 3 倍工资，而绩效为 B 的人年终奖是 2 倍工资。假设财 务部要求我们提供一段代码，来方便他们计算员工的年终奖。

传统程序员的代码：

```js
let calculateBonus = function(performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 4;
  }
  if (performanceLevel === 'A') {
    return salary * 3;
  }
  if (performanceLevel === 'B') {
    return salary * 2;
  }
};

console.log(calculateBonus('S', 10000)); // 40000
console.log(calculateBonus('A', 8000)); // 24000
console.log(calculateBonus('B', 6000)); // 12000
```

如上所述的代码风格就很零散，若是再加一个等级 C，就需要再加一层 if else，这是深入函数内部进行操作，违背**开放-封闭原则**

基于强类型语言的设计模式进，可以为这个类算法封装为一个 "策略类" ;再封装一个类使用上述策略类

```js
// 算法策略类
let PerformanceS = function() {};
PerformanceS.prototype.calculate = function(salary) {
  return salary * 4;
};

let PerformanceA = function() {};
PerformanceA.prototype.calculate = function(salary) {
  return salary * 3;
};

let PerformanceB = function() {};
PerformanceB.prototype.calculate = function(salary) {
  return salary * 2;
};

// 环境类接受客户请求，随后把请求委托给策略类执行
let Bonus = function(strategy, salary) {
  this.salary = salary;
  this.strategy = strategy;
};
Bonus.prototype.setSalary = function(salary) {
  this.salary = salary;
};
Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
};
Bonus.prototype.getBonus = function() {
  return this.strategy.calculate(this.salary);
};

let bonus1 = new Bonus(new PerformanceS(), 10000);
let bonus2 = new Bonus(new PerformanceA(), 8000);
let bonus3 = new Bonus(new PerformanceB(), 6000);
console.log(bonus1.getBonus()); // 40000
console.log(bonus2.getBonus()); // 24000
console.log(bonus3.getBonus()); // 12000
```

> **一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体 的算法，并负责具体的计算过程。第二个部分是环境类 Context，Context 接受客户的请求，随后 把请求委托给某一个策略类。要做到这点，说明 Context 中要维持对某个策略对象的引用。**

---

再来一个表单验证的实例。

```js
<form action="http:// xxx.com/register" id="registerForm" method="post">
  请输入用户名：
  <input type="text" name="userName" />
  请输入密码：
  <input type="text" name="password" />
  请输入手机号码：
  <input type="text" name="phoneNumber" />
  <button>提交</button>
</form>
```

传统表单验证代码：

```js
let registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function() {
  if (registerForm.userName.value === '') {
    alert('用户名不能为空');
    return false;
  }
  if (registerForm.password.length < 6) {
    alert('密码长度不能少于 6 位');
    return false;
  }
  if (!/(^1[35789]\d{9}$)/.test(registerForm.phoneNumber.value)) {
    alert('手机号码格式不正确');
    return false;
  }
};
```

缺点同上：

- registerForm 函数庞大，大量的 if else
- 若是要增加一个验证，必然要在函数 registerForm 复制粘贴一部分代码；
- 算法复用性差： 如果在程序中增加了另外一个表单，这个表单也需要进行一些类似的校验，那我们很可能将这些校验逻辑复制得漫天遍野

**使用策略模式重构**

```js
// 创建策略类
let strategies = {
  isNonEmpty: function(val, errMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function(value, errorMsg) {
    if (!/(^1[35789]\d{9}$)/.test(value)) {
      return errorMsg;
    }
  },
};
```

创建验证类

```js
function Validator() {
  this.cache = [];
}
Validator.prototype.add = function(dom, rule, errorMsg) {
  let array = rule.split(':');
  this.cache.push(function() {
    var strategy = array.shift();
    ary.unshift(dom.value);
    ary.push(errorMsg);
    return strategies[strategy].apply(dom, ary);
  });
};
Validator.prototype.start = function() {
  for (var i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
    var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
    if (msg) {
      // 如果有确切的返回值，说明校验没有通过
      return msg;
    }
  }
};
```

点击事件验证表单

```js
let registerForm = document.getElementById('registerForm');
let validataFunc = function() {
  let validator = new Validator();
  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
  validator.add(registerForm.password, 'minLength:6', '密码长度不能少于 6 位');
  validator.add(registerForm.phoneNumber, 'isNonEmpty', '手机号码格式不正确');

  let errorMsg = validator.start();
  return errorMsg;
};
registerForm.onsubmit = function() {
  let errorMsg = validataFunc();
  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
};
```

## **策略模式的优缺点**

策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。

1. 策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它 们易于切换，易于理解，易于扩展。
2. 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作
3. 在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的一种更轻便的替代方案。

当然，策略模式也有一些缺点，但这些缺点并不严重。

首先，使用策略模式会在程序中增加许多策略类或者策略对象，但实际上这比把它们负责的 逻辑堆砌在 Context 中要好。

其次，要使用策略模式，必须了解所有的 strategy，必须了解各个 strategy 之间的不同点， 这样才能选择一个合适的 strategy。比如，我们要选择一种合适的旅游出行路线，必须先了解选 择飞机、火车、自行车等方案的细节。此时 strategy 要向客户暴露它的所有实现，这是违反最少 知识原则的。

最后，看一个 javascript 中策略模式的示例，封装策略函数，使用高阶函数将策略函数传入 Context

```js
var S = function(salary) {
  return salary * 4;
};
var A = function(salary) {
  return salary * 3;
};
var B = function(salary) {
  return salary * 2;
};
var calculateBonus = function(func, salary) {
  return func(salary);
};
calculateBonus(S, 10000); // 输出：40000
```
