import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VaccineListing from "../vaccine/VaccineListing";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Fab,
} from "@mui/material";
import HospitalListing from "../hospital/HospitalListing";
import Registration from "../registration/Registration";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { createAppointment } from "../../state/appointment/appointmentAction";
import Watchlist from "../watchlist/Watchlist";
import { SnackbarContext } from "../snackbar/SnackbarContext";
import QRCodeGenerator from "./QRCodeGenerator";

const Appointment = () => {
  const user = useSelector((store) => store.userReducer.user);
  const [showApptDetail, setShowApptDetail] = useState([true, false, false, false]);
  let navigate = useNavigate();
  const { showSnackbar } = useContext(SnackbarContext);
  const [chosenVaccines, setChosenVaccines] = useState([]);

  const [hospitalId, setHospitalId] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [registration, setRegistration] = useState();
  const [scan, setScan] = useState();
  const dispatch = useDispatch();
  const [appointmentId, setAppointmentId] = useState();
  const amount = chosenVaccines.reduce((acc, v) => acc + v.price, 0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showApptDetail]);

  const submitAppointment = async () => {
    const appointment = {
      userId: user._id,
      hospital: hospitalId,
      date,
      time,
      vaccineList: chosenVaccines,
      status: "PENDING",
    };

    const formData = new FormData();
    for (const file of registration.documents) {
      formData.append("files", file);
    }
    formData.append("name", registration.name);
    formData.append("email", registration.email);
    console.log("email: " + registration.email);
    formData.append("age", registration.age);
    formData.append("phone", registration.phone);
    formData.append("address", registration.address);
    formData.append("gender", registration.gender);
    formData.append("disease", registration.disease);

    const tempAppointmentId = await dispatch(createAppointment(appointment, formData));
    setAppointmentId(tempAppointmentId);
    console.log("appointmentId " + tempAppointmentId);
    //showSnackbar("Appointment scheduled successfully!", "success");
    //navigate("/appointments");
    display(3);
  };

  const display = (index) => {
    const detail = [false, false, false, false];
    detail[index] = true;
    setShowApptDetail(detail);
  };

  const handleChosen = (vaccines) => {
    console.log("123456789");
    setChosenVaccines(vaccines);
  };

  const updateHospital = (newHospitalId) => {
    setHospitalId(newHospitalId);
  };

  const updateDate = (newDate) => {
    setDate(newDate);
  };
  const updateTime = (hospitalId, newTime) => {
    updateHospital(hospitalId);
    setTime(newTime);
  };

  const updateRegistration = (newRegistration) => {
    setRegistration(newRegistration);
  };

  return (
    <>
      <Box>
        {showApptDetail[0] && (
          <Box>
            <VaccineListing
              chosenVaccines={chosenVaccines}
              updateChosenVaccines={handleChosen}
            />
            <br></br>
            {user != undefined &&
              user.username != undefined &&
              user.username != "admin" && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => display(1)}
                >
                  Schedule An Appointment
                </Button>
              )}
            <br></br>
            <br></br>
            <br></br>
          </Box>
        )}
        {showApptDetail[1] && (
          <Box>
            <HospitalListing
              hospitalId={hospitalId}
              updateHospital={updateHospital}
              date={date}
              updateDate={updateDate}
              time={time}
              updateTime={updateTime}
            />
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 4,
                mb: 4,
              }}
            >
              <Button
                size="large"
                variant="contained"
                onClick={() => display(0)}
              >
                <ArrowBackIcon fontSize="medium" /> &nbsp; Edit Vaccines
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {time && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => display(2)}
                >
                  Register Recipient's Information &nbsp;
                  <ArrowForwardIcon fontSize="medium" />
                </Button>
              )}
            </Grid>
          </Box>
        )}
        {showApptDetail[2] && (
          <Box
            sx={{
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Registration
                registration={registration}
                updateRegistration={updateRegistration}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Button variant="contained" onClick={() => display(1)}>
                <ArrowBackIcon fontSize="medium" /> &nbsp; Edit Schedule
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={() => submitAppointment()}>
                Submit & Pay &nbsp;
                <ArrowForwardIcon fontSize="medium" />
              </Button>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </Box>
            
          </Box>
        )}
        {showApptDetail[3] && <QRCodeGenerator amount={amount} chosenVaccines={chosenVaccines} appointmentId={appointmentId}/>}
      </Box>
    </>
  );
};

export default Appointment;
