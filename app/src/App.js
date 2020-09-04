import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Widget from './Widget';

class App extends Component {
  render() {
    // Create widgets
    const widgets = [];
    for (let i = 0; i < 6; i++) {
      widgets.push(<Widget name="Small Widget" size="small" />)
    }
    for (let i = 0; i < 4; i++) {
      widgets.push(<Widget name="Medium Widget" size="medium" />)
    }
    for (let i = 0; i < 2; i++) {
      widgets.push(<Widget name="Large Widget" size="large" />)
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Day In Review</h2>
        </div>
        {/* Main Body */}
        <div className="container-fluid App-body">
          {/* Top Row */}
          <div className="row">
            {widgets}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
