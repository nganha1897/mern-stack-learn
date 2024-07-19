import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Card } from "@mui/material";

const QRCodeGenerator = (props) => {
  const user = useSelector((store) => store.userReducer.user);
  const chosenVaccines = props.chosenVaccines;
  const amount = props.amount;
  const appointmentId = props.appointmentId;
  console.log("aaa" + appointmentId); 

  const generatePaymentLink = () => {
    return `http://localhost:9090/pay?amount=${amount}&user=${user.username}&appointmentId=${appointmentId}`;
  };

  const handleScan = () => {
    //updateScan();
  }

  return (
    <Box
      sx={{
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4">
        Please scan this QR Code to make payment for your appointment
      </Typography>
      <br></br><br></br>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        
        }}
      >
        <Card
          sx={{
            display: "inline-block",
            alignItems: "center",
            margin: 2,
            minHeight: "300px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4">
            <strong>Payment Details</strong>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minWidth: "250px",
              //minHeight: "100px",
              mx:4,
              my: 2
            }}
          >
            <Typography variant="h5">
              <strong>Vaccines</strong>
            </Typography>
            <Typography variant="h5">
              <strong>Amount</strong>
            </Typography>
          </Box>
          {chosenVaccines.map((v) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mx: 4,
                my: 2
              }}
            >
              <Typography>
                <strong>{v.name}</strong>
              </Typography>
              <Typography>${v.price}</Typography>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mx: 4,
              my: 2
            }}
          >
            <Typography variant="h5"><strong>Total</strong></Typography>
            <Typography variant="h5"><strong>${amount}</strong></Typography>
          </Box>
        </Card>

        <br></br>
        <QRCode value={generatePaymentLink(1)} onScan={handleScan} size={256} />
      </Box>
    </Box>
  );
};

export default QRCodeGenerator;
