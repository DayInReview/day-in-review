import React, { Component } from 'react';
import './Todo.css';

import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    cursor: 'pointer',
  },
});
class Todo extends Component {
  /**
   * Properties:
   * 
   * id: database id for todo item
   * completed: boolean to show if todo is completed
   * task: actual task text
   * 
   * delete: function to delete from database
   * update: function to update todo
   */
  render() {
    const { classes } = this.props;
    return (
      <ListItem
        className={classes.root}
        onClick={e => this.props.update(e, this.props.id)}
      >
        <ListItemText
          primary={this.props.task}
          secondary={this.props.completed ? 'Completed': 'Not completed'}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={e => this.props.delete(e, this.props.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styles)(Todo);
