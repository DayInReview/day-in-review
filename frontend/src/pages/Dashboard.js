import React, { Component } from 'react';
import './Dashboard.css';
import Widget from '../components/Widget'


export default class Dashboard extends Component {
  render() {
    // Create widgets
    const widgets = [];
    for (let i = 0; i < 6; i++) {
      widgets.push(<Widget name="Small Widget" widget="todo" />)
    }
    for (let i = 0; i < 4; i++) {
      widgets.push(<Widget name="Medium Widget" />)
    }
    for (let i = 0; i < 2; i++) {
      widgets.push(<Widget name="Large Widget" />)
    }

    return (
      // Row of Widgets
      <div className="row">
        {widgets}
      </div>
    );
  }
}
