import React from "react";
import Card from "@mui/material/Card";
import {
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Chip,
} from "@mui/material";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import Divider from "@mui/material/Divider";
import "react-circular-progressbar/dist/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function stringAvatar(name) {
  if (name == null) {
    return "";
  } else {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
}

function PlayerCard(props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 56, height: 56 }}
            {...stringAvatar(props.name)}
          />
        }
        title={props.name}
        subheader={`${props.position} | ${props.age} years old`}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent sx={{ paddingTop: 1 }}>
        <Divider />
        <div style={{ paddingTop: 7, paddingBottom: 7 }}>
          <Typography variant="h6" align="center">
            <strong>${props.caphit}M</strong>
          </Typography>
          <Typography variant="body1" align="center" gutterBottom="true">
            with <strong>{props.years}</strong> years remaining until{" "}
            <strong>{props.status}</strong>
          </Typography>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <div style={{ width: 120, height: 120 }}>
            <CircularProgressbarWithChildren
              strokeWidth={5}
              value={props.capPercentage}
              maxValue={100}
            >
              <div style={{ fontSize: 18, marginTop: -5 }}>
                <strong>{props.capPercentage}%</strong>
              </div>
              <div style={{ fontSize: 14, marginTop: -4 }}>of total cap</div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
        <Divider />
        {props.clauses ? (
          <div style={{ paddingTop: 15 }}>
            <Chip color="error" label="NMC" />
          </div>
        ) : (
          <div style={{ paddingTop: 15 }}>No contract clauses</div>
        )}
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
