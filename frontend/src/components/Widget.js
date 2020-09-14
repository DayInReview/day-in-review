import React, { Component } from 'react';
import './Widget.css';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
  },
  media: {
    height: 140
  }
});

class Widget extends Component {
  render() {
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
    const { classes } = this.props;

    return (
      <Grid item xs={cardSize[this.props.size]["xs"]} sm={cardSize[this.props.size]["sm"]} md={cardSize[this.props.size]["md"]}>
        <Card className={classes.root}>
          <CardActionArea onClick={() => {window.location.assign(pageLinks[this.props.widget])}}>
            <CardMedia
              className={classes.media}
            />
            <CardContent>
              <Typography variant="h5">
                {this.props.name}
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
}

export default withStyles(styles)(Widget);