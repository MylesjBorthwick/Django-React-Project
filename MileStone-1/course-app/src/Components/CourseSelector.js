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

  handleChange = (e) => {
    console.log(e.target.value)
  };

  render() {
    let optionTemplate = this.state.values.map((v) => (
      <option value={v.name}>{v.name}</option>
    ));
    return (
      <div>
        <h1 className= 'title is-3'>Select Course</h1>
        <select value={this.state.value} onChange={this.handleChange} >
          {optionTemplate}
        </select>
        
      </div>
    );
  }
}
export default CourseSelector;
