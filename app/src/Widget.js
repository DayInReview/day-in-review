import React, { Component } from 'react';
import './Widget.css';

class Widget extends Component {
  render() {
    const sizeClasses = {
      "small": "col-xl-3 col-lg-3 col-sm-6 col-12",
      "medium": "col-xl-4 col-lg-4 col-sm-6 col-12",
      "large": "col-xl-6 col-lg-6 col-sm-12 col-12"
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
