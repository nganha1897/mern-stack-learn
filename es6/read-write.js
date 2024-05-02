//To do the IO operation we have fs module/package present in node framework
//using the same we can do read write operations following ways
// synchronously - blocking
// asynchronously - non-blocking
// read stream
// write stream

let fs = require("fs")

console.log("File read starts")

//asynchronous - non-blocking -- file read operation
// fs.readFile(__dirname+"/shortHand.js","utf-8",(err, data)=>{
//     console.log("error ", err)
//     console.log("data ", data)
// })

//synchronous - blocking -- file read operation
let data = fs.readFileSync(__dirname+"/shortHand.js", "utf-8")

console.log(data) //it waits for file to read at line 19 once file read is done it move to next line

console.log("File read ends")


//Writing into a file using write stream

let userDetails = {
    name : "Nhan",
    age : 21,
    city : "Somewhere on earth ",
    session : "MernStack"
}

//continues update in file, appending one after another
fs.readFile('Text.json','utf8',(err, fileData)=>{
    console.log("information" + fileData)
    let writerStream = fs.createWriteStream("Text.json","utf8");
    if (fileData) {           
        let oldData = JSON.parse(fileData)    
        console.log(oldData)
        writerStream.write(JSON.stringify([...oldData, userDetails]));
        writerStream.end();
    }else{
        writerStream.write(JSON.stringify([
            { name : "David",
            age : 22,
            city : "California ",
            session : "MernStack"
        }]));
        writerStream.end();
    }
})


//save the data in json object that are making MERN stack and MEAN stack as acronym
//write using writestream and also read and print using readtream upon finish
//expand it like - M-Mongo, E-Express, R-React and N-Node in JSON format


//REPL

//R - Read
//E - Evaluate
//P - Print
//L - Loop

//we need to stop it with ctrl+c cmd+c (sometimes we need to do it twice)