const character = (name, level) => ({
    name,
    level,
    levelUp: function(){
        this.level++;
    }
})
const dwarf = character => ({
    ...character,
    race: 'dwarf',
    racial: 'Stone Form',
})
const nightElf = character => ({
    ...character,
    race: 'night elf',
    racial: 'Shadowmeld',
})
const druid = character => ({
    ...character,
    specialization: 'druid',
    abilities: ['Moonfire', 'Thorns', 'Bear Form'],
})
const warrior = character => ({
    ...character,
    specialization: 'warrior',
    abilities: ['Rend', 'Battle Shout', 'Charge'],
})
  
  
const createAvatar = (funcs, initialObj) => {
    return funcs.reduce((prev, curr) => curr(prev), initialObj)
}

let Amalaure = createAvatar([nightElf, druid], character('Amalaure', 60))
console.log(Amalaure);