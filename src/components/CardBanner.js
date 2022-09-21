import React from "react";
import Box from "@mui/material/Box";
import { CardContent, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Moment from "react-moment";
import teamNames from "../data/teams";

function getTeamName(name) {
  const index = teamNames.map((e) => e.route).indexOf(name);
  const res = teamNames[index].city.concat(" ", teamNames[index].name);
  return res;
}

function getTeamColour(name) {
  const index = teamNames.map((e) => e.route).indexOf(name);
  const res = teamNames[index].primary_colour;
  return res;
}

function getSecondaryColour(name) {
  const index = teamNames.map((e) => e.route).indexOf(name);
  const res = teamNames[index].secondary_colour;
  return res;
}

function CardBanner(props) {
  const fullName = getTeamName(props.teamname);
  const primaryColour = getTeamColour(props.teamname);
  const secondaryColour = getSecondaryColour(props.teamname);
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        verticalAlign: "middle",
        backgroundColor: primaryColour,
        height: 150,
        border: `4px solid ${secondaryColour}`,
      }}
      elevation="0"
    >
      {/*
      <CardMedia
        component="img"
        sx={{ width: 85, padding: 1, paddingLeft: 3 }}
        image={`/images/teams/${props.teamname}.png`}
        alt={props.teamname}
      />
  */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" component="h1" color="white" fontWeight="500">
          {fullName}
        </Typography>
        <Typography variant="subtitle1" color="white">
          as of:
          <Moment format=" MMMM DD, YYYY">{props.dateCreated}</Moment>
        </Typography>
        <Typography variant="subtitle2" color="white">
          information via{" "}
          <a
            style={{
              textDecoration: "underline",
              color: "white",
              fontWeight: "800",
            }}
            href="https://www.capfriendly.com/"
          >
            CapFriendly
          </a>
        </Typography>
      </Box>
    </Card>
  );
}

export default CardBanner;
