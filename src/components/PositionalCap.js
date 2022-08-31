import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography, Chip } from "@mui/material";
import Stack from "@mui/material/Stack";
import CountUp from "react-countup";

function nth(n) {
  return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

function PositionalCap(props) {
  const fRank = nth(props.fRank);
  const dRank = nth(props.dRank);
  const gRank = nth(props.gRank);

  return (
    <Grid container>
      <Grid item xs={4} p={2} pb={4}>
        <div>
          <Stack direction="row" spacing={1} pb={2}>
            {props.fRank === 1 ? (
              <Chip
                size="small"
                color="warning"
                variant="outlined"
                label={`${String(props.fRank).concat(fRank)} in the NHL`}
              />
            ) : (
              <Chip
                size="small"
                color="primary"
                variant="outlined"
                label={`${String(props.fRank).concat(fRank)} in the NHL`}
              />
            )}
          </Stack>
          <Typography variant="h5">
            <strong>
              <CountUp start={0} end={props.fPercentage} />%
            </strong>
          </Typography>
          <Typography variant="body1">of Cap Space allocated to</Typography>
          <Typography variant="h5">
            <strong>Forwards</strong>
          </Typography>
        </div>
      </Grid>
      <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
      <Grid item xs={4} p={2} pb={4}>
        <div>
          <Stack direction="row" spacing={1} pb={2}>
            {props.dRank === 1 ? (
              <Chip
                size="small"
                color="warning"
                variant="outlined"
                label={`${String(props.dRank).concat(fRank)} in the NHL`}
              />
            ) : (
              <Chip
                size="small"
                color="primary"
                variant="outlined"
                label={`${String(props.dRank).concat(dRank)} in the NHL`}
              />
            )}
          </Stack>
          <Typography variant="h5">
            <strong>
              <CountUp start={0} end={props.dPercentage} />%
            </strong>
          </Typography>
          <Typography variant="body1">of Cap Space allocated to</Typography>
          <Typography variant="h5">
            <strong>Defence</strong>
          </Typography>
        </div>
      </Grid>
      <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
      <Grid item xs={4} p={2} pb={4}>
        <div>
          <Stack direction="row" spacing={1} pb={2}>
            {props.gRank === 1 ? (
              <Chip
                size="small"
                color="warning"
                variant="outlined"
                label={`${String(props.gRank).concat(gRank)} in the NHL`}
              />
            ) : (
              <Chip
                size="small"
                color="primary"
                variant="outlined"
                label={`${String(props.gRank).concat(gRank)} in the NHL`}
              />
            )}
          </Stack>
          <Typography variant="h5">
            <strong>
              <CountUp start={0} end={props.gPercentage} />%
            </strong>
          </Typography>
          <Typography variant="body1">of Cap Space allocated to</Typography>
          <Typography variant="h5">
            <strong>Goalies</strong>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default PositionalCap;
