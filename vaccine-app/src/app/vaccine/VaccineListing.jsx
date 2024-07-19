import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  Container,
} from "@mui/material";
import { getAllVaccines } from "../../state/vaccine/vaccineAction";
import Vaccine from "./Vaccine";
import Watchlist from "../watchlist/Watchlist";
import VaccinesIcon from "@mui/icons-material/Vaccines";

const VaccineListing = (props) => {
  const vaccines = useSelector((store) => store.vaccineReducer.vaccines);
  const updateChosenVaccines = props.updateChosenVaccines;
  let chosenVaccines = props.chosenVaccines;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVaccines());
  }, [dispatch]);

  const handleCheck = (v, isChecked) => {
    if (isChecked) chosenVaccines.push(v);
    else {
      chosenVaccines = chosenVaccines.filter((vaccine) => vaccine._id != v._id);
    }
    updateChosenVaccines(chosenVaccines);
  };

  return (
    <>
      <Watchlist />
      
      <Typography variant="h4" sx={{ marginBottom: 2, marginTop: 10, }}>
        All Vaccines
      </Typography>
      {vaccines.map((v) => (
        <Vaccine
          vaccine={v}
          updateCheckedStatus={handleCheck}
          status={
            chosenVaccines.some(vaccine => vaccine._id == v._id) 
            ? true 
            : false
          }
        />
      ))}
    </>
  );
};

export default VaccineListing;
