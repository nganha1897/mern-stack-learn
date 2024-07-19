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
import Hospital from "./Hospital";
import Watchlist from "../watchlist/Watchlist";

const getDates = (numDates) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < numDates; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toDateString());
  }
  return dates;
};

const HospitalListing = (props) => {
  const hospitals = useSelector((store) => store.hospitalReducer.hospitals);
  const dispatch = useDispatch();

  let chosenHospitalId = props.hospitalId;
  let chosenDate = props.date;
  let updateDate = props.updateDate;
  let chosenTime = props.time;
  let updateChosenTime = props.updateTime;

  const [dates, setDates] = useState(getDates(10));
  const indexChosenDate = dates.indexOf(chosenDate);
  const [dateValue, setDateValue] = useState(
    indexChosenDate == -1 ? 0 : indexChosenDate
  );
  //const [timeChange, setTimeChange] = useState(chosenTime);
  const [curHospitalId, setCurHospitalId] = useState(chosenHospitalId);
  const handleDateChange = (event, index) => {
    setDateValue(index);
    updateDate(dates[index]);
  };

  const handleTimeChange = (hospitalId, time) => {
    updateChosenTime(hospitalId, time);
    setCurHospitalId(hospitalId);
  };

  useEffect(() => {
    if (indexChosenDate == -1) {
      updateDate(dates[0]);
    }
  }, []);

  useEffect(() => {
    dispatch(getAllHospitals());
  }, [dispatch]);

  return (
    <Box> 
      <Typography variant="h4" sx={{ marginBottom: 2, marginTop: 10 }}>
        All Hospitals
      </Typography>
      <Box
        sx={{
          display: "flex",
          //width: "100%",
          bgcolor: "background.paper",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
          mx: 2
        }}
      >
        <Tabs
          value={dateValue}
          onChange={handleDateChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {dates.map((date, index) =>
            index == 0 ? (
              <Tab key={index} label={`Today, ` + date} />
            ) : (
              <Tab key={index} label={date} />
            )
          )}
        </Tabs>
      </Box>
      {hospitals.map((h) => (
        <Hospital
          hospital={h}
          date={dates[dateValue]}
          chosenTime={h._id == curHospitalId ? chosenTime : ""}
          updateChosenTime={handleTimeChange}
        />
      ))}
    </Box>
  );
};

export default HospitalListing;
