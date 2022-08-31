import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import CardBanner from "../components/CardBanner";
import PlayerCard from "../components/PlayerCard";
import CapInfo from "../components/CapInfo";
import PositionalCap from "../components/PositionalCap";
import PlayerTable from "../components/PlayerTable";
import { Box } from "@mui/system";
import { Grid, Typography, Avatar } from "@mui/material";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

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
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
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
        <Grid item xs={12} md={12} lg={12}>
          <Typography color="text.primary" variant="h5">
            Cap Allocation
          </Typography>
        </Grid>
        {loading ? (
          <Skeleton />
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
        <Grid item xs={12}>
          {loading ? (
            <Skeleton />
          ) : (
            <PlayerTable players={data.getTeambyName[0].players} />
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
