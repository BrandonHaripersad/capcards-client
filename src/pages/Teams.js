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
    route: "ducks",
  },
  {
    name: "Coyotes",
    city: "Arizona",
    route: "coyotes",
  },
  {
    name: "Flames",
    city: "Calgary",
    route: "flames",
  },
  {
    name: "Golden Knights",
    city: "Vegas",
    route: "goldenknights",
  },
  {
    name: "Kraken",
    city: "Seattle",
    route: "kraken",
  },
  {
    name: "Oilers",
    city: "Edmonton",
    route: "oilers",
  },
  {
    name: "Kings",
    city: "Los Angeles",
    route: "kings",
  },
  {
    name: "Sharks",
    city: "San Jose",
    route: "sharks",
  },
  {
    name: "Canucks",
    city: "Vancouver",
    route: "canucks",
  },
  {
    name: "Blackhawks",
    city: "Chicago",
    route: "blackhawks",
  },
  {
    name: "Avalanche",
    city: "Colorado",
    route: "avalanche",
  },
  {
    name: "Stars",
    city: "Dallas",
    route: "stars",
  },
  {
    name: "Wild",
    city: "Minnesota",
    route: "wild",
  },
  {
    name: "Predators",
    city: "Nashville",
    route: "predators",
  },
  {
    name: "Blues",
    city: "St. Louis",
    route: "blues",
  },
  {
    name: "Jets",
    city: "Winnipeg",
    route: "jets",
  },
  {
    name: "Bruins",
    city: "Boston",
    route: "bruins",
  },
  {
    name: "Sabres",
    city: "Buffalo",
    route: "sabres",
  },
  {
    name: "Red Wings",
    city: "Detroit",
    route: "redwings",
  },
  {
    name: "Panthers",
    city: "Florida",
    route: "panthers",
  },
  {
    name: "Canadiens",
    city: "Montréal",
    route: "canadiens",
  },
  {
    name: "Senators",
    city: "Ottawa",
    route: "senators",
  },
  {
    name: "Lightning",
    city: "Tampa Bay",
    route: "lightning",
  },
  {
    name: "Maple Leafs",
    city: "Toronto",
    route: "mapleleafs",
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
                to={`/teams/${team.route}`}
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
