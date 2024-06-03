let express = require("express")

let userRouter = express.Router({}) // 

let UserDataModel = require("../DataModels/UserDataModel");  //this gives access to all methods defined in mongoose to access mongo db data

//we'll accept the user object as req.body, use it to map with user.schema key value pair
//initialize the userModel, if no validation error, then use the mongoose method to save user
userRouter.post("/api/signinup",(req, res)=>{
    console.log(req.body) //json data posted from API in body
    //initialize userSchema 
    UserDataModel.findOne({userName:req.body.userName}).then((existingUser) => {
      if (existingUser) {
        console.log("sign in success", existingUser);
        res.send(existingUser)
      } else {  //if user object is not present in users collection then we need to create new user and this is sign up
        let newUser = new UserDataModel(req.body)
        newUser.save().then((newUser) => {
          console.log("sign up success", newUser);
          res.send(newUser)
        }).catch((err1) => {
          console.log("err signup", err1)
          res.send("error while sign up")
        })
      }
    }).catch((err2) => {
      console.log("err signin", err2)
      res.send("err while searching user sign in")
    })
})

//code to fetch all users from user collection and return back
userRouter.get("/api/users",(req, res)=>{
    UserDataModel.find()
    .then((allUsers) => {
      res.send(allUsers)
    })
    .catch(() => {
      res.send("error while fetching users")
    })
})
  

  module.exports = userRouter;