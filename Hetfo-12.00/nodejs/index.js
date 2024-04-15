// const user = require('./user.js');
// console.log('The name is '.concat(user.getName()));
// console.log('The location is %s',user.getLocation());
// console.log(`The user was born on ${user.dob}`);

const { getName, getLocation } = require('./user.js');
console.log('The name is '.concat(getName()));
console.log('The location is %s',getLocation());
