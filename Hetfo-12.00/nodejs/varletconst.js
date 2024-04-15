// var: function scope
// console.log(i);
// if(true) {
//     for(var i=0; i<5; i++) {
//         console.log(i);
//     }
// }
// console.log(i);

// let: block scope
// for(let i=0; i<5; i++) {
//     for(let i=0; i<5; i++) {
//         console.log(i);
//     }
// }

let a = "alma";
a = "körte";
console.log(a);

// const b = "alma";
// b = "körte"; //hiba
// console.log(b);


const c = ["alma"];
c[0] = "körte";
console.log(c);

let d = ["korte"]
c = d;