let express = require("express");
const jwt = require("jsonwebtoken");
let RegistrationRouter = express.Router({}); //
let RegistrationModel = require("../models/RegistrationModel");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage }).array("files", 5);

// RegistrationRouter.post("/api/create", (req, res) => {
//   upload(req, res, async (err) => {
//     const registration = req.body;
//     const files = [];
//     for (const d of req.files) {
//       const file = {
//         filename: d.originalname,
//         contentType: d.mimetype,
//         size: d.size,
//         data: d.buffer,
//       };
//       files.push(file);
//     }
//     registration.documents = files;
//     let newRegistration = new RegistrationModel(registration);
//     newRegistration.save().then((newRegistration) => {
//       res.status(201).json({ message: 'Registration saved successfully', registration: newRegistration });
//     });
//   }).catch((err) => {
//     console.log("Error creating registration", err1);
//     res.send("Error creating registration!");
//   });
// });

RegistrationRouter.post("/api/create", (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.log("Multer error:", err);
      return res.status(400).json({ message: "Error uploading files", error: err.message });
    } else if (err) {
      console.log("Unknown error during upload:", err);
      return res.status(500).json({ message: "Error uploading files", error: err.message });
    }

    const registration = req.body;
    const files = req.files.map(file => ({
      filename: file.originalname,
      contentType: file.mimetype,
      size: file.size,
      data: file.buffer, // Assuming you want to store file data as a buffer
    }));

    registration.documents = files;

    let newRegistration = new RegistrationModel(registration);
    try {
      const savedRegistration = await newRegistration.save();
      res.status(201).json({ message: 'Registration saved successfully', registrationId: savedRegistration._id });
    } catch (error) {
      console.error("Error saving registration:", error);
      res.status(500).json({ message: "Error saving registration", error: error.message });
    }
  });
});

RegistrationRouter.get("/api/registrations", (req, res) => {
  RegistrationModel.find()
    .then((allRegistrations) => {
      res.send(allRegistrations);
    })
    .catch(() => {
      res.send("Error while fetching all registrations!");
    });
});

module.exports = RegistrationRouter;
