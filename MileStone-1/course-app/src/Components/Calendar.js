import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      num: "",
      courseName: "",
      descript: "",
      hours: "",
      cred: "",
      link: "",
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
            name="courseName"
            value={this.state.courseName}
            onChange={this.handleChange}
          />
        </div>

        <div class="field">
          <textarea
            class="textarea is-info"
            placeholder="Enter Course Description"
            rows="4"
            name="descript"
            value={this.state.descript}
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
              name="cred"
              value={this.state.cred}
              placeholder="Academic Credit"
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
