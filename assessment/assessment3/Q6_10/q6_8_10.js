//6. Give me an example of map and set collection each with at least four properties implemented - like get, set, clear, etc

let animalMap = new Map()
animalMap.set(1, "dog")
animalMap.set(2, "cat")
animalMap.set(3, "Elephant")
console.log("All map entries: ", animalMap.entries())
console.log("Value at key = 1: ", animalMap.get(1))
animalMap.delete(1)
console.log("After deleting entry with key = 1: ", animalMap.entries())
animalMap.clear()
console.log("After clearing the map: ", animalMap.entries())

let cakeSet = new Set(["cupcake", "flan", "cheesecake"])
console.log("Get all values in set: ", cakeSet.keys()) 
console.log("Add panna cotta: ", cakeSet.add("panna cotta"))
console.log("Does 'pannacotta' with no space exist: ", cakeSet.has("pannacotta"))  //should be false
console.log("Get all values in set: ", cakeSet.keys()) 
cakeSet.clear() 
console.log("After clearing the set: ", cakeSet.keys())

//8. Use the spread and rest operator to create a function which can multiple numbers from 1...n (n is the number of choice)
function Multiply(...n) {
  let product = 1
  product = n.reduce((prevVal, curVal) => prevVal * curVal, 1)
  return product
}
let numList = [1,2,3,4]
console.log("Using spread and rest to multiply 1, 2, 3, 4: ", Multiply(...numList))

//10. Create an example of generator function of your choice

function* getPie(initial, increment) {
  yield console.log("Initial number of pies: ", initial)
  yield console.log("Add 1 pie: ", initial + increment)
  increment++
  yield console.log("Add another pie: ", initial + increment)

  return "That's enough pies for today!"
}

let pie = getPie(1, 1)
pie.next()
pie.next()
pie.next()
console.log(pie.next())