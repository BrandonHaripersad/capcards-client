import React from "react";
import Card from "@mui/material/Card";
import {
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import teamNames from "../data/teams";
import PaidIcon from "@mui/icons-material/Paid";
import "react-circular-progressbar/dist/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function stringToColor(string) {
  const index = teamNames.map((e) => e.route).indexOf(string);
  return teamNames[index].primary_colour;
}

function stringAvatar(name, teamname) {
  if (name === null) {
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
  if (name === null) {
    return "";
  } else {
    var temp = name.split(",");
    var clean = temp[1].replace('"C"', "").replace('"A"', "");
    return [temp[0], clean];
  }
}

function yearsRemaining(yr, option) {
  if (yr === null) {
    return "";
  } else {
    var res = yr.split(" ");
    if (option === "year") {
      return res[0];
    } else {
      return res[1];
    }
  }
}

function PlayerCard(props) {
  const formattedName = formatName(props.name);
  const teamColour = stringToColor(props.teamName);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar {...stringAvatar(props.name, props.teamName)} />}
        title={`${formattedName[1]} ${formattedName[0]}`}
        subheader={`${props.position} | ${props.age} years old`}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent sx={{ paddingTop: 1 }}>
        <Divider />
        <div style={{ paddingTop: 7, paddingBottom: 7 }}>
          <Typography variant="h6" align="center" color="green">
            <strong>
              $
              {props.caphit.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </strong>
          </Typography>
          <Typography variant="body2" align="center" gutterBottom="true">
            <strong>{yearsRemaining(props.yearsRemaining, "year")}</strong>{" "}
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
              styles={buildStyles({
                pathColor: stringToColor(props.teamName),
              })}
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
          {props.clauses === "NMC" ? (
            <div style={{ paddingTop: 15 }}>
              <a
                href={props.link}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Tooltip title="No Movement Clause">
                  <Chip color="warning" label="NMC" clickable />
                </Tooltip>
              </a>
            </div>
          ) : props.clauses === "M-NTC" ? (
            <div style={{ paddingTop: 15 }}>
              <a
                href={props.link}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Tooltip title="Modified No Movement Clause">
                  <Chip color="warning" label="M-NTC" clickable />
                </Tooltip>
              </a>
            </div>
          ) : props.clauses === "35+NMC" ? (
            <div style={{ paddingTop: 15 }}>
              <a
                href={props.link}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Tooltip title="35+ No Movement Clause">
                  <Chip color="warning" label="35+ NMC" clickable />
                </Tooltip>
              </a>
            </div>
          ) : (
            <div></div>
          )}

          {props.status === "Draft" ? (
            <div style={{ paddingTop: 15 }}>
              <a
                href={props.transactionLink}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Tooltip title="This player was aquired via the draft.">
                  <Chip color="primary" label="Drafted" clickable />
                </Tooltip>
              </a>
            </div>
          ) : props.status === "Signed" ? (
            <div style={{ paddingTop: 15 }}>
              <a
                href={props.transactionLink}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Tooltip title="This player was aquired via free agent signing.">
                  <Chip color="secondary" label="Signed" clickable />
                </Tooltip>
              </a>
            </div>
          ) : (
            <div style={{ paddingTop: 15 }}>
              <a
                href={props.transactionLink}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Tooltip title="This player was aquired via a trade">
                  <Chip color="success" label="Trade" clickable />
                </Tooltip>
              </a>
            </div>
          )}

          {props.injury === "IR" ? (
            <div style={{ paddingTop: 15 }}>
              <a
                href={props.transactionLink}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Tooltip title="This player is on the Injured Reserve.">
                  <Chip color="error" label="IR" clickable />
                </Tooltip>
              </a>
            </div>
          ) : props.injury === "LTIR" ? (
            <div style={{ paddingTop: 15 }}>
              <a
                href={props.transactionLink}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Tooltip title="This player is on the Long Term Injured Reserve.">
                  <Chip color="error" label="LTIR" clickable />
                </Tooltip>
              </a>
            </div>
          ) : (
            <div></div>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
