import React from "react";
import { CardContent, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

function calculateCap(cap) {
  const res = 82500000 - cap;
  return res;
}

function CapInfo(props) {
  const capHit = calculateCap(props.projCapHit);
  return (
    <React.Fragment>
      {capHit > 0 ? (
        <div>
          <React.Fragment>
            <Typography variant="body1" component="h1" align="center">
              The {props.teamname} have
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
            The {props.teamname} are
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
          with ${props.projLTIR} in Projected LTIR Used
        </Typography>
      </div>
    </React.Fragment>
  );
}

export default CapInfo;
