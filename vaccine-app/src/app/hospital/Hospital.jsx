import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHospitals } from "../../state/hospital/hospitalAction";
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  Container,
  Box,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Map from "./Map";
import { getAppointmentById } from "../../state/appointment/appointmentAction";

function generateTimeList() {
  const times = [];
  const startTime = "2024-07-09T10:00:00";
  const endTime = "2024-07-09T17:30:00";
  const intervalMinutes = 30;

  let currentTime = new Date(startTime);
  const endTimeObj = new Date(endTime);

  while (currentTime <= endTimeObj) {
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    const timeString = hours + ":" + minutesStr + " " + ampm;
    times.push(timeString);

    // Increment current time by intervalMinutes
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  return times;
}

const Hospital = (props) => {
  const hospital = props.hospital;
  
  let date = props.date;
  const chosenTime = props.chosenTime;
  const updateChosenTime = props.updateChosenTime;
  
  const [apptValue, setApptValue] = useState(generateTimeList());
  const [showAppt, setShowAppt] = useState(chosenTime == "" ? false : true);
  const [variants, setVariants] = useState(Array(apptValue.length).fill('outlined'));
  const [disabled, setDisabled] = useState(Array(apptValue.length).fill(false));
  
  const updateVariants = (index) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant, i) =>
        i === index ? 'contained' : 'outlined'
      )
    );
  }

  useEffect(() => {
    if (chosenTime == "") {
      setShowAppt(false);
      setVariants(Array(apptValue.length).fill('outlined'));
    }
  }, [chosenTime]);

  useEffect(() => {
    const index = apptValue.indexOf(chosenTime);
    if (index != -1)
      updateVariants(index);
  }, []);

  useEffect(() => {
    const index = apptValue.indexOf(chosenTime);
    if (index != -1)
      updateVariants(index);

    hospital.appointmentList.map(al => {
      apptValue.map((av, idx) => {
        console.log("date: " + date);
        if (al.time == av && al.date == date) {
          setDisabled((prevDisabled) =>
            prevDisabled.map((d, i) =>
              i === idx ? true : d
            )
          );
        } else if (al.date != date) {
          setDisabled((prevDisabled) =>
            prevDisabled.map((d, i) =>
              false
            )
          );
        }
      });
    });
  }, [date]);

  const handleUpdateTime = (event, index) => {
    updateVariants(index);
    updateChosenTime(hospital, apptValue[index]);
  };

  const handleDisplayTimes = () => {
    setShowAppt(!showAppt);
  };

  return (
    <Card
      sx={{
        display: "block",
        margin: 2,
        width: "98%",
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                component="div"
                align="left"
                color="blue"
              >
                <strong>{hospital.name}</strong>
              </Typography>
            </Grid>

            <Grid item xs={12} align="left">
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <HomeIcon /> &nbsp;{hospital.address}
              </Typography>
            </Grid>

            <Grid item xs={12} align="left">
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PhoneIcon /> &nbsp;{hospital.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
                color="text.secondary"
              >
                <LocalHospitalIcon /> &nbsp;{hospital.type}
              </Typography>
            </Grid>

            {showAppt && (
              <Grid item xs={12} align="left">
                {apptValue.map((appt, index) => (
                  <Button
                    variant={variants[index]}
                    sx={{
                      display: "inline-block",
                      alignItems: "center",
                      margin: 1,
                      width: "20%",
                    }}
                    key={index}
                    disabled={disabled[index]}
                    onClick={(event) => handleUpdateTime(event, index)}
                  >
                    {appt}
                  </Button>
                ))}
              </Grid>
            )}
            <Grid item xs={3} align="left">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                onClick={handleDisplayTimes}
              >
                {showAppt ? "Hide Times" : "Show Times"}
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Map address={hospital.address}/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Hospital;
