let express = require("express");
const jwt = require("jsonwebtoken");
let HospitalRouter = express.Router({}); //
let HospitalModel = require("../models/HospitalModel");

HospitalRouter.get("/api/hospitals", (req, res) => {
  HospitalModel.find()
    .then((allHospitals) => {
      console.log(allHospitals);
      res.send(allHospitals);
    })
    .catch(() => {
      res.send("Error while fetching all hospitals!");
    });
});

module.exports = HospitalRouter;
