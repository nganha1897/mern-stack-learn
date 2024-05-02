//importing express top class and then creating express server

const express = require('express') //express class constructor
const app = express() //invoking the class to create express app server

const port = 9000//

const defaultRouter = require("./Routers/defaultRoute")
const adminRouter = require("./Routers/adminRoute")

//we can have one main and multiple other express apps at a place
const adminApp = express(); // a new express app to handle requests mounted with admin in path


//setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware 
app.use('/static', express.static('public')) //localhost:9000/static/alert.js


//path mounting to other express app
app.use("/admin", adminApp)
adminApp.use(adminRouter)

app.use("/",defaultRouter)

app.listen(port)

console.log("api launched at - localhost:"+port)