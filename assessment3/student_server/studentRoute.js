let express = require("express")
let fs = require("fs")

let studentRouter = express.Router({})

studentRouter.get("/", function(req, res) {
  res.send("Welcome to student web!")
})

studentRouter.get("/getStudentDetails", function(req, res) {
  let student = req.query
  res.json(student)

  fs.readFile('studentInfo.json','utf8',(err, fileData)=>{
    let writerStream = fs.createWriteStream("studentInfo.json","utf8");
    if (fileData) {           
        let oldData = JSON.parse(fileData)    
        writerStream.write(JSON.stringify([...oldData, student]));
        writerStream.end();
    }else{
        writerStream.write(JSON.stringify([student]));
        writerStream.end();
    }
  })
}) 

module.exports = studentRouter