import React from 'react';

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
      onClick={e => props.update(e, props.id)}
    >
      <ListItemText
        className={props.completed ? classes.completed : null}
        primary={props.task}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={e => props.delete(e, props.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
