import React from "react";
import { CardContent, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import teamNames from "../data/teams";

function calculateCap(cap) {
  const res = 82500000 - cap;
  return res;
}

function getTeamName(name) {
  const index = teamNames.map((e) => e.route).indexOf(name);
  const res = teamNames[index].name;
  return res;
}

function CapInfo(props) {
  const capHit = calculateCap(props.projCapHit);
  const teamName = getTeamName(props.teamname);
  return (
    <React.Fragment>
      {capHit > 0 ? (
        <div>
          <React.Fragment>
            <Typography variant="body1" component="h1" align="center">
              The {teamName} have
            </Typography>
            <Typography variant="h6" align="center" color="green">
              ${capHit.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
            </Typography>
            <Typography variant="body1" align="center">
              in cap space.
            </Typography>
          </React.Fragment>
        </div>
      ) : (
        <React.Fragment>
          <Typography variant="body1" component="h1" align="center">
            The {teamName} are
          </Typography>
          <Typography variant="h6" align="center" color="red">
            $
            {Math.abs(capHit).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
          </Typography>
          <Typography variant="body1" align="center">
            over the cap.
          </Typography>
        </React.Fragment>
      )}
      <div>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          align="center"
          pt={1}
        >
          with $
          {props.projLTIR.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          in LTIR space used.
        </Typography>
      </div>
    </React.Fragment>
  );
}

export default CapInfo;
