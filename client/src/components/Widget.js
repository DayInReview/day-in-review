import React from 'react';
import './Widget.scss';
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
    margin: '0.4rem',
    borderRadius: '10px',
    textAlign: 'center'
  },
  media: {
    height: '20vh'
  },
  content: {
    height: '12vh',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column'
  },
});

export default function Widget(props) {
  const pageLinks = {
    "todo": "/todo",
    "email": "/email",
    "summarizer": "/summarizer"
  };
  const cardSize = {
    "xs": 12,
    "sm": 6,
    "md": 4
  };
  const classes = useStyles(props);

  return (
    <Grid item xs={cardSize["xs"]} sm={cardSize["sm"]} md={cardSize["md"]}>
      <Card className={classes.root}>
        <CardActionArea onClick={() => { window.location.assign(pageLinks[props.widget]) }}>
          <CardMedia id="card-media" className={classes.media}>
            {props.icon}
          </CardMedia>
          <CardContent className={classes.content}>
            <Typography variant="h3">
              {props.name}
            </Typography>
            <Typography variant="h5">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
