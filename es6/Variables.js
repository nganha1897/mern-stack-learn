//In core js -> var to declare, which is functional scoped
//let and const -> in ES6 which are lexical scope and behave more like class based literals

//1. Scope <Functional and Lexical or block {}>

{
  var my_var = 2024 // var is not limited with block
  let my_let = 2015 // let and const can't be accessed out side the block
  const my_const = 2015.1

  console.log(my_let)
  console.log(my_const)
}

// console.log(my_var) // 2024 instead of error or undefined as var is not limited with block
// console.log(my_let) // is out side the boundery of block {} so not accessible //error - my_let is not defined

//2. let and const have no hoisting present

{
  // console.log(my_let) //no hoisting - Cannot access 'my_let', 'my_const' before initialization
  // console.log(my_const)

  let my_let = 2015 // let and const can't be accessed out side the block
  const my_const = 2015.1
}

//3. re-assignment and re-declaration

{
  //var my_var -> var can be reassigned, re-declared anytime anywhere

  let my_let; //= 2015 //we can declare and assign value later
  my_let = 2015
  //console.log(my_let) 
  
  my_let = 2015.2015
  //console.log(my_let) // re-assignment is possible

  //let my_let = "David Js Scholar" //re-declaration is not allowed

  //constant needs to be declared and is immutable
  //const my_const; //2015.1 //we can't declare without initialization

  const my_const = 2015.1
  
  //const my_const = 2015.2 // re-declaration not allowed
  //my_const = 2015.1 // re-assignment not allowed
  //console.log(my_const)

  //hack for const - value is immutable but reference can be changed

  const User = {
      session : "Javascript - OOJS"
  }

  const User2 = {
      session : "ES6"
  }

  //User = User2 //Assignment to constant variable.

  User.session = "ES6 Variables" //updating the value of reference i.e. = session
  console.log(User)
}


//4. let and const get evaluated and not passed as reference as var 

for (var index = 1; index < 5; index++) {
  
  setTimeout(() => {
      console.log("Incremented with 2 seconds delay " + index)    
  }, 2000);
}

console.log("Breaking Condition "+ index)


for (let index1 = 0; index1 < 5; index1++) {
  setTimeout(() => {
      console.log("Incremented with 2 seconds delay using let " + index1)    
  }, 2000);    
}

//console.log("Breaking Condition using let "+ index1)