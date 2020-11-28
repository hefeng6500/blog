---
nav:
  title: 力扣
---

# 🔥LeetCode 热题 HOT 100

## 1、两数之和

```jsx | inline
import React from 'react';
export default () => <div>难度： <div  className="label round label-success">简单</div></div>;
```

给定一个整数数组 nums  和一个目标值 target，请你在该数组中找出和为目标值的那   两个   整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

### 暴力解法

双层循环：

- **时间复杂度 O(n^2)**

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

var nums = [2, 7, 11, 15];
var target = 9;
var result = twoSum(nums, target);
console.log(result); // [0, 1]
```

### 哈希表

- 在遍历的同时，记录一些信息，以省去一层循环，这是“以空间换时间”的想法
- 需要记录已经遍历过的数值和它对应的下标，可以借助哈希表实现
- **时间复杂度 O(n)**

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

function twoSum(nums, target) {
  let map = new Map();
  map.set(nums[0], 0);
  for (let i = 1; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
}

var nums = [2, 7, 11, 15];
var target = 9;
var result = twoSum(nums, target);
console.log(result);
```

哈希表的奇技淫巧写法，不过都没有绕过 **哈希表** 

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let obj = {};
  let cache = [];
  for (let i = 0; i < nums.length; i++) {
    let a = nums[i];
    let diff = target - nums[i];
    if (obj[a] !== undefined) {
      return (cache = [obj[a], i]);
    } else {
      obj[diff] = i;
    }
  }
};

var twoSum = function(nums, target) {
  const map = {};
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const targetNum = target - nums[i];
    if (targetNum in map) return [map[targetNum], i];
    map[nums[i]] = i;
  }
};
```

## 7. 整数反转

```jsx | inline
import React from 'react';
export default () => <div>难度： <div  className="label round label-success">简单</div></div>;
```


给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:
```
输入: 123
输出: 321
```

 示例 2:
```
输入: -123
输出: -321
```

示例 3:
```
输入: 120
输出: 21
```

注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

### 反转字符串

```js
var reverse = function(x) {
  let num = Math.abs(x);
  let str = num + "";
  str = str.split("").reverse().join("");
  let result = parseInt(str);

  if (x > 0) {
    result = result > Math.pow(2, 31) - 1 ? 0 : result;
  } else {
    result = result < -Math.pow(2, 31) ? 0 : result;
  }
  return result;
}

console.log(reverse(-123));
```

### 数学法

```js
var reverse = function(x) {
  let result = 0;
  while(x !== 0) {
      result = result * 10 + x % 10;
      x = (x / 10) | 0;
  }
  return (result | 0) === result ? result : 0;
};

console.log(reverse(123)); // 321

```

这中写法很高级，相比我业务型的思路，这种写法确实高大上了！使用了模运算、位运算

> 
[位运算](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#%E4%BD%8D%E8%BF%90%E7%AE%97%E7%AC%A6)： 按位或 OR	a | b	在a,b的位表示中，每一个对应的位，只要有一个为1则返回1， 否则返回0.  ———— MDN
>
