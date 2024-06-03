let express = require("express")

let studentRouter = express.Router({}) // 

let StudentDataModel = require("../DataModels/StudentDataModel");  //this gives access to all methods defined in mongoose to access mongo db data

studentRouter.post("/api/signinup",(req, res)=>{
    console.log(req.body) //json data posted from API in body
    StudentDataModel.findOne({studentName:req.body.studentName}).then((existingStudent) => {
      if (existingStudent) {
        console.log("sign in success", existingStudent);
        res.send(existingStudent)
      } else {  
        let newStudent = new StudentDataModel(req.body)
        newStudent.save().then((newStudent) => {
          console.log("sign up success", newStudent);
          res.send(newStudent)
        }).catch((err1) => {
          console.log("err signup", err1)
          res.send("error while sign up")
        })
      }
    }).catch((err2) => {
      console.log("err signin", err2)
      res.send("err while searching student sign in")
    })
})

//code to fetch all users from user collection and return back
studentRouter.get("/api/students",(req, res)=>{
    StudentDataModel.find()
    .then((allStudents) => {
      res.send(allStudents)
    })
    .catch(() => {
      res.send("error while fetching students")
    })
})
  

  module.exports = studentRouter;