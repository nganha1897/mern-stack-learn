import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { signout } from "../../state/user/userAction";
import { Toolbar, Menu, MenuItem } from "@mui/material";

const Header = (props) => {
  const user = useSelector((store) => store.userReducer.user);
  const username =
    user != undefined && user.username != undefined && user.username != null
      ? user.username
      : "Guest";
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signout());
    navigate("/signin");
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/makeAppointment"
              sx={{
                //ml: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
              }}
            >
              SynerVaccine
            </Typography>
            {user == undefined ||
            user.username == undefined ||
            user.username != "admin" ? (
              <>
                <Button color="inherit" href="/makeAppointment">
                  <strong>Home</strong>
                </Button>

                <Button color="inherit" href="/makeAppointment">
                  <strong>Vaccines</strong>
                </Button>
                {user != undefined &&
                  user.username != undefined &&
                  user.username != "admin" && (
                    <Button color="inherit" href="/appointments">
                      <strong>Appointments</strong>
                    </Button>
                  )}
              </>
            ) : (
              <>
                <Button color="inherit" href="/adminListing?displayVaccine=true">
                  <strong>Home</strong>
                </Button>
                <Button
                  color="inherit"
                  href="/adminListing?displayVaccine=true"
                >
                  <strong>Vaccines</strong>
                </Button>
                <Button
                  color="inherit"
                  href="/adminListing?displayVaccine=false"
                >
                  <strong>Hospitals</strong>
                </Button>
                <Button color="inherit" href="/appointments">
                  <strong>Appointments</strong>
                </Button>
                <Button color="inherit" href="/reports">
                  <strong>Report</strong>
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="p" component="div">
              Welcome, {username}
            </Typography>

            {user == undefined ||
            user.username == undefined ||
            user.username == null ? (
              <Button color="inherit" href="/signin">
                <strong>Sign in</strong>
              </Button>
            ) : (
              <Button color="inherit" onClick={handleSignOut}>
                <strong>Sign out</strong>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
