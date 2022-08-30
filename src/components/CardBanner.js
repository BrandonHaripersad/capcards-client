import React from "react";
import Box from "@mui/material/Box";
import { CardContent, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Moment from "react-moment";

function CardBanner(props) {
  return (
    <Card sx={{ display: "flex", alignItems: "center" }} elevation="0">
      <CardMedia
        component="img"
        sx={{ width: 85, padding: 1, paddingLeft: 3 }}
        image={`/images/teams/${props.teamname}.png`}
        alt={props.teamname}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography bolded variant="h4" component="h1" pl={1}>
            {props.teamname}
          </Typography>
          <Typography bolded variant="subtitle1" pl={1}>
            as of:
            <Moment format=" MMMM DD, YYYY">{props.dateCreated}</Moment>
          </Typography>
          <Typography bolded variant="subtitle2" color="text.secondary" pl={1}>
            information via{" "}
            <a href="https://www.capfriendly.com/">CapFriendly</a>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default CardBanner;
