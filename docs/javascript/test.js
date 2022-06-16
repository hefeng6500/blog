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

Function.prototype.bind = function(context, ...args) {
  const self = this;
  const fBound = function(...newArgs) {
    self.apply(this instanceof fBound ? this : context, args.concat(newArgs));
  };

  fBound.prototype = Object.create(this.prototype);

  return fBound;
};

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
