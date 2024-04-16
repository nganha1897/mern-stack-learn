// Data types: 6 data types in Javascript
// Primitive types:
// 1.String, 2.Number, 3.Boolean, 4.Undefined, 5.Null

// Non-primitive types (pointers to object - reference):
// 6.Object

// var: keyword used in core-js to declare variables, function

//undefined is the default value for any variable
// not defined error when variable is neither declared before or after

//console.log(name1) // not defined error

console.log(name) // undefined - hoisting

var name = "ha"   //declare and assign value to the variable

var name = "beo"  // redeclare and reassign value to variable
name = "ha beo"  // also possible

var name = 2024.24  // dynamic typing depending on the value assigned, type number

name = null // data value => data type becomes object
// undefined: usually error when unassigned value, null: when you intentionally want to clear value

name = {
  FirstName: "ha",
  Address: "abc st"
}

console.log(name)
console.log("Data type", typeof name)

var emptyObj1 = {}
var emptyObj2 = {}

name = emptyObj1 == emptyObj2 // => false because reference to object is different

var emptyObj1 = null
var emptyObj2 = null

name = emptyObj1 == emptyObj2 // => true because compare VALUE null

console.log(name)
console.log("Data type", typeof name)

//ES-6: Symbol (ES6: class based implementation of JS)
// Symbol is used to create customized variable of our choice

var symbol1 = Symbol("New value of my choice")

console.log(symbol1)
console.log("Data type", typeof symbol1)

