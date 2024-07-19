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


const Vaccine = (props) => {
  const vaccine = props.vaccine;
  const updateCheckedStatus = props.updateCheckedStatus;
  const status = props.status;
  const [checked, setChecked] = useState(status);

  return (
    <Card
      sx={{
        display: "inline-block",
        alignItems: "center",
        margin: 2,
        width: "500px",
        height: "200px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h5" component="div" align="left" color="blue">
              <strong>{vaccine.name}</strong>
            </Typography>
          </Grid>
          <Grid item xs={2} align="right">
            <Typography sx={{ mb: 1.5 }} color="red">
              <strong>
                {vaccine.dosesRequired}{" "}
                {vaccine.dosesRequired == 1 ? "dose" : "doses"}
              </strong>
            </Typography>
          </Grid>

          <Grid item xs={7} align="left">
            <Typography
              sx={{ fontSize: 16, marginBottom: 1.5 }}
              color="text.secondary"
            >
              Type: {vaccine.type}
            </Typography>
          </Grid>

          <Grid item xs={5} align="right" color="text.secondary">
            <Typography>Made in {vaccine.origin}</Typography>
          </Grid>

          <Grid item xs={10} align="left">
            <Typography sx={{ fontSize: 16 }}>
              Strains: {vaccine.strains}
            </Typography>
          </Grid>

          <Grid item xs={2} align="right">
            <Typography sx={{ mb: 1.5, fontSize: 18 }} color="blue">
              <strong>${vaccine.price}</strong>
            </Typography>
          </Grid>

          <Grid item xs={8} align="left">
            <Typography color="red">
              <strong>Side Effects: {vaccine.sideEffect}</strong>
            </Typography>
          </Grid>

          <Grid item xs={4} align="right">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                  checked = {checked}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      updateCheckedStatus(vaccine, e.target.checked);
                    }}
                  />
                }
                label={
                  <Typography color="blue">
                    <strong>SELECT</strong>
                  </Typography>
                }
                labelPlacement="end"
                sx={{ marginRight: 0 }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Vaccine;
