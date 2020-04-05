var obj1 = {a:1};
var obj2 = {b:2};
var obj3 = {c:3};
var newObj = Object.assign(obj1, obj2, obj3);
console.log(newObj); // {a: 1, b: 2, c: 3}
console.log(obj1); // {a: 1, b: 2, c: 3}
console.log(obj2); // {a: 1, b: 2, c: 3}
console.log(obj3); // {a: 1, b: 2, c: 3}