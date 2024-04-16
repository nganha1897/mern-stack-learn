//for ->  array[1].key
//foreach -> (this)
//1. loops through length
//2. to access the value we pass key as index for current object array[1].key , (this)

// for in loop - iterates over the property value, basically meant for json objects with - key values

//for in loop  
let person = {fname:"John", lname:"Doe", age:25, address : {}}; 


for (const key in person) {
    //if (Object.hasOwnProperty.call(person, key)) { //this is a check to confirm that key is present else set  the context to current key
        const element = person[key];
        //console.log(`${key}  ${element}`)
    //}
}

console.log("Other Example") 

let arr = [3,5,7]; //{0:3, 1:5, 2:7, newKey : "Sierra"}
//arr[3] = "Mayuri"

arr.newKey = "Sierra"

// console.log(arr)

// for (const key in arr) {
//         console.log(key)
//         const element = arr[key]; 
//         console.log(element)
// }



//for of loop : Mainely for arrays, iterates over the property names, more recommended for array of numbers or string instead of objects

console.log("For Of Loop") 
let cars = ['BMW', 'Volvo', 'Mini']; 
cars[5] = "Toyota"


//cars.newCar = "Tesla" //Array with key not based on index for of loop will not support for that value

console.log(cars);

for (const car of cars) {
    console.log(" "+ car)
}