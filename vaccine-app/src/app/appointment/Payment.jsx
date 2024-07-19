import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import VaccineListing from "../vaccine/VaccineListing";
import { Typography } from "@mui/material";

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId");
  let navigate = useNavigate();
  {setTimeout(() => {
    navigate("/appointments");
  }, 3000)}
  
  return (
    <>
    <Typography variant="h4">
      You have successfully paid for your application!
    </Typography>
    </>
  )
}

export default Payment;