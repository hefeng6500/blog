let a = 0,
  b = 0;
function fn(a) {
  debugger;
  fn = function fn2(b) {
    alert(++a + b);
  };
  alert(a++);
}
fn(1);
fn(2);
