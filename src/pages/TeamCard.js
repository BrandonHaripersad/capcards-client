import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import CardBanner from "../components/CardBanner";
import PlayerCard from "../components/PlayerCard";
import CapInfo from "../components/CapInfo";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";

function TeamCard(props) {
  const { name } = useParams();

  const { loading, error, data } = useQuery(FETCH_TEAMS_QUERY, {
    variables: { name: name },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          {error ? (
            <h1>Error</h1>
          ) : loading ? (
            <h1>Loading...</h1>
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
            <h1>Loading...</h1>
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
        {loading ? (
          <h1>Loading...</h1>
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
        age
        capPercentage
        capHit
      }
      dateCreated
    }
  }
`;

export default TeamCard;
