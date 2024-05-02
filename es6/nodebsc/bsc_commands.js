//we have 99000+ package in node js which we use for various tasks
console.log("This is going to log information we want!!!")

const { log } = require("console") //console module to print/log data in terminal
log("We are using log from console package!!")

log(__dirname) //returns fullpath of directory in which file is present
log(__filename) //returns fullpath + filename of directory in which file is present

const os = require("os") //os - is the operating system package
const path = require('path') //will be helpful to rectify the correct path to file or directory, relative path
// const util = require('util')
// const v8 = require("v8")//gives access to V8 engine of node
//const { http, get } = require("http") //helps us build the restful API's

//http.get()
//http.put()
//http.post()

// const {EventEmitter} = require("events")
// //event emitter - on is custom event
// EventEmitter.on("request","get",(req, res)=>{
//     res.send("Information to be shared with user")
// })


// log(os.userInfo())
// log(os.cpus())
// const cpuCount = os.cpus().length
// log("CPU Count ", cpuCount)
// console.log(os.hostname());
// console.log(os.release());

//path
// console.log(`The file name is - ${path.basename(__filename)}`);
// console.log(`The file name is abosolute - ${path.isAbsolute(__dirname)}`);


//callback with data inserted
process.stdin.on('data', data =>{
    process.stdout.write(`\n\n ${data.toString().trim()} \n\n`)
    process.exit();
})
process.stdin.on('exit', data =>{
    log("we are exiting")
    process.stdout.write(`\n\n ${data.toString().trim()} \n\n`)
})


// log(v8.getHeapSnapshot())
// log(v8.getHeapStatistics())

//utility module
// util.log(path.basename(__filename))
// util.log(path.basename(__dirname))
// log(util.debuglog())

// process.nextTick(()=>{log("Next Tick Called!!")})