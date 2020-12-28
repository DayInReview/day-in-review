import React from 'react';
import './Todo.css';

import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
  },
  completed: {
    textDecoration: 'line-through',
  }
});

export default function Todo(props) {
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
  const classes = useStyles(props);
  return (
    <ListItem
      button
      className={classes.root}
      onClick={e => this.props.update(e, this.props.id)}
    >
      <ListItemText
        className={this.props.completed ? classes.completed : null}
        primary={this.props.task}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={e => this.props.delete(e, this.props.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
