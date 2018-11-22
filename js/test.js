// var add2Num = function(num1, num2) {
//     var n1 = num1;
//     var n2 = num2;

//     var sum = 0;
//     if ((n2 - n1 + 1) % 2 == 0) {
//         var mid = (n2 - n1 + 1) / 2;
//         sum = mid * (num1 + num2);
//     } else {
//         var mid = parseInt((n2 - n1 + 1) / 2);
//         sum = mid * (num1 + num2) + (mid + num1);
//     }

//     return sum;
// }

// console.log(add2Num(1, 11));

// var sum = 0;
// for (var i = 1; i <= 11; i++) {
//     sum += i;
// }
// console.log(sum);

// var a = true;
// var test = function() {
//     if (false) {
//         var a = 10;
//     }
//     console.log(a);
// };

// test();

// var a = 10;
// this.a = 10;
// (function() {
//     console.log(this.a);
// })();

// var number = 2;
// var obj = {
//     number: 4,
//     fn1: (function () {
//         this.number *= 2;
//         number = number * 2;
//         var number = 3;
//         return function () {
//             this.number *= 2;
//             number *= 3;
//             alert(number);
//         }
//     })(),
//     fn2: function () {
//         this.number *= 2;
//     }
// };
// var fn1 = obj.fn1;
// console.log(number);
// alert(number);
// fn1();
// obj.fn1();
// obj.fn2();
// alert(window.number);
// alert(obj.number);

// var arr = [1, 2, 3];
// var ret = arr.every(function(value, index, arr) {
//     console.log(value);
//     if (index == 1) {
//         return false;
//     }
//     return true;
// });

// console.log(arr);

// var N1 = function() {
//     this.n = 1;
// };
// var N2 = function () {
//     this.n = 2;
// };
// N1.call(N2);
// N2.call(N1);
// var n1 = new N1();
// var n2 = new N2();

var obj = {
    num: 1
};

Function.prototype.bind = function(target) {
    var sef = this;
    console.log(1);
    return function() {
        console.log(2);
        sef.call(target);
    }
};

var test = function() {
    console.log(this.num);
};

test.bind(obj);

// var test = function () {
//     console.log("1");
// };
// Function.prototype.sayHello = function() {
//     console.log("hello world");
// };
// test.sayHello();

"use strict";
var obj = {
    a: 10,
    a: 20
};

console.log(obj.a);

"use strict";
var a = 10;
var test = function() {
    a = 20;
};
test();


var obj = {a: 1, b: 2};
Object.defineProperty(obj, "b", {
    writable: false,
    configurable: false
});
Object.defineProperty(obj, "b", {
    configurable: true
});
console.log(obj);

// for (var i in obj) {
//     console.log(obj[i]);
// }
for (var i = 0; i < obj.length; i++) {
    console.log(obj[i]);
}

// Object.defineProperty(obj, "b", {
//     get: function() { ...},
//     set: function() { ...}
// });

