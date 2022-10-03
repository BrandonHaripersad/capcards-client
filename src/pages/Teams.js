import React from "react";
import { gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import teamNames from "../data/teams";
import Alert from "@mui/material/Alert";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Teams() {
  const { loading, data } = useQuery(FETCH_TEAMS_QUERY, {
    variables: { amount: 31 },
  });

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Alert severity="info">
            Select or search for a team and get a quick overview of there
            current salary cap situation. Information such as there top earning
            players, postional cap allocation and much more is currently
            avalible. <strong>More coming in the near future!</strong>
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            placeholder="Search for Team"
            variant="outlined"
            fullWidth
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </Grid>
        {teamNames
          .filter((team) => {
            if (searchTerm == "") {
              return team;
            } else if (
              team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              team.city.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return team;
            }
          })
          .map((team) => (
            <Grid item xs={6} md={4} lg={4}>
              <Link
                to={`/teams/${team.route}`}
                style={{ textDecoration: "none" }}
              >
                <Item
                  sx={{
                    backgroundColor: team.primary_colour,
                    borderBottom: `4px solid ${team.secondary_colour}`,
                  }}
                >
                  <Typography variant="h6" color="white">
                    {team.city} {team.name}
                  </Typography>
                </Item>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

const FETCH_TEAMS_QUERY = gql`
  query GetTeams($amount: Int) {
    getTeams(amount: $amount) {
      name
    }
  }
`;

export default Teams;
