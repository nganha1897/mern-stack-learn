//map - is a data structure which is used to create objects and array with different types of keys 
//Special kind of Collection created in ES6 to set iterables even with non primitive keys unlike other collections
//Allows us to use a lot of methods to get, set, delete and do other operations without much pain

[{key : "value"}]
let myMap = new Map();

let keyString = 'a string', keyObj = {}, keyFunc = function() {}, keyNum = 2000;

myMap.set(keyString, "String is key for this!!")
myMap.set(keyObj, "Object is key for this!!")
myMap.set(keyFunc, "Function is key for this!!")
myMap.set(keyNum, "Number is key for this!!")

//console.log(myMap.entries())

// console.log(myMap.get(keyString)) //String is key for this!!
// console.log(myMap.get(keyFunc)) //Function is key for this!!
// console.log(myMap.get({}))
// console.log(myMap.get(keyObj))

// myMap.delete('a string')
// myMap.delete(2000)
// //myMap.delete({})

// console.log(myMap.entries())

//when we need a iterable/collection with unique values
//Set : this maintains a set of unique collection with additional properties and methods like map

let StudentSet = new Set(["David N","Wanda", "Otoi", "Mayuri", "Joe", "Yiluo"])

console.log(StudentSet.entries())

console.log(StudentSet.add("Sierra"))
console.log(StudentSet.add("Suyash"))

//console.log(StudentSet.add("Suyash"))

console.log(StudentSet.add("Wanda"))

// console.log(StudentSet.entries())

console.log(StudentSet.has("David N"))
console.log(StudentSet.has("David"))
console.log(StudentSet.has("Eric"))