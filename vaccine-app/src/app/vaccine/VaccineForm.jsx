import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { createVaccine } from "../../state/vaccine/vaccineAction";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../snackbar/SnackbarContext";

const VaccineForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState();
  const [dosesRequired, setDosesRequired] = useState();
  const [sideEffect, setSideEffect] = useState("");
  const [origin, setOrigin] = useState("");
  const [strains, setStrains] = useState("");

  const { showSnackbar } = useContext(SnackbarContext);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = () => {
    const newVaccine = {
      name,
      type,
      price,
      dosesRequired,
      sideEffect,
      origin,
      strains,
    };
    dispatch(createVaccine(newVaccine));
    showSnackbar('Vaccine submitted successfully!', 'success');
    navigate("/adminListing?displayVaccine=true");
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ backgroundColor: "white" }}>
      <Box
        sx={{
          //marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <br></br>
        <br></br>
        <Typography component="h1" variant="h4">
          Add New Vaccine
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="type"
            label="Type"
            name="type"
            autoComplete="type"
            autoFocus
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            autoComplete="price"
            type="number"
            autoFocus
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dosesRequired"
            label="Doses Required"
            name="dosesRequired"
            autoComplete="dosesRequired"
            type="number"
            autoFocus
            value={dosesRequired}
            onChange={(e) => setDosesRequired(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="sideEffect"
            label="Side Effect"
            name="sideEffect"
            autoComplete="sideEffect"
            autoFocus
            value={sideEffect}
            onChange={(e) => setSideEffect(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="origin"
            label="Origin"
            name="origin"
            autoComplete="origin"
            autoFocus
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="strains"
            label="Strains"
            name="strains"
            autoComplete="strains"
            autoFocus
            value={strains}
            onChange={(e) => setStrains(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Vaccine
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VaccineForm;
