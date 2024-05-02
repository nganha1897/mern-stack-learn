// callbacks and callbacks and callbacks - becomes full of callback function
// when multiple callbacks fail it ends up in a callback hell situation
// signinuser

// function Authentication_API(userInfo) {} //Login SignUp, create userSession //uses - authentication api
// function Authorization_API(userInfo, sessionId) {} // Permissions to access like admin/normal user - roles //uses - Authorization api
// function Navigation_API(userInfo, permissions) {} // what all pages user can navigate, returns first page //uses - navigation api

function LoginProcess(userId, password) {
  let userInfo = {userId, password}
  
  //let userSession = Authentication(userInfo, Authorization)

  Authentication(userInfo, Authorization) 

  function Authentication(userInfo, Authorization) {
    let userSession = Authentication_API(userInfo)

    if (userSession == valid)
      Authorization(userInfo, userSession, Navigation)
    else
      Authentication(userInfo, Authorization) //if server fails we'll have many many recursive calls to Authentication
  }

  function Authorization(userInfo, userSession, Navigation) {
    let permissions = Authorization_API(userInfo, userSession)

    let loginScreen = Navigation_API(userInfo, permissions)
  }

  let displayScreen = Navigation(loginScreen)
}

//call back hell : at line number 22, if we fall in a loop of failures it will take us into callback hell situation
//not a proper handling of response
//mandatory to take immediate action after we get response

// Promise - is a object which completes some async/sync job in its execution but has the capability to hold
// manipulate and return the response when asked

let promiseObject = new Promise((resolve, reject) => {

  //let userSession = Authentication_API(userInfo) //make call to server get the response and store

  setTimeout(() => {
    resolve({
      status : "Success",
      value : "User Session Object",
      code : 200
    })
  }, 2000)

  setTimeout(() => {
    reject({
      status : "Failed",
      value : "User Session Failed",
      code : 403.15
    })
  }, 1000)
})

console.log(promiseObject)

//response is returned upon being asked ==> promiseObj.then.then.catch
// .then => retruns for resolve cases
// .catch => retruns for rejected cases

promiseObject.then((response, error) => {
  console.log("execution is successfull ", response)
}).catch((response, error) => {
  console.log("execution is failed", response)
})

console.log(promiseObject)

console.log(promiseObject)

console.log("Promise completed")

// create a promise object with name student on it after 2 seconds student is pass (resolved case)
// and set status stating learnt es6
// then for rejected case set that status - i am progressing
