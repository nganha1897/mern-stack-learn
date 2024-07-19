import { Box, Fab, Input } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

const HiddenInput = styled("input")({
  display: "none",
});

const Registration = (props) => {
  const registration = props.registration;
  const updateRegistration = props.updateRegistration;
  const user = useSelector((store) => store.userReducer.user);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState("");
  const [disease, setDisease] = useState();
  const [documents, setDocuments] = useState([]);
  const [newRegistration, setNewRegistration] = useState(registration);

  const handleRegistration = (field, val) => {
    const newUpdatedRegistration = {
      ...newRegistration,
      [field]: val,
    };
    setNewRegistration(newUpdatedRegistration);
    updateRegistration(newUpdatedRegistration);
  };

  useEffect(() => {
    if (user != undefined && user != null && user.email != undefined) {
      setEmail(user.email);
      handleRegistration("email", user.email);
    }
    if (registration != undefined && registration != null) {
      setName(registration.name);
      setEmail(registration.email);
      setAge(registration.age);
      setPhone(registration.phone);
      setAddress(registration.address);
      setGender(registration.gender);
      setDisease(registration.disease);
      setDocuments(registration.documents);
    }
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const isValidType = ["application/pdf", "image/jpeg", "image/png"].includes(
      file.type
    );
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB size limit
    if (isValidType && isValidSize) {
      const newDocuments = [...documents, event.target.files[0]];
      setDocuments(newDocuments);
      handleRegistration("documents", newDocuments);
    } else {
      alert("Cannot upload file because of invalid size or type!");
    }
  };

  const deleteDocument = (index) => {
    const newDocuments = documents.filter((d, i) => index != i);
    setDocuments(newDocuments);
    handleRegistration("documents", newDocuments);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <br></br>
      <br></br>
      <br></br>
      <Box>
        <Typography variant="h4">
          <strong>Recipient's Information</strong>
        </Typography>
      </Box>
      <Box width={400}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleRegistration("name", e.target.value);
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleRegistration("email", e.target.value);
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="age"
          label="Age"
          name="Age"
          autoComplete="age"
          autoFocus
          type="number"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            handleRegistration("age", e.target.value);
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone"
          name="phone"
          autoComplete="phone"
          autoFocus
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            handleRegistration("phone", e.target.value);
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
          type="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            handleRegistration("address", e.target.value);
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="gender"
          label="Gender"
          name="gender"
          autoComplete="gender"
          autoFocus
          select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            handleRegistration("gender", e.target.value);
          }}
        >
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          margin="normal"
          required
          fullWidth
          id="disease"
          label="Disease"
          name="disease"
          autoComplete="disease"
          autoFocus
          value={disease}
          onChange={(e) => {
            setDisease(e.target.value);
            handleRegistration("disease", e.target.value);
          }}
        />

        <Box
          sx={{
            textAlign: "center",
            border: "1px solid silver",
            borderRadius: 1,
            mt: 2,
          }}
        >
          {documents.length > 0 &&
            documents.map((d, index) => (
              <Box
                sx={{
                  mt: 2,
                  border: "1px solid silver",
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                  ml: 8,
                  mr: 8,
                }}
                //align="center"
              >
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flexGrow: 1,
                    //mr: 2,
                  }}
                >
                  {d.name}
                </Typography>
                <IconButton
                  disableFocusRipple
                  aria-label="delete"
                  onClick={(event) => deleteDocument(index)}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          <label htmlFor="file-upload">
            <HiddenInput
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
            />
            <br></br>
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              size="large"
            >
              Medical Documents
            </Button>
            <br></br>
            <br></br>
          </label>
        </Box>
      </Box>
    </Box>
  );
};

export default Registration;
