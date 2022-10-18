function Character(name, level){
    this.name = name;
    this.level = level;
    this.stats = null; //Set By Calling init after assignment of specialization
}
Character.prototype.startingStats = {
    strength: 10,
    agility: 10,
    stamina: 10,
    intellect: 10,
    spirit: 10
}
Character.prototype.racialStatAdjustment = function(){
    let adjustedStats = {
        strength: 0,
        agility: 0,
        stamina: 0,
        intellect: 0,
        spirit: 0
    }
    switch(this.race){
        case 'night elf': {
            adjustedStats.agility += 3;
            adjustedStats.intellect += 2;
            adjustedStats.spirit += 1;
            break;
        }
        case 'dwarf': {
            adjustedStats.strength += 3;
            adjustedStats.stamina += 2;
            adjustedStats.spirit += 2;
            adjustedStats.intellect -=1;
            break;
        }
    }
    return {
        strength: 10 + adjustedStats.strength,
        agility: 10 + adjustedStats.agility,
        stamina: 10 + adjustedStats.stamina,
        intellect: 10 + adjustedStats.intellect,
        spirit: 10 + adjustedStats.spirit
    }
}
Character.prototype.init = function(){
    this.stats = this.racialStatAdjustment();
    return this;
}
Character.prototype.levelUp = function(){
    this.level++;
    return this;
}
function createAvatar(funcs, initialObj){
    return Object.assign(initialObj, funcs.reduce((prev, curr) => curr(prev), initialObj));
}

//Character Race Mixin
const dwarf = Character => ({
    ...Character,
    race: 'dwarf',
    racial: 'Stone Form',
})
const nightElf = Character => ({
    ...Character,
    race: 'night elf',
    racial: 'Shadowmeld',
})

//Character Specialization Mixin
const druid = Character => ({
    ...Character,
    specialization: 'druid',
    abilities: ['Moonfire', 'Thorns', 'Bear Form'],
})
const warrior = Character => ({
    ...Character,
    specialization: 'warrior',
    abilities: ['Rend', 'Battle Shout', 'Charge'],
})
  

let Amalaure = createAvatar([nightElf, druid], new Character('Amalaure', 42)).init();
let Typhis = createAvatar([dwarf, warrior], new Character('Typhis', 25)).init();
console.log(Amalaure);
console.log(Typhis.levelUp());