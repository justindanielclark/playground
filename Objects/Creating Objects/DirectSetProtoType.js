//not recommended

//Object.create(prototypeObject), creates objects of type userInfo
let userInfo = {
    name: `Mayank`,
    age: 30,
    salary: 10000,
    designation: `Developer`
}

let newObject = Object.create(userInfo);

console.log(newObject.__proto__);
console.log(userInfo.name === newObject.name)
console.log(userInfo.name === newObject.__proto__.name)