const express = require('express') //express class constructor
const app = express() //invoking the class to create express app server
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

require('dotenv').config();

const port = 9000

const corsOptions = {
  origin: ['http://localhost:9090'],
  credentials: true
};

const cors = require("cors")

const UserRouter = require("./routers/UserRoute")
const VaccineRouter = require("./routers/VaccineRoute")
const HospitalRouter = require("./routers/HospitalRoute")
const AppointmentRouter = require("./routers/AppointmentRoute")
const RegistrationRouter = require("./routers/RegistrationRoute")

const userApp = express();
const vaccineApp = express();
const hospitalApp = express();
const appointmentApp = express();
const registrationApp = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsOptions)) //enabling cross origin resource sharing at root level

//setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware 
app.use('/static', express.static('public')) //localhost:9000/static/alert.js

//json middle-ware for setting request content type to json in body
app.use(express.json({limit:'2mb', extended:false})); 

//path signinup => localhost:9000/user/api/signinup
app.use("/user", userApp)
userApp.use(UserRouter)

app.use("/vaccine", vaccineApp)
vaccineApp.use(VaccineRouter)

app.use("/hospital", hospitalApp)
hospitalApp.use(HospitalRouter)

app.use("/appointment", appointmentApp)
appointmentApp.use(AppointmentRouter)

app.use("/registration", registrationApp)
registrationApp.use(RegistrationRouter)

app.listen(port)

console.log("api launched at - localhost:"+port)