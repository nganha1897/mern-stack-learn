// async and await - to give us a synchronised behaviour of execution though executing asynchronously
// if we create promise object inside async it will take it or if we dont create promise then it will wrap a promise object
// async and await : //Async : A way to have multi-threading in javascript like other object oriented programming language

// fetch userInfo - call //150
// fetch productDetails - call //200
// fetch cartInfo - call //100

// stack1(main thread) - 200 mb (300 request/sec) - (+150 req/sec)
// ==> if requests increases 600 request/sec

// (async) 
// (await) 
// stack2(thread) -  200 mb (300 request/sec) //150
// stack3(thread) -  200 mb (300 request/sec) //200
// stack4(thread) -  200 mb (300 request/sec) //100

function resolveAfter2Seconds() {
  return new Promise((resolve,reject) => {
          setTimeout(() => {
              resolve({
                  "statuscode" : 200,
                  "statusmsg" :'resolved'
                  });
          }, 2000);
  });
}

function resolveAfter3Seconds() {
        return new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve({
                        "statuscode" : 200,
                        "statusmsg" :'resolved'
                        });
                }, 3000);
        });
      }

console.log("async Execution starts");

//async creates a new thread to execute API's that we see will take some time
async function asyncCall() {

  console.log("Before await - blocking thread starts")

  await resolveAfter2Seconds()
          .then((data, err)=>console.log(data))
          .catch((err)=>console.log(err))

  console.log("After await - thread executes one by one")

  console.log("Before await 2 - blocking thread starts")

  await resolveAfter2Seconds()
          .then((data, err)=>console.log(data))
          .catch((err)=>console.log(err))

  console.log("After await 2- thread executes one by one")
}

async function asyncCall2() {

        console.log("Before await2 - blocking thread starts")
      
        await resolveAfter3Seconds()
                .then((data, err)=>console.log(data))
                .catch((err)=>console.log(err))
      
        console.log("After await2 - thread executes one by one")
      
        console.log("Before await2 2 - blocking thread starts")
      
        await resolveAfter3Seconds()
                .then((data, err)=>console.log(data))
                .catch((err)=>console.log(err))
      
        console.log("After await2 2- thread executes one by one")
      }

asyncCall()

console.log("async Execution ends");


//create a promise to print user info like - name, address, account number after 3 seconds, using aync and await
// also check when it rejects after 2 second
// analyse how await works as blocking execution

// create one set of map using different types of keys and at leas show the usage of 5 functions (.get, .clear)
// create a list using set and show the usage of 5 functions (.add, .clear)

// create and example of arithmatic operations (addition, substraction, multiply, division), using generator function