//1. Create a setup for Express Web Server
//2. Configure a route name - Student
//3. Create a express app and configure in server.js to delegate routes with - "Student"
//4. Create API's in default setup - getStudentDetails - Pass Student info like - Name, Age, Address, Session as query string
//5. Save this information received in #4  to a file named studentIfo using fs module async way
const express = require('express')
const app = express()
const port = 9000

const studentRouter = require("./studentRoute")

app.use("/", studentRouter)
app.listen(port)
