import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";
import axios from "axios";

class CourseSelector extends React.Component {
  constructor(props) {
    super(props);
    var API_URL = "http://localhost:8000/api/master_update/";

    this.state = {
      values: [
          {
      id: 1,
      num: '',
      course_name: "",
      description: "",
      hours: "",
      credit: "",
      link: "",
      course_outline_id:101,
    }
      ],
    };

      axios
      .get(API_URL)
      .then(res => this.setState({ values: res.data }))
      .catch(err => console.log(err));   

  }

  

  handleChange = (e) => {
    console.log(e.target.value)
  };

  render() {
    let optionTemplate = this.state.values.map((v) => (
      <option value={v.course_name}>{v.course_name}</option>
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
