import React, { Component } from 'react';
import './Widget.css';

class Widget extends Component {
  render() {
    const sizeClasses = {
      "small": "col-lg-3 col-sm-6",
      "medium": "col-lg-4 col-sm-8",
      "large": "col-lg-6 col-sm-12"
    };

    return (
      <div className={sizeClasses[this.props.size]}>
        <div className="card mt-2">
          <div className="card-heading">
            <h3>{this.props.name}</h3>
          </div>
          <div className="card-value">
            Placeholder text here
          </div> 
        </div>
      </div>
    );
  }
}

export default Widget;
