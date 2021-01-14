import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";
import axios from "axios";

class Notes extends React.Component {
  constructor(props) {
    super(props);
    var API_URL = "http://localhost:8000/api/notes/";

    this.state = {
      id: 1,
      note: "",
      course_outline_id:101,
    };
    axios
    .get(API_URL)
    .then(res => {
        this.setState(res.data[0]);  
      })
    .catch(err => console.log(err));   

  }

  handleClick = () => {
    console.log(this.state);
    var API_URL = "http://localhost:8000/api/notes/";
    axios.post(API_URL, this.state).then((response) => {
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
      axios.put(`http://localhost:8000/api/notes/${this.state.id}`, this.state).then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      }, (error) => {
        console.log(error.request);
        console.log(error);
      });

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
              value={this.state.note}
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
