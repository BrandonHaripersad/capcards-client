import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import CardBanner from "../components/CardBanner";
import PlayerCard from "../components/PlayerCard";
import CapInfo from "../components/CapInfo";
import PositionalCap from "../components/PositionalCap";
import PlayerTable from "../components/PlayerTable";
import { Box } from "@mui/system";
import { Grid, Typography, Avatar, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import PlayerDisplay from "../components/PlayerDisplay";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function TeamCard(props) {
  const { name } = useParams();

  const { loading, error, data } = useQuery(FETCH_TEAMS_QUERY, {
    variables: { name: name },
  });

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          {error ? (
            <h1>Error</h1>
          ) : loading ? (
            <Skeleton />
          ) : (
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                height: 150,
                justifyContent: "center",
                verticalAlign: "middle",
              }}
            >
              <CardBanner
                teamname={data.getTeambyName[0].name}
                dateCreated={data.getTeambyName[0].dateCreated}
              />
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          {error ? (
            <h1>Error</h1>
          ) : loading ? (
            <Skeleton />
          ) : (
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                height: 150,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <CapInfo
                teamname={data.getTeambyName[0].name}
                projCapHit={data.getTeambyName[0].projCapHit}
                projLTIR={data.getTeambyName[0].projLTIRUsed}
              />
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography color="text.primary" variant="h5">
            Largest Cap Hits
          </Typography>
        </Grid>
        {loading ? (
          <Grid item xs={12} md={12} lg={12}>
            <Skeleton />
          </Grid>
        ) : (
          data.getTeambyName[0].players.slice(0, 3).map((player) => (
            <Grid item xs={12} md={4} lg={4}>
              <PlayerCard
                name={player.name}
                teamName={data.getTeambyName[0].name}
                position={player.position}
                age={player.age}
                caphit={player.capHit}
                yearsRemaining={player.yearsRemaining}
                capPercentage={player.capPercentage}
                clauses={player.clauses}
                status={player.status}
                injury={player.injury}
                link={player.link}
                transactionLink={player.transactionLink}
              />
            </Grid>
          ))
        )}
        <Grid item xs={12} md={12} lg={12}>
          <Typography color="text.primary" variant="h5">
            Cap Allocation
          </Typography>
        </Grid>
        {loading ? (
          <Grid item xs={12}>
            <Skeleton />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Paper
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <PositionalCap
                teamName={data.getTeambyName[0].name}
                fPercentage={data.getTeambyName[0].positionalCap[0].percentage}
                fRank={data.getTeambyName[0].positionalCap[0].rank}
                dPercentage={data.getTeambyName[0].positionalCap[1].percentage}
                dRank={data.getTeambyName[0].positionalCap[1].rank}
                gPercentage={data.getTeambyName[0].positionalCap[2].percentage}
                gRank={data.getTeambyName[0].positionalCap[2].rank}
              />
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} md={12} lg={12}>
          <Typography color="text.primary" variant="h5" gutterBottom>
            Roster
          </Typography>
          <Alert severity="info">
            Search for players by <strong>Name</strong>, by{" "}
            <strong>Acquisition Method</strong> (i.e Draft, Trade or Signed) or
            by <strong>Injury Status</strong> (i.e LTIR or IR) Click the{" "}
            <strong>Arrow</strong> next to the players name to see more
            information.
          </Alert>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            type="text"
            placeholder="Search for player"
            variant="outlined"
            fullWidth
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </Grid>
        {loading ? (
          <Grid item xs={12} md={12} lg={12}>
            <Skeleton />
          </Grid>
        ) : (
          data.getTeambyName[0].players
            .filter((player) => {
              if (searchTerm == "") {
                return player;
              } else if (
                player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.status
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                player.injury.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return player;
              }
            })
            .map((player) => (
              <Grid item xs={6} md={4} lg={4}>
                <PlayerDisplay
                  name={player.name}
                  teamName={data.getTeambyName[0].name}
                  position={player.position}
                  age={player.age}
                  caphit={player.capHit}
                  yearsRemaining={player.yearsRemaining}
                  capPercentage={player.capPercentage}
                  clauses={player.clauses}
                  status={player.status}
                  injury={player.injury}
                  link={player.link}
                  transactionLink={player.transactionLink}
                />
              </Grid>
            ))
        )}
      </Grid>
    </Box>
  );
}

const FETCH_TEAMS_QUERY = gql`
  query GetTeambyName($name: String) {
    getTeambyName(name: $name) {
      name
      projCapHit
      projLTIRUsed
      projCapSpace
      positionalCap {
        position
        percentage
        rank
      }
      players {
        name
        position
        yearsRemaining
        clauses
        status
        injury
        age
        capPercentage
        capHit
        link
        transactionLink
      }
      dateCreated
    }
  }
`;

export default TeamCard;
