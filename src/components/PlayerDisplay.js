import React from "react";
import Card from "@mui/material/Card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Chip,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import teamNames from "../data/teams";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ReceiptIcon from "@mui/icons-material/Receipt";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import PercentIcon from "@mui/icons-material/Percent";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import PaidIcon from "@mui/icons-material/Paid";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function stringToColor(string) {
  const index = teamNames.map((e) => e.route).indexOf(string);
  return teamNames[index].primary_colour;
}

function stringAvatar(name, teamname) {
  if (name === null) {
    return "";
  } else {
    return {
      sx: {
        bgcolor: stringToColor(teamname),
        width: 50,
        height: 50,
      },
      children: `${name.split(" ")[1][0]}${name.split(" ")[0][0]}`,
    };
  }
}

function formatName(name) {
  if (name === null) {
    return "";
  } else {
    return name.split(" ");
  }
}

function yearsRemaining(yr, option) {
  if (yr === null) {
    return "";
  } else {
    var res = yr.split(" ");
    if (option === "year") {
      return res[0];
    } else {
      return res[1];
    }
  }
}

function PlayerDisplay(props) {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formattedName = formatName(props.name);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar {...stringAvatar(props.name, props.teamName)} />}
        title={`${formattedName[1]} ${formattedName[0].slice(0, -1)}`}
        subheader={`${props.position} | ${props.age} years old`}
        sx={{ paddingBottom: 0 }}
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
      />
      <CardContent>
        <Typography align="center">
          <Tooltip title="2022-23 Cap Hit">
            <Chip
              color="success"
              variant="outlined"
              icon={<PaidIcon />}
              label={`${props.caphit.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}`}
            />
          </Tooltip>
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PaidIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Cap Hit"
              secondary={`${props.caphit.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ReceiptIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Contract"
              secondary={`${props.yearsRemaining}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PercentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Cap Percentage"
              secondary={`${props.capPercentage}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonAddAlt1Icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Method Aquired"
              secondary={`${props.status}`}
            />
          </ListItem>
          <Divider variant="middle" />
          <ListItem>
            <Stack direction="row" spacing={1}>
              {props.clauses === "NMC" ? (
                <div style={{ paddingTop: 5 }}>
                  <Tooltip title="No Movement Clause">
                    <Chip color="error" label="NMC" />
                  </Tooltip>
                </div>
              ) : props.clauses === "M-NTC" ? (
                <div style={{ paddingTop: 5 }}>
                  <Tooltip title="Modified No Movement Clause">
                    <Chip color="warning" label="M-NTC" />
                  </Tooltip>
                </div>
              ) : props.clauses === "35+NMC" ? (
                <div style={{ paddingTop: 5 }}>
                  <Tooltip title="35+ No Movement Clause">
                    <Chip color="error" label="35+ NMC" />
                  </Tooltip>
                </div>
              ) : (
                <div></div>
              )}
            </Stack>
          </ListItem>
        </List>
      </Collapse>
    </Card>
  );
}

export default PlayerDisplay;
