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
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import "react-circular-progressbar/dist/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function stringToColor(string) {
  let color = "";

  if (string == "mapleleafs") {
    color = "#00205B";
  }

  return color;
}

function stringAvatar(name, teamname) {
  if (name == null) {
    return "";
  } else {
    return {
      sx: {
        bgcolor: stringToColor(teamname),
        width: 50,
        height: 50,
      },
      children: `${name.split(" ")[1][0]}${name.split(" ")[0][0]}`,
    };
  }
}

function formatName(name) {
  if (name == null) {
    return "";
  } else {
    return name.split(" ");
  }
}

function yearsRemaining(yr, option) {
  if (yr == null) {
    return "";
  } else {
    var res = yr.split(" ");
    if (option == "year") {
      return res[0];
    } else {
      return res[1];
    }
  }
}

function PlayerCard(props) {
  const formattedName = formatName(props.name);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar {...stringAvatar(props.name, props.teamName)} />}
        title={`${formattedName[1]} ${formattedName[0].slice(0, -1)}`}
        subheader={`${props.position} | ${props.age} years old`}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent sx={{ paddingTop: 1 }}>
        <Divider />
        <div style={{ paddingTop: 7, paddingBottom: 7 }}>
          <Typography variant="h6" align="center">
            <strong>
              $
              {props.caphit.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </strong>
          </Typography>
          <Typography variant="body1" align="center" gutterBottom="true">
            with <strong>{yearsRemaining(props.yearsRemaining, "year")}</strong>{" "}
            years remaining until{" "}
            <strong>{yearsRemaining(props.yearsRemaining, "status")}</strong>
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
          <div style={{ width: 110, height: 110 }}>
            <CircularProgressbarWithChildren
              strokeWidth={8}
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
        <Stack direction="row" spacing={1}>
          {props.clauses == "NMC" ? (
            <div style={{ paddingTop: 15 }}>
              <Tooltip title="No Movement Clause">
                <Chip color="error" label="NMC" />
              </Tooltip>
            </div>
          ) : props.clauses == "M-NTC" ? (
            <div style={{ paddingTop: 15 }}>
              <Tooltip title="Modified No Movement Clause">
                <Chip color="warning" label="M-NTC" />
              </Tooltip>
            </div>
          ) : props.clauses == "35+NMC" ? (
            <div style={{ paddingTop: 15 }}>
              <Tooltip title="35+ No Movement Clause">
                <Chip color="error" label="35+ NMC" />
              </Tooltip>
            </div>
          ) : (
            <div></div>
          )}

          {props.status == "Draft" ? (
            <div style={{ paddingTop: 15 }}>
              <Tooltip title="This player was drafted by the organization">
                <Chip color="primary" label="Drafted" />
              </Tooltip>
            </div>
          ) : props.status == "Signed" ? (
            <div style={{ paddingTop: 15 }}>
              <Tooltip title="This was signed by the organization">
                <Chip color="secondary" label="Signed" />
              </Tooltip>
            </div>
          ) : (
            <div style={{ paddingTop: 15 }}>
              <Tooltip title="This player was aquired via trade by the organization">
                <Chip color="success" label="Trade" />
              </Tooltip>
            </div>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
