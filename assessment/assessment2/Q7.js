//7. Create an example showing usage of event loop in concurrent execution cycle

console.log("First")

setTimeout(function() {
  console.log("Third")
}, 1000)

console.log("Second")

//console.log("First") and console.log("Last") are executed immediately. The callback function
//from setTimeout is placed into Event Queue after 1 second and event loop moves it from queue to
//stack for execution