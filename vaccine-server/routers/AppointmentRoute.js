let express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

let AppointmentRouter = express.Router({}); //
let AppointmentModel = require("../models/AppointmentModel");
let HospitalModel = require("../models/HospitalModel");
let RegistrationModel = require("../models/RegistrationModel");
const sgMail = require('@sendgrid/mail');

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASS;
sgMail.setApiKey(process.env.SENDGRID_KEY);

AppointmentRouter.post("/api/create", (req, res) => {
  RegistrationModel.findById(req.body.registration).then((registration) => {
    req.body.registration = registration;
    let newAppointment = new AppointmentModel(req.body);
    newAppointment
      .save()
      .then((newAppointment) => {
        HospitalModel.findById(newAppointment.hospital._id).then((hospital) => {
          hospital.appointmentList.push(newAppointment);
          hospital.save();
          sendEmail(newAppointment);
          res.send(newAppointment);
        });
      })
      .catch((err) => {
        console.log("Error creating appointment", err);
        res.send("Error creating appointment!");
      });
  });
});


let  sendEmail = async (appt) => {
  const msg = {
    to: appt.registration.email,
    from: email,
    subject: "Your Vaccine Appointment Confirmation",
    text: "This is a confirmation that your vaccine appointment has been scheduled on " + appt.date + " at " + appt.time + "!",
  };
  
  try {
    await sgMail.send(msg);
    //res.send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    //res.status(500).send('Failed to send email');
  }
}

AppointmentRouter.post("/api/updateStatus", (req, res) => {
  AppointmentModel.findById(req.body.appointmentId)
    .then((appointment) => {
      appointment.status = req.body.status;
      appointment.save().then((newAppointment) => {
        if (req.body.status == "DECLINED" || req.body.status == "VACCINATED") {
          HospitalModel.findById(newAppointment.hospital._id).then(
            (hospital) => {
              let newAppointmentList = hospital.appointmentList.filter(
                (a) => a._id.toString() != newAppointment._id.toString()
              );
              hospital.appointmentList = newAppointmentList;
              hospital.save();
            }
          );
        }
        res.send(newAppointment);
      });
    })
    .catch((err) => {
      console.log("Error updating appointment status", err);
      res.send("Error updating appointment status!");
    });
});

AppointmentRouter.get("/api/appointments", (req, res) => {
  let user = req.query.user;
  if (user == undefined || user == null || user.username == "admin") {
    // AppointmentModel.find().sort((a,b) => {return parseInt(b.date.split(" ")[2]) - parseInt(a.date.split(" ")[2]); })
    AppointmentModel.find()
      .then((allAppointments) => {
        res.send(allAppointments);
      })
      .catch(() => {
        res.send("Error while fetching all appointments!");
      });
  } else {
    AppointmentModel.find({ userId: req.query.user._id })
      .then((allAppointments) => {
        res.send(allAppointments);
      })
      .catch(() => {
        res.send("Error while fetching all user's appointments!");
      });
  }
});

AppointmentRouter.get("/api/appointment", (req, res) => {
  let id = req.query.id;
  AppointmentModel.findById(id)
    .then((appt) => {
      res.send(appt);
    })
    .catch(() => {
      res.send("Error while fetching the appointment with id!");
    });
});

module.exports = AppointmentRouter;
