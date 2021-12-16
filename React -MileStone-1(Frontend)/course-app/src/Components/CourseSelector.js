import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";
import axios from "axios";

class CourseSelector extends React.Component {
  constructor(props) {
    super(props);
    var API_URL = "http://localhost:8000/api/master_update/";

    this.state = {
      filterText : '',
      values: [
          {
      id: 1,
      num: '',
      course_outline_id:101,
      course_name: "",
      description: "",
      hours: "",
      credit: "",
      link: "",
    }
      ],
    };

      axios
      .get(API_URL)
      .then(res => this.setState({ values: res.data }))
      .catch(err => console.log(err));   

  }

  

  handleChange = (e) => {
    console.log(this.state.values); //for some reason id and course_id are always the same

    var index = 0;
    var arrayLength = this.state.values.length;
    for (var i = 0; i < arrayLength; i++) {
      if(this.state.values[i].course_name == e.target.value){
        index = i;
      }
    }

    //None of this works, course_outline_id is fine in the backend, but id is equal to it here for some reason
    //this function call doesn't work, the +1 is being completely ignored for some reason. 

    console.log(1+this.state.values[index].course_outline_id);

    axios
    .get(`http://localhost:8000/api/master_update/${this.state.values[index].id}`) //because id is wrong, this call doesn't work
    .catch(err => console.log(err)); 

    window.location.reload();  
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
