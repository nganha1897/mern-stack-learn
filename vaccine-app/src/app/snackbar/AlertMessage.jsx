import React, { useState, useEffect, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { SnackbarContext } from "./SnackbarContext";

const AlertMessage = (props) => {
  const { snackbar, hideSnackbar } = useContext(SnackbarContext);

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={hideSnackbar}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
