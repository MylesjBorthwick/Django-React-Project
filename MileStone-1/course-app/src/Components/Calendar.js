import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";
import axios from "axios";

async function update_Django_backend(state) {
  var API_URL = "http://localhost:8000/api/calendar_information/";
  axios.post(API_URL, state).then((response) => {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    }, (error) => {
      console.log(error.request);
      console.log(error);
    });
    
    //may somehow get away with doing it without duplicates
    axios.put(`http://localhost:8000/api/calendar_information/${state.id}`, state).then((response) => {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    }, (error) => {
      console.log(error.request);
      console.log(error);
    });
}

async function update_Django(state) {
  const response = await update_Django_backend(state);
  return response;
}


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    var API_URL = "http://localhost:8000/api/calendar_information/";

    this.state = {
      id: 1,
      num: '',
      course_name: "",
      description: "",
      hours: "",
      credit: "",
      link: "",
      course_outline_id:101,
    };
    axios
    .get(API_URL)
    .then(res => {
        this.setState(res.data[0]);  
      })
    .catch(err => console.log(err));   

  }

  componentDidUpdate(prevProps){
    if(this.props.isClicked !== prevProps.isClicked){
       this.setState({
       id: 1,
       num: '',
       course_name: "",
       description: "",
       hours: "",
       credit: "",
       link: "",
       course_outline_id:101,

     });
    //  console.log(update_Django(this.state));

    }    
   }

  handleClick = () => {
    console.log(this.state);
    console.log(update_Django(this.state));

  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div class="field has-addons">
          <div class="control">
            <textarea
              class="textarea is-info"
              placeholder="Enter Course Number"
              rows="1"
              name="num"
              value={this.state.num}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div class="field">
          <textarea
            class="textarea is-info"
            placeholder="Enter Course Name"
            rows="1"
            name="course_name"
            value={this.state.course_name}
            onChange={this.handleChange}
          />
        </div>

        <div class="field">
          <textarea
            class="textarea is-info"
            placeholder="Enter Course descriptionion"
            rows="4"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div class="field has-addons">
          <div class="control">
            <input
              class="input is-primary"
              type="text"
              placeholder="Course Hours"
              name="hours"
              value={this.state.hours}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div class="field has-addons">
          <div class="control">
            <input
              class="input is-primary"
              type="text"
              name="credit"
              value={this.state.credit}
              placeholder="Academic credit"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div class="field has-addons">
          <div class="control">
            <input
              class="input is-primary"
              type="text"
              placeholder="Calendar Link"
              name="link"
              value={this.state.link}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button
          onClick={this.handleClick}
          className="button is-warning is-rounded is-medium"
        >
          Update Form
        </button>
      </div>
    );
  }
}
export default Calendar;
