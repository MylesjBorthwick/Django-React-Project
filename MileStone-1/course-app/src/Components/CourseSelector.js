import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";
import axios from "axios";

class CourseSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [
        { name: "One", id: 1 },
        { name: "Two", id: 2 },
        { name: "Three", id: 3 },
        { name: "Four", id: 4 },
      ],
    };
  }

  render() {
    let optionTemplate = this.state.values.map((v) => (
      <option value={v.id}>{v.name}</option>
    ));
    return (
      <div>
        <label>Select Course</label>
        <br></br>
        <select value={this.state.value} onChange={this.handleChange}>
          {optionTemplate}
        </select>
        
      </div>
    );
  }
}
export default CourseSelector;
