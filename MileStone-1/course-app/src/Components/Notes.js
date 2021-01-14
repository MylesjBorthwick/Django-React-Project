import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";

class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      notes: "",
    };
  }

  handleClick = () => {
    console.log(this.state);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
        <div class="columns is-mobile is-centered">
        <div class="column is-half">
      <div>
          <div className="control">
            <textarea
              class="textarea is-info"
              placeholder="Enter notes about additional pass-requirements, sickness exemptions, or grade conversion scale (below)"
              rows="6"
              name="notes"
              value={this.state.notes}
              onChange={this.handleChange}
            ></textarea>
          </div>
      
        <button
          onClick={this.handleClick}
          className="button is-warning is-rounded is-medium"
        >
          Update Form
        </button>
      </div>
      </div>
      </div>
    );
  }
}
export default Notes;
