import React from 'react';
import './Widget.css';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
  },
  media: {
    height: 140
  }
});

export default function Widget(props) {
  const pageLinks = {
    "todo": "/todo",
  };
  const cardSize = {
    "small": {
      "xs": 12,
      "sm": 6,
      "md": 3
    },
    "medium": {
      "xs": 12,
      "sm": 6,
      "md": 6
    },
    "large": {
      "xs": 12,
      "sm": 12,
      "md": 12
    }
  };
  const classes = useStyles(props);

  return (
    <Grid item xs={cardSize[props.size]["xs"]} sm={cardSize[props.size]["sm"]} md={cardSize[props.size]["md"]}>
      <Card className={classes.root}>
        <CardActionArea onClick={() => {window.location.assign(pageLinks[props.widget])}}>
          <CardMedia
            className={classes.media}
          />
          <CardContent>
            <Typography variant="h5">
              {props.name}
            </Typography>
            <Typography>
              Filler text here for now
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
