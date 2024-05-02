// function name(params) {
//     return 1000
// }

// name()//invocation
// name()//invocation
// name()//invocation
// name()//invocation

function getIncrements(incrementedValue = 0) {
  return incrementedValue+1
}

function* ShowpopupaltionIncremnt(baseValue, reduceByDeaths) {
  var incrementedValue = getIncrements(incrementedValue) 

  console.log(baseValue + incrementedValue)

  yield {count : baseValue + incrementedValue} //when we call for first yield

  incrementedValue = getIncrements(incrementedValue) 

  yield {count : baseValue + incrementedValue} //when we call for first yield

  incrementedValue = getIncrements(incrementedValue) 
  yield {count : baseValue + incrementedValue} //when we call for first yield

  //return means end of invocation
  return baseValue + incrementedValue   
}

let populationPointer = ShowpopupaltionIncremnt(80000, 1000) //initializing with data

console.log(populationPointer.next()) //first yield
console.log(populationPointer.next()) //second yield
console.log(populationPointer.next()) //third yield

console.log(populationPointer.next()) //returns from execution

console.log(populationPointer.next()) //no further yeild is done



//arithmeticCalculator using - generator function - (a,b), 
//add, subtract, multiply, divide - all this we need to yield

//Arithmetic Calculator
function* arithmetic(num1, num2){
  
  yield console.log("Addition : " + (num1+num2));
  yield console.log("Subtraction : " + (num1-num2));
  yield console.log("Multiply : " + (num1*num2));
  yield console.log("Division : " + (num1/num2));
  
  return "Done";
}

let calObj = arithmetic(6,2);

calObj.next()
calObj.next()
calObj.next()
calObj.next()
console.log(calObj.next())
console.log(calObj.next())
