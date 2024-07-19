import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";
import { getAllAppointments } from "../../state/appointment/appointmentAction";
import { Grid, Card, Typography } from "@mui/material";
import { getAllHospitals } from "../../state/hospital/hospitalAction";
import { getAllVaccines } from "../../state/vaccine/vaccineAction";
import Watchlist from "../watchlist/Watchlist";

const Report = () => {
  const appointments = useSelector(
    (store) => store.appointmentReducer.appointments
  );

  const hospitals = useSelector((store) => store.hospitalReducer.hospitals);
  const user = useSelector((store) => store.userReducer.user);
  const vaccines = useSelector((store) => store.vaccineReducer.vaccines);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments({username: "admin"}));
  }, []);

  useEffect(() => {
    console.log(134357);
    dispatch(getAllHospitals());
    dispatch(getAllVaccines());
  }, [dispatch]);
  console.log(hospitals);

  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [totalAppt, setTotalAppt] = useState(0);
  const [femaleAppt, setFemaleAppt] = useState(0);
  const [maleAppt, setMaleAppt] = useState(0);

  useEffect(() => {
    let filtered = appointments.filter((a) => a.status !== "DECLINED");
    setFilteredAppointments(filtered);

    let total = filtered.length;
    let femaleCount = filtered.reduce(
      (acc, val) => acc + (val.registration.gender === "Female" ? 1 : 0),
      0
    );
    let maleCount = filtered.reduce(
      (acc, val) => acc + (val.registration.gender === "Male" ? 1 : 0),
      0
    );

    setTotalAppt(total);
    setFemaleAppt(femaleCount);
    setMaleAppt(maleCount);
  }, []);

  let femalePercent = Math.round((femaleAppt / totalAppt) * 100);
  let malePercent = Math.round((maleAppt / totalAppt) * 100);
  let otherPercent = 100 - femalePercent - malePercent;

  const hospitalAppt = new Array(hospitals.length).fill(0);

  for (const a of filteredAppointments) {
    for (let i = 0; i < hospitals.length; i++) {
      if (a.hospital._id == hospitals[i]._id) {
        hospitalAppt[i]++;
      }
    }
  }

  if (totalAppt != 0) {
    hospitalAppt[0] = Math.round((hospitalAppt[0] / totalAppt) * 100);
    hospitalAppt[1] = Math.round((hospitalAppt[1] / totalAppt) * 100);
    hospitalAppt[2] = Math.round((hospitalAppt[2] / totalAppt) * 100);
    hospitalAppt[3] = 100 - hospitalAppt[0] - hospitalAppt[1] - hospitalAppt[2];
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

  const vaccineMap = new Map();

  filteredAppointments.forEach((appointment) => {
    appointment.vaccineList.forEach((vaccine) => {
      if (vaccineMap.has(vaccine._id)) {
        vaccineMap.set(vaccine._id, vaccineMap.get(vaccine._id) + 1);
      } else {
        vaccineMap.set(vaccine._id, 1);
      }
    });
  });

  const vaccineArray = Array.from(vaccineMap, ([vaccineId, count]) => ({
    vaccineId,
    count,
  }));
  console.log(vaccineArray);
  const totalVaccines = vaccineArray.reduce((acc, val) => acc + val, 0);

  vaccineArray.sort((a, b) => b.count - a.count);
  const top3Vaccines = vaccineArray.slice(0, 3);
  const top3VaccinesNames = new Array(3);

  for (let i = 0; i < vaccines.length; i++) {
    if (top3Vaccines[0] != null && vaccines[i]._id == top3Vaccines[0].vaccineId) {
      top3VaccinesNames[0] = vaccines[i].name;
    }
  }
  for (let i = 0; i < vaccines.length; i++) {
    if (top3Vaccines[0] != null &&vaccines[i]._id == top3Vaccines[1].vaccineId) {
      top3VaccinesNames[1] = vaccines[i].name;
    }
  }
  for (let i = 0; i < vaccines.length; i++) {
    if (top3Vaccines[0] != null &&vaccines[i]._id == top3Vaccines[2].vaccineId) {
      top3VaccinesNames[2] = vaccines[i].name;
    }
  }

  const dosesPerDate = new Array(dates.length).fill(0);

  for (const a of filteredAppointments) {
    for (let i = 0; i < dates.length; i++) {
      if (a.date == dates[i]) {
        dosesPerDate[i] += a.vaccineList.length;
      }
    }
  }

  const top3VaccinesPerDate = new Array(4);
  for (let i = 0; i < 4; i++) {
    top3VaccinesPerDate[i] = new Array(10).fill(0);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 10; j++) {
      for (const a of filteredAppointments) {
        if (a.date == dates[j]) {
          for (let k = 0; k < a.vaccineList.length; k++) {
            if (a.vaccineList[k].name == top3VaccinesNames[i]) {
              top3VaccinesPerDate[i][j]++;
            }
          }
        }
      }
    }
  }

  for (let j = 0; j < 10; j++) {
    for (const a of filteredAppointments) {
      if (a.date == dates[j]) {
        top3VaccinesPerDate[3][j] += a.vaccineList.length;
      }
    }
    top3VaccinesPerDate[3][j] =
      top3VaccinesPerDate[3][j] -
      top3VaccinesPerDate[0][j] -
      top3VaccinesPerDate[1][j] -
      top3VaccinesPerDate[2][j];
  }

  const ages = Array.from(Array(10).keys());

  const vaccinesPerAge = new Array(4);
  for (let i = 0; i < 4; i++) {
    vaccinesPerAge[i] = new Array(10).fill(0);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 10; j++) {
      for (const a of filteredAppointments) {
        if (
          a.registration.age >= ages[j] * 10 &&
          a.registration.age <= ages[j] * 10 + 9
        ) {
          for (let k = 0; k < a.vaccineList.length; k++) {
            if (a.vaccineList[k].name == top3VaccinesNames[i]) {
              vaccinesPerAge[i][j]++;
            }
          }
        }
      }
    }
  }

  for (let j = 0; j < 10; j++) {
    for (const a of filteredAppointments) {
      if (
        a.registration.age >= ages[j] * 10 &&
        a.registration.age <= ages[j] * 10 + 9
      ) {
        vaccinesPerAge[3][j] += a.vaccineList.length;
      }
    }
    vaccinesPerAge[3][j] =
      vaccinesPerAge[3][j] -
      vaccinesPerAge[0][j] -
      vaccinesPerAge[1][j] -
      vaccinesPerAge[2][j];
  }

  return (
    <>
      <Watchlist />
      <Grid container sx={{ mt: 8 }}>
        <Grid item xs={8}>
          <Card
            sx={{
              display: "inline-block",
              alignItems: "center",
              margin: 2,
              width: "900px",
              height: "450px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
              <strong>
                Total Administered Doses per Day in the last 10 Days
              </strong>
            </Typography>

            <LineChart
              xAxis={[
                {
                  data: dates,
                  scaleType: "band",
                  valueFormatter: (date) =>
                    date.split(" ")[1] + " " + date.split(" ")[2],
                },
              ]}
              series={[
                {
                  id: top3VaccinesNames[0],
                  label: top3VaccinesNames[0],
                  data: top3VaccinesPerDate[0],
                  stack: "total",
                  area: true,
                  showMark: false,
                },
                {
                  id: top3VaccinesNames[1],
                  label: top3VaccinesNames[1],
                  data: top3VaccinesPerDate[1],
                  stack: "total",
                  area: true,
                  showMark: false,
                },
                {
                  id: top3VaccinesNames[2],
                  label: top3VaccinesNames[2],
                  data: top3VaccinesPerDate[2],
                  stack: "total",
                  area: true,
                  showMark: false,
                },
                {
                  id: "other",
                  label: "Other Vaccines",
                  data: top3VaccinesPerDate[3],
                  stack: "total",
                  area: true,
                  showMark: false,
                },
              ]}
              width={800}
              height={400}
            />
          </Card>
          <Card
            sx={{
              display: "inline-block",
              alignItems: "center",
              margin: 2,
              width: "900px",
              height: "450px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
              <strong>Total Administered Doses per Age Group</strong>
            </Typography>

            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ages.map((a) => {
                    if (a < 9) return a * 10 + "-" + (a * 10 + 9);
                    else return ">=90";
                  }),
                },
              ]}
              series={[
                {
                  data: vaccinesPerAge[0],
                  stack: "A",
                  label: top3VaccinesNames[0],
                },
                {
                  data: vaccinesPerAge[1],
                  stack: "A",
                  label: top3VaccinesNames[1],
                },
                {
                  data: vaccinesPerAge[2],
                  stack: "A",
                  label: top3VaccinesNames[2],
                },
                {
                  data: vaccinesPerAge[3],
                  stack: "A",
                  label: "Other Vaccines",
                },
              ]}
              width={800}
              height={400}
              sx={{ ml: 2 }}
            />
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card
            sx={{
              display: "inline-block",
              alignItems: "center",
              margin: 2,
              marginRight: 10,
              width: "400px",
              height: "450px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" component="div" sx={{ m: 2 }}>
              <strong>Hospitals</strong>
            </Typography>

            <PieChart
              margin={{ bottom: 200, left: 100, right: 100 }}
              colors={["#fe218b", "#21b0fe", "#fed700", "#9b5de5"]}
              series={[
                {
                  arcLabel: (item) => `${item.value}%`,
                  data: hospitals.map((ha, index) => ({
                    id: index,
                    value: hospitalAppt[index],
                    label: hospitals[index].name,
                  })),
                },
              ]}
              //width={400}
              //height={400}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: 100,
                },
              }}
            />
          </Card>
          <Card
            sx={{
              display: "inline-block",
              alignItems: "center",
              margin: 2,
              marginRight: 10,
              width: "400px",
              height: "450px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" component="div" sx={{ m: 2 }}>
              <strong>Gender</strong>
            </Typography>

            <PieChart
              margin={{ bottom: 200, left: 100, right: 100 }}
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
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: 100,
                },
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Report;
