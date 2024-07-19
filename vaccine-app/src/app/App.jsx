import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import { useDispatch } from "react-redux";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import { getProfile } from "../state/user/userAction";
import VaccineForm from "./vaccine/VaccineForm";
import Appointment from "./appointment/Appointment";
import Footer from "./common/Footer";
import { CssBaseline } from "@mui/material";
import StickyFooter from "./common/StickyFooter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppointmentListing from "./appointment/AppointmentListing";
import Report from "./report/Report";
import Admin from "./admin/Admin";
import AlertMessage from "./snackbar/AlertMessage";
import { SnackbarProvider } from "./snackbar/SnackbarContext";
import Payment from "./appointment/Payment";

const defaultTheme = createTheme({
  typography: {
    h4: {
      // fontSize: '2rem',
      fontWeight: "bold",
      lineHeight: 1.5,
      //fontSize: pxToRem(20),
      /* ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }); */
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <Router>
          <Header />
          <AlertMessage />
          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="vaccineForm" element={<VaccineForm />} />
            <Route path="adminListing" element={<Admin />} />
            <Route path="makeAppointment" element={<Appointment />} />
            <Route path="appointments" element={<AppointmentListing />} />
            <Route path="reports" element={<Report />} />
            <Route path="pay" element={<Payment />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
