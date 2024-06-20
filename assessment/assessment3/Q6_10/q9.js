

//9. Use the question #7 to build promises using async and await - with multithread

function BuildPromise() {
  return new Promise((resolve, reject) => {
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
}

async function Call1() {
  console.log("Before call1 await 1")
  await BuildPromise()
    .then((data, err) => console.log("Success: first call first await"))
    .catch((err) => console.log(err))
  
  console.log("After call1 await 1")
  console.log("Before call1 await 2")
  await BuildPromise()
    .then((data, err) => console.log("Success: first call second await"))
    .catch((err) => console.log(err))

  console.log("After call1 await2")
}

async function Call2() {
  console.log("Before call2 await 1")
  await BuildPromise()
    .then((data, err) => console.log("Success: second call first await"))
    .catch((err) => console.log(err))
  
  console.log("After call2 await 1")
  console.log("Before call2 await 2")
  await BuildPromise()
    .then((data, err) => console.log("Success: second call second await"))
    .catch((err) => console.log(err))

  console.log("After call2 await2")
}

Call1()
Call2()

