import React, { Component } from 'react';
import './Todo.css';

import ListItem from '@material-ui/core/ListItem';

export default class Todo extends Component {
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
    return (
      <ListItem
        as="li"
        onClick={e => this.props.update(e, this.props.id)}
        className={"todo " + (this.props.completed ? "completed" : "")}
      >
        {this.props.task}
      </ListItem>
    );
  }
}
