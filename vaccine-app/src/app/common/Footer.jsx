import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { signout } from "../../state/user/userAction";
import {
  Toolbar,
  Menu,
  MenuItem,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  useScrollTrigger,
  CssBaseline,
  Container,
} from "@mui/material";

const Footer = () => {
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  const isPageScrollable = () => {
    const windowHeight = window.innerHeight; // Viewport height
    const documentHeight = document.documentElement.scrollHeight; // Total document height
    console.log(windowHeight + " " + documentHeight);
    return documentHeight > windowHeight;
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        //display: trigger ? "block" : "none", // Show AppBar after scrolling 100px
        display: 'flex',
        flexDirection: 'column',
        minHeight: "100vh",
      }}
    >
      <AppBar
        position="absolute"
        color="inherit"
        sx={{
          top: "auto",
          bottom: 0,
          // backgroundColor: (theme) =>
          //   theme.palette.mode === "light"
          //     ? theme.palette.grey[200]
          //     : theme.palette.grey[800],
          
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SynerVaccine. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
