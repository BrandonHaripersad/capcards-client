import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import teamNames from "../data/teams";

function MenuBar() {
  const [navBg, setNavBg] = useState("blue");
  const location = useLocation();

  useEffect(() => {
    const team = location.pathname.split("/")[2];
    const index = teamNames.map((e) => e.route).indexOf(team);
    if (index != -1) {
      const colour = teamNames[index].primary_colour;
      setNavBg(colour);
    } else {
      setNavBg("primary");
    }
  }, [location]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: navBg }}>
        <Container maxWidth="md">
          <Toolbar disableGutters="true">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NHL Salary Cap Cards
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/teams">
              Teams
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default MenuBar;
