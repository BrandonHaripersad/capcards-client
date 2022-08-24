import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import CardBanner from "../components/CardBanner";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

function TeamCard(props) {
  const { name } = useParams();

  const { loading, error, data } = useQuery(FETCH_TEAMS_QUERY, {
    variables: { name: name },
  });

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
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
