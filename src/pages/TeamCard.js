import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import CardBanner from "../components/CardBanner";
import PlayerCard from "../components/PlayerCard";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { parse } from "graphql";

function TeamCard(props) {
  const { name } = useParams();

  const { loading, error, data } = useQuery(FETCH_TEAMS_QUERY, {
    variables: { name: name },
  });

  if (data) {
    console.log(data);
  }

  const players = [...data.getTeambyName[0].players];

  players.sort((a, b) => parseFloat(b.capHit) - parseFloat(a.capHit));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {error ? (
            <h1>Error</h1>
          ) : loading ? (
            <h1>Loading...</h1>
          ) : (
            <CardBanner
              teamname={data.getTeambyName[0].name}
              dateCreated={data.getTeambyName[0].dateCreated}
            />
          )}
        </Grid>
        {players.slice(0, 2).map((player) => (
          <Grid item xs={12} md={4} lg={4}>
            <PlayerCard
              name={player.name}
              position={player.position}
              age={player.age}
              caphit={player.capHit}
              yearsRemaining={player.yearsRemaining}
              capPercentage={player.capPercentage}
              clauses={player.clauses}
            />
          </Grid>
        ))}
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
