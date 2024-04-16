// Behaves as the snapshot or lookahead of the javascript code present, and gives behaviour of partial compilation
// It happens when we try to use a function or varible before its declaration
// 1. Variable Hoisting - Variable gets an undefined value
// 2. Functional Hoisting - Functions get hoisted with its definition


//console.log(myVar) //undefined

//console.log(myVar()) //error: function expressions do not hoist with definition

console.log(PrintName2) //function definition
console.log(PrintName2("Whats in the name")) //can be executed


var myVar = "Assigne me a name"

myVar = function PrintName(name) {
    console.log(name)   
}

function PrintName2(name) {
    console.log(name)   
}

//create a sample of your own implementation for hoisting