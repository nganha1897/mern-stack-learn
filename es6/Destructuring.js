//Destructuring - is a way to read values from Array or object without initializing literals

//1. Array Destructuring

//a. reading values without mulitple variables and indexing

// let [one, two, three, four, no_val = 0] = [11,22,33,44]

// console.log(one)
// console.log(two)
// console.log(three)
// console.log(four)
// console.log(no_val)

//b. we can have rest for array

let [one, two, ...rest_Array] = [11,22,33,44, 55, 66, 77]

console.log(one)
console.log(two)
console.log(rest_Array)

//c. swapping of variable values

let x = 9, y = 10;

[x,y] = [y,x] //swapping
console.log(x)
console.log(y)

//2. Object Destructuring

//a. Single level destructuring
let User = {
    Standard : "Higher Secondary",
    Session : "Final Session",
    TotalMarks : "75%"
}

//let Session = User.Session;

// let { Name = "David N", Session, TotalMarks} = User

// console.log(Name)
// console.log(Session)
// console.log(TotalMarks)

//b. Nested destructuring
let Student = {
    Standard : "Higher Secondary",
    Session : "Final Session",
    TotalMarks : "75%",
    Subject : {
        Physics : 80,
        Chemistry : 89,
        Language : 92
    }
}

//let { Name = "Joe S", Session, Standard, Subject} = Student

let { Name = "Joe S", Session, Standard, Subject : {Physics, Mathematics = 100, Language}} = Student

console.log(Name)
console.log(Session)
console.log(Standard)
//console.log(Subject)
console.log(Mathematics)
console.log(Physics)
console.log(Language)


//Questions for practice
//print firstname and sessionTopics, 
//along with that also create a lastname and covered3 as "ES6", without making any change in StudentTest

//create a funtion with name multiply which accepts three parameters, and return multiplication of all
//but if we dont pass any parameter it returns 0

//create an array of 1 - 5 and add arr[newval] = at 6th place, print the output using for of and for in loop

//create an example of const where we can update on property of the object, where it says const is mutable

//create a for loop using var and let, print each value in timeout after 2 second and to 
//demonstrate functional scope of var and lexical of let 
