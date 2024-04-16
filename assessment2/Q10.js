//10. Give me an example of call and apply each with it's usage

var Person1 = {name: "A", age: 20}
var Person2 = {name: "B", age: 20}

function getHobbies(h1, h2, h3) {
  console.log(`Person named ${this.name} has hobbies: ${h1}, ${h2}, ${h3}`)
}

var hobbies = ["Cooking", "Singing", "Coding"]
getHobbies.apply(Person1, hobbies)
getHobbies.call(Person2, "Weightlifting", "Playing the piano", "Going out")