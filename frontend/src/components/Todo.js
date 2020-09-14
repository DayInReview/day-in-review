import React, { Component } from 'react';
import './Todo.css';

import ListGroupItem from 'react-bootstrap/ListGroupItem';

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
      <ListGroupItem>
        {this.props.task}
      </ListGroupItem>
    );
  }
}
