const SubPub = (()=>{
    const _events = {};
    function publish(eventName, passedVal){
        const eventsList = _events[eventName]
        eventsList.forEach(subscription => {
            subscription.func(passedVal)
        });
    }
    function subscribe(eventName, func, priority, excludeSelf = true){
        const subscription = {func, priority, excludeSelf}
        if(_events[eventName] instanceof Array){
            _events[eventName].push(subscription)
            _events[eventName].sort((a,b)=>a.priority-b.priority)
        } else {
            _events[eventName] = [subscription]
        }
    }
    function wrapper(object){
        object.subscribe = subscribe;
        object.publish = publish;
    }
    function subscriberWrapper(object){
        object.subscribe = subscribe;
    }
    function publishWrapper(object){
        object.publish = publish;
    }
    return {subscribe, publish, wrapper, subscriberWrapper, publishWrapper}
})()

const Logger = (()=>{
    let _count = 0;
    const log = function(message){
        let lineBreak = '-'.repeat(15);
        console.log(lineBreak);
        console.log(`Log #${_count}: ${message}`)
        console.log(lineBreak);
        _count++;
    }
    return {log}
})()

SubPub.subscriberWrapper(Logger);
Logger.subscribe('moodEvent', () => Logger.log('moodEvent Triggered'), -1, true);

function Relationship(person, strength){
    this.person = person;
    this.strength = strength;
}
function Person(name, age, mood, releationships){
    this.name = name;
    this.age = age;
    this.mood = mood,
    this.relationships = releationships
}
    Person.prototype = {
        reactToMoodEvent({person, typeOfEvent}){
            let relationship = null;
            for(let i = 0; i < this.relationships.length; i++){
                if(this.relationships[i].person === person){
                    relationship = this.relationships[i]
                    break;
                }
            }
            if(relationship){
                switch(typeOfEvent){
                    case 'success':
                        this.adjustMood(relationship.strength)
                        break;
                    case 'failure':
                        this.adjustMood(-relationship.strength)
                        break;
                    default:
                        console.log(`Failure to Find Corresponding Relationship typeOfEvent`)
                }
            }
            return;
        },
        adjustMood(value){
            const startingMood = this.mood;
            this.mood += value;
            this.mood = this.mood > 10 ? 10 : this.mood;
            this.mood = this.mood < -10 ? -10 : this.mood;
            this.speak(`Starting Mood: ${startingMood} -> Ending Mood: ${this.mood}`)
        },
        success(successEventName){
            this.speak(`I was successful at ${successEventName}`)
            return {person: this, typeOfEvent: 'success'}
        },
        failure(failureEventName){
            this.speak(`I failed at ${failureEventName}`)
            return {person: this, typeOfEvent: 'failure'}
        },
        speak(message){
            console.log(`${this.name}: ${message}`)
        },
        subscribe: SubPub.subscribe,
        publish: SubPub.publish
    }



const Justin = new Person('Justin', 33, 0, []);
const Natasha = new Person('Natasha', 28, 0, []);
const Vladimir = new Person('Vladimir Putin', 60, 0, []);
let people = [Justin, Natasha, Vladimir];
    Justin.relationships.push(new Relationship(Natasha, 5), new Relationship(Vladimir, -5));
    Natasha.relationships.push(new Relationship(Justin, 6), new Relationship(Vladimir, -3));
    Vladimir.relationships.push(new Relationship(Natasha, -1));

people.forEach(person => {
    person.subscribe('moodEvent', person.reactToMoodEvent.bind(person), 1, true);
})


console.log('\n')
Justin.publish('moodEvent', Justin.success('paying my taxes on time'));
console.log('\n')
Justin.publish('moodEvent', Justin.failure('slaying the dragon at Headstone Rock'));
console.log('\n')
Natasha.publish('moodEvent', Natasha.success('making a fun new meal'))
console.log('\n')
Natasha.publish('moodEvent', Natasha.success('getting a new job'))
console.log('\n')
Natasha.publish('moodEvent', Natasha.success('getting married'))
console.log('\n')
Vladimir.publish('moodEvent', Vladimir.success('learning a new Language'))