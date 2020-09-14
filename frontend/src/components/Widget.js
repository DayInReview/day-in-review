import React, { Component } from 'react';
import './Widget.css';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    maxWidth: 345
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
    const { classes } = this.props;

    return (
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
    );
  }
}

export default withStyles(styles)(Widget);