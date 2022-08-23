import React from "react";
import { gql, useQuery } from "@apollo/client";

function Teams() {
  const { loading, data } = useQuery(FETCH_TEAMS_QUERY, {
    variables: { amount: 31 },
  });

  if (data) {
    console.log(data);
  }
  return (
    <div>
      <h1>Hello</h1>
    </div>
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
