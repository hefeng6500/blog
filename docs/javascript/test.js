Function.prototype.myCall = function(context, ...rest) {
  const fn = Symbol();

  context[fn] = this;

  const result = context[fn](...rest);

  delete context[fn];

  return result;
};

function test() {
  console.log(this.a);
}

const obj = {
  a: 100,
};

test.myCall(obj);
