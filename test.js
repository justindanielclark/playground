const jumpingWrapper = (()=>{
    function jump(){
        console.log(`${this.name} has jumped`)
    }
    function addJumping(object){
        object.jump = jump;
    }
    return {addJumping}
})()
function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype = {
    speak(){
        console.log(`Hi, my name is ${this.name}`)
    }
}

let Diego = new Person('Diego', 30);
console.log(Diego instanceof Person);
jumpingWrapper.addJumping(Diego)
Diego.jump();
console.log(Diego instanceof Person);
