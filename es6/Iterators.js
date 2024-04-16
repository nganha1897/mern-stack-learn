//Aprat from for,of,in,froeach, while... ES6 introduced 4 new Iterators, which helps to read, modify and re-create the
//Array or Array of objects
//1.Filter, 2.Map, 3.Some and 4.Reduce
// When we do new changes it should not impact the core object, preserve the immutability

let personsList = [
  {id : 1, name : "John", savedby : "CaptainAmerica"},
  {id : 2, name : "Alice", savedby : "IronMan"},
  {id : 3, name : "Roger", savedby : "CaptainAmerica"},
  {id : 4, name : "Adam", savedby : "IronMan"},
  {id : 5, name : "Alex", savedby : "SpiderMan"},
  {id : 6, name : "Robin", savedby : "Batman"}
];

//1. Print the persons saved by captain america

let savedByCA = personsList.filter(person => person.savedby=="CaptainAmerica" ? person : "")

//console.log(savedByCA)

//2. List the Names saved by Iron Man and add Super Hero before the name 

//let savedByIronMan = personsList.map(person => person.savedby=="IronMan" ? person.name : "").filter(names=> names != "")

let savedByIronMan = personsList.map(person => {
                                      if(person.savedby=="IronMan") 
                                              return {"New Birth " : "Super Hero " + person.name}
                                          }).filter(names=> names != undefined)

//console.log(savedByIronMan)

//console.log(personsList) //preservation of immutability, not changes the value in main list

//3. Check if some one is saved by BlackPanther  
//some works as short cicuit, as soon as meets the condition will return the true or false

let savedByBlkPanther = personsList.some(person => person.savedby=="BlackPanther") 

//console.log(savedByBlkPanther)

let savedByBatMan = personsList.some(person => person.savedby=="Batman") 

//console.log(savedByBatMan)

//set => a data structure used to created arrays of unique values

//4. Give me the number of persons saved by each super hero uniquely

let personsSavedUniquely = personsList.reduce((prevVal, currVal, index, array)=>{
              console.log(prevVal)
              console.log(currVal)
              console.log(index)
              //console.log(array)
              prevVal[currVal.savedby] = prevVal[currVal.savedby] ? prevVal[currVal.savedby] + 1 : 1
              return prevVal 
      }, []) //new Set()

console.log(personsSavedUniquely)

//Question :
///////////////////////////

let persons = [
  {id : 1, name : "John", tags : "javascript"},
  {id : 2, name : "Alice", tags : "dontnet"},
  {id : 3, name : "Roger", tags : "java"},
  {id : 4, name : "Adam", tags : "javascript"},
  {id : 5, name : "Alex", tags : "java"}
];

//1. List the person with javascript tag
//2. List the same on person using java and put programmer after their name, change the name key to Developer
//3. If we have anyone with tag python
//4. Find the number of unique tags and their count present in list