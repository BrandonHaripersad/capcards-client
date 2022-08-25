import React from "react";
import { gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const team_names = [
  {
    name: "Ducks",
    city: "Anaheim",
  },
  {
    name: "Coyotes",
    city: "Arizona",
  },
  {
    name: "Flames",
    city: "Calgary",
  },
  {
    name: "Golden Knights",
    city: "Vegas",
  },
  {
    name: "Kraken",
    city: "Seattle",
  },
  {
    name: "Oilers",
    city: "Edmonton",
  },
  {
    name: "Kings",
    city: "Los Angeles",
  },
  {
    name: "Sharks",
    city: "San Jose",
  },
  {
    name: "Canucks",
    city: "Vancouver",
  },
  {
    name: "Blackhawks",
    city: "Chicago",
  },
  {
    name: "Avalanche",
    city: "Colorado",
  },
  {
    name: "Stars",
    city: "Dallas",
  },
  {
    name: "Wild",
    city: "Minnesota",
  },
  {
    name: "Predators",
    city: "Nashville",
  },
  {
    name: "Blues",
    city: "St. Louis",
  },
  {
    name: "Jets",
    city: "Winnipeg",
  },
  {
    name: "Bruins",
    city: "Boston",
  },
  {
    name: "Sabres",
    city: "Buffalo",
  },
  {
    name: "Red Wings",
    city: "Detroit",
  },
  {
    name: "Panthers",
    city: "Florida",
  },
  {
    name: "Canadiens",
    city: "Montréal",
  },
  {
    name: "Senators",
    city: "Ottawa",
  },
  {
    name: "Lightning",
    city: "Tampa Bay",
  },
  {
    name: "Leafs",
    city: "Toronto",
  },
];

function Teams() {
  const { loading, data } = useQuery(FETCH_TEAMS_QUERY, {
    variables: { amount: 31 },
  });

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
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
        {team_names
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
            <Grid item xs={4}>
              <Link
                to={`/teams/${team.name}`}
                style={{ textDecoration: "none" }}
              >
                <Item>
                  <Typography>
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
