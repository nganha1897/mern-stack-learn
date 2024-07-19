import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "../../state/appointment/appointmentAction";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const AppointmentListing = () => {
  const appointments = useSelector(
    (store) => store.appointmentReducer.appointments
  );
  const user = useSelector((store) => store.userReducer.user);

  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsAdmin(
      user != undefined && user != null && user.username == "admin"
        ? true
        : false
    );
  }, [user]);

  useEffect(() => {
    if (user != undefined && user != null) {
      dispatch(getAllAppointments(user));

      appointments.map((a) => {
        let apptDate = new Date(a.date);
        let apptHour =
          parseInt(a.time.split(":")[0]) +
          (a.time.substring(a.time.length - 2) == "AM" ? 0 : 12);
        let apptMinute = parseInt(a.time.split(":")[1].substring(0, 2));

        let today = new Date(new Date().toDateString());
        let day = new Date();
        let hour = day.getHours();
        let minute = day.getMinutes();
        if (
          (apptDate < today ||
            (apptDate == today &&
              (apptHour < hour ||
                (apptHour == hour && apptMinute < minute)))) &&
          (a.status != "VACCINATED" && a.status != "DECLINED")
        ) {
          updateStatus(a._id, "VACCINATED");
        }
      });

      // appointments.sort((a,b) => {
      //   return b.date.split(" ")[2] == a.date.split(" ")[2] ?
      //   b.time.split(" ")[0].split(":")[0] * 100 + b.time.split(" ")[0].split(":")[1] -  a.time.split(" ")[0].split(":")[0] * 100 - a.time.split(" ")[0].split(":")[1]
      //   : 
      //   parseInt(b.date.split(" ")[2]) - parseInt(a.date.split(" ")[2])
      // })
    }
  }, [user, appointments]);

  const updateStatus = (appointmentId, status) => {
    dispatch(updateAppointmentStatus(appointmentId, status));
  };

  const download = (file) => {
    const byteCharacters = atob(file.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: file.contentType });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.filename);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Typography variant="h4" sx={{ mb: 4 }}>
          <strong>Your Appointments</strong>
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Time</TableCell>
                <TableCell align="center">Vaccines</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Disease</TableCell>
                <TableCell align="center">Documents</TableCell>
                <TableCell align="center">Status</TableCell>
                {isAdmin && (
                  <TableCell align="center" colSpan={3}>
                    Action
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((a, index) => (
                <TableRow
                  key={a._id}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{a.hospital.name}</TableCell>
                  <TableCell align="center">
                    <strong>
                      {a.date}
                      <br></br>
                      {a.time}
                    </strong>
                  </TableCell>
                  <TableCell align="center">
                    {a.vaccineList.map((v) => (
                      <Typography>{v.name}</Typography>
                    ))}
                  </TableCell>
                  <TableCell align="center">{a.registration.name}</TableCell>
                  <TableCell align="center">{a.registration.age}</TableCell>
                  <TableCell align="center">{a.registration.disease}</TableCell>
                  <TableCell align="center">
                    {a.registration.documents.map((d) => (
                      <Box>
                        <Button onClick={() => download(d)}>
                          {d.filename}
                        </Button>
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      color={
                        a.status == "PENDING" || a.status == "APPROVED"
                          ? "primary"
                          : a.status == "VACCINATED"
                          ? "green"
                          : "red"
                      }
                    >
                      <strong>{a.status}</strong>
                    </Typography>
                  </TableCell>
                  {isAdmin && (
                    <>
                      <TableCell align="center">
                        {a.status == "PENDING" && (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => updateStatus(a._id, "APPROVED")}
                          >
                            Approve
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {a.status == "PENDING" && (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => updateStatus(a._id, "DECLINED")}
                          >
                            Decline
                          </Button>
                        )}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
        <br></br>
        <br></br>
      </Box>
    </>
  );
};

export default AppointmentListing;
