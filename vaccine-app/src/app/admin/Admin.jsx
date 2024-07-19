import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import VaccineListing from "../vaccine/VaccineListing";
import Button from "@mui/material/Button";
import HospitalListing from "../hospital/HospitalListing";
import { Box } from "@mui/material";
const Admin = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const displayVaccine = queryParams.get("displayVaccine");

  return (
    <>
      {displayVaccine == "true" && (
        <Box>
          <VaccineListing updateChosenVaccines={() => {}} chosenVaccines={[]} />
          <br></br>
          <Button
            variant="contained"
            size="large"
            sx={{ marginLeft: 2, mb: 2 }}
            href="/vaccineForm"
          >
            Add New Vaccine
          </Button>
          <br></br>
          <br></br>
          <br></br>
        </Box>
      )}

      {displayVaccine == "false" && <HospitalListing updateDate={() => {}} />}
    </>
  );
};

export default Admin;
