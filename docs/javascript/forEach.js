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
