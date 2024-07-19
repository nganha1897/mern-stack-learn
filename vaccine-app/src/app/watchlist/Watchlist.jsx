import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";
import { getAllAppointments } from "../../state/appointment/appointmentAction";
import { Grid, Card, Typography, Box } from "@mui/material";
import { getAllHospitals } from "../../state/hospital/hospitalAction";
import "./Watchlist.css";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { getAllVaccines } from "../../state/vaccine/vaccineAction";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import GaugeChart from "react-gauge-chart";
import Marquee from "react-fast-marquee";

const Watchlist = () => {
  const boxRef = useRef(null);

  const appointments = useSelector(
    (store) => store.appointmentReducer.appointments
  );
  const hospitals = useSelector((store) => store.hospitalReducer.hospitals);
  const user = useSelector((store) => store.userReducer.user);
  const vaccines = useSelector((store) => store.vaccineReducer.vaccines);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments({username: "admin"}));
    dispatch(getAllHospitals());
    dispatch(getAllVaccines());
  }, []);

  // const [filteredAppointments, setFilteredAppointments] = useState([]);
  const filteredAppointments = appointments.filter((a) => a.status !== "DECLINED");

  const totalAppt = filteredAppointments.length;
  const femaleAppt = filteredAppointments.reduce(
    (acc, val) => acc + (val.registration.gender == "Female" ? 1 : 0),
    0
  );
  
  const maleAppt = filteredAppointments.reduce(
    (acc, val) => acc + (val.registration.gender == "Male" ? 1 : 0),
    0
  );

  const femalePercent = Math.round((femaleAppt / totalAppt) * 100);
  const malePercent = Math.round((maleAppt / totalAppt) * 100);
  const otherPercent = 100 - femalePercent - malePercent;

  const hospitalAppt = new Array(hospitals.length).fill(0);

  for (const a of filteredAppointments) {
    for (let i = 0; i < hospitals.length; i++) {
      if (a.hospital._id == hospitals[i]._id) {
        hospitalAppt[i]++;
      }
    }
  }

  const totalDoses = filteredAppointments.reduce(
    (acc, appt) => acc + appt.vaccineList.length,
    0
  );

  const dosesToday = filteredAppointments.reduce(
    (acc, appt) =>
      acc +
      (appt.date == new Date().toDateString() ? appt.vaccineList.length : 0),
    0
  );

  const allVaccines = vaccines.length;

  const ageGroup = new Array(10).fill(0);

  filteredAppointments.map((a) => {
    ageGroup[Math.floor(a.registration.age / 10)]++;
  });

  const watchList = {};
  watchList.totalDoses = totalDoses;
  watchList.recipients = filteredAppointments.length;
  watchList.dosesToday = dosesToday;
  watchList.allVaccines = allVaccines;
  watchList.allHospitals = hospitals.length;
  watchList.maxAge = 0;

  let max = 0;
  for (let i = 0; i < ageGroup.length; i++) {
    if (ageGroup[i] > max) {
      watchList.maxAge = i;
      max = ageGroup[i];
    }
  }

  const getDates = (numDates) => {
    const dates = [];
    const today = new Date();
    for (let i = numDates - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toDateString());
    }
    return dates;
  };

  const dates = getDates(10);
  const dosesPerDate = new Array(dates.length).fill(0);
  for (const a of filteredAppointments) {
    for (let i = 0; i < dates.length; i++) {
      if (a.date == dates[i]) {
        dosesPerDate[i] += a.vaccineList.length;
      }
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        top: "70px",
        height: "140",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Marquee>
        <Card  className="card">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <VaccinesIcon color="primary" sx={{ fontSize: 60 }} />
            <Box style={{ marginLeft: "10px" }}>
              <Typography variant="h4">
                <strong>{watchList.totalDoses}</strong>
              </Typography>
              <Typography variant="body1" className="smallText">
                <strong>Administered Doses</strong>
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card className="card">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PeopleAltIcon sx={{ fontSize: 60, color: "#50C878" }} />
            <Box style={{ marginLeft: "10px" }}>
              <Typography variant="h4">
                <strong>{watchList.recipients}</strong>
              </Typography>
              <Typography variant="body1" className="smallText">
                <strong>Recipients</strong>
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card className="card">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VaccinesIcon sx={{ fontSize: 60, color: "#FFD580" }} />
            <Box style={{ marginLeft: "10px" }}>
              <Typography variant="h4">
                <strong>{watchList.dosesToday}</strong>
              </Typography>
              <Typography variant="body1" className="smallText">
                <strong>Doses Today</strong>
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card className="card">
          <Box
            sx={{
              display: "block",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GaugeChart
              id="gauge-chart1"
              textColor="black"
              formatTextValue={(value) => "Very Low"}
              nrOfLevels={5}
              percent={watchList.totalDoses / 300000000}
            />
            <Typography variant="body1" className="smallText">
              <strong>Covered Population (%)</strong>
            </Typography>
          </Box>
        </Card>

        <Card className="card">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LocalHospitalOutlinedIcon
              sx={{ fontSize: 60, color: "#FF5F15" }}
            />
            <Box style={{ marginLeft: "10px" }}>
              <Typography variant="h4">
                <strong>{watchList.allHospitals}</strong>
              </Typography>
              <Typography variant="body1" className="smallText">
                <strong>Hospitals</strong>
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card className="card">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VaccinesIcon color="primary" sx={{ fontSize: 60 }} />
            <Box style={{ marginLeft: "10px" }}>
              <Typography variant="h4">
                <strong>{watchList.allVaccines}</strong>
              </Typography>
              <Typography variant="body1" className="smallText">
                <strong>Vaccine Types</strong>
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card className="card">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PeopleAltIcon sx={{ fontSize: 60, color: "#50C878" }} />
            <Box style={{ marginLeft: "10px" }}>
              <Typography variant="h4">
                <strong>
                  {watchList.maxAge * 10} - {watchList.maxAge * 10 + 9}
                </strong>
              </Typography>
              <Typography variant="body1" className="smallText">
                <strong>Highest Vaccinated Age Group</strong>
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card className="card">
          <PieChart
            colors={["#fe218b", "#21b0fe", "#fed700"]}
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
                data: [
                  { id: 0, value: femalePercent, label: "Female" },
                  { id: 1, value: malePercent, label: "Male" },
                  {
                    id: 2,
                    value: otherPercent,
                    label: "Other",
                  },
                ],
              },
            ]}
            //width={400}
          />
        </Card>
      </Marquee>
    </Box>
  );
};

export default Watchlist;
