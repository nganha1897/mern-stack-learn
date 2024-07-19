let express = require("express");
const jwt = require("jsonwebtoken");
let VaccineRouter = express.Router({}); //
let VaccineModel = require("../models/VaccineModel");

VaccineRouter.post("/api/create", (req, res) => {
  console.log(req.body);
  let newVaccine = new VaccineModel(req.body);
  newVaccine
    .save()
    .then((newVaccine) => {
      res.send(newVaccine);
    })
    .catch((err) => {
      console.log("Error creating vaccine", err);
      res.send("Error creating vaccine!");
    });
});

VaccineRouter.get("/api/vaccines", (req, res) => {
  VaccineModel.find()
    .then((allVaccines) => {
      res.send(allVaccines);
    })
    .catch(() => {
      res.send("Error while fetching all vaccine!");
    });
});

module.exports = VaccineRouter;
