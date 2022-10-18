function Thing(name){
    this.name = name;
    this.isAlive = true;
}
Thing.prototype = {
    sayName(){
        return `${this.name}: "My Name is ${this.name}"`
    },
    die(){
        this.isAlive = false;
        return `${this.name}: "I have passed away"`
    },
    rebirth(){
        this.isAlive = true;
        return `${this.name}: "I have been born again"`
    }
    
}

function Animal(name, classification){
    this.name = name;
    this.isAlive = true;
    this.classification = classification;
    this.isFull = false;
    this.isSleeping = false;
}

const classifications = [
    /* 0 */ `Invertebrates`, 
    /* 1 */ `Fish`, 
    /* 2 */ `Amphibians`, 
    /* 3 */ `Reptiles`, 
    /* 4 */ `Birds`, 
    /* 5 */ `Mammals`];

Animal.prototype = {
    __proto__: Thing.prototype,
    eat(){
        this.isFull = true;
        return `${this.name}: eats`;
    },
    hungers(){
        this.isFull = false;
        return `${this.name}: hungers`;
    },
    sleep(){
        this.isSleeping = true;
    },
    wakeUp(){
        this.isSleeping = false;
    }
}

function Dog(name, classification, breed){
    this.name = name;
    this.isAlive = true;
    this.classification = classification;
    this.breed = breed;
    this.isFull = false;
    this.isSleeping = false;
}
Dog.prototype = {
    __proto__: Animal.prototype,
    sniff(){
        return `${this.name}: "sniff sniff"`;
    },
    bark(){
        return `${this.name}: "bark bark"`;
    }
}
let Dogs = [
    new Dog(`Abby`, classifications[5], `Jack Russell Terrier`), 
    new Dog(`Trixie`, classifications[5], `Mutt`),
    new Dog(`Coconut`, classifications[5], `Bishon`)
];

for(let key in Dogs[0]){
    console.log(`Key: ${key}, Value: ${Dogs[0][key]}`);
}