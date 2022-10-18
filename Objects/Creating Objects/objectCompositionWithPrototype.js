function character(name, level){
    this.name = name;
    this.level = level;
}
character.prototype.levelUp = function(){
    this.level++;
    return this;
}
character.prototype.attack = function(target){

}
function createAvatar(funcs, initialObj){
    return funcs.reduce((prev, curr) => curr(prev), initialObj)
}

//Character Race Mixin
const dwarf = character => {
    character['race'] = 'dwarf';
    character['racial'] = 'Stone Form';
    return character;
}
const nightElf = character => {
    character['race'] = 'night elf';
    character['racial'] = 'Shadowmeld';
    return character;
}

//Character Specialization Mixin
const druid = character => {
    character['specialization'] = 'druid';
    character['abilities'] = ['Moonfire', 'Thorns', 'Bear Form'];
    return character;
}
const warrior = character => {
    character['specialization'] = 'warrior';
    character['abilities'] = ['Rend', 'Battle Shout', 'Charge'];
    return character;
}
  


let Amalaure = createAvatar([nightElf, druid], new character('Amalaure', 60))
let Typhlosis = createAvatar([dwarf, warrior], new character('Typholsis', 29))
Typhlosis.levelUp();

console.log(Amalaure);
console.log(Typhlosis);