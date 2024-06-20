
//7. Create a promise object that get resloved after two seconds and rejected after three. Also it returns five ES6 features on resolved
let promiseObject = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      status : "Success",
      value: "5 ES6 features are: arrow functions, promises, template literals, destructuring, let and const keywords",
      code : 200
    })
  }, 2000)

  setTimeout(() => {
    reject({
      status : "Failed",
      value: "This promise is rejected",
      code : 400
    })
  }, 3000)
})

promiseObject.then((response, error) => {
  console.log("execution is successfull ", response)
}).catch((response, error) => {
  console.log("execution is failed", response)
})




