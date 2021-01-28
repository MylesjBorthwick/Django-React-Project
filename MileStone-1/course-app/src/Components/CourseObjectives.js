import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";
import axios from "axios";

async function update_Django_backend(state) {
  var API_URL = "http://localhost:8000/api/course_objectives/";

  var arrayLength = state.courseObjectives.length;
  for (var i = 0; i < arrayLength; i++) {
    
    axios.post(API_URL, state.courseObjectives[i]).then((response) => {
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
    axios.put(`http://localhost:8000/api/course_objectives/${state.courseObjectives[i].id}`, state.courseObjectives[i]).then((response) => {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    }, (error) => {
      console.log(error.request);
      console.log(error);
    });
}}

async function update_Django(state) {
  const response = await update_Django_backend(state);
  return response;
}


class CourseObjectives extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText : "",
      courseObjectives : [
        {
          id: 1,
          publicID: 1,
          course_outline_id: 1,
          name: "",
        },
        {
          id: 2,
          publicID: 2,
          course_outline_id: 1,
          name: "",
        },
      ],
    };

    var API_URL = "http://localhost:8000/api/course_objectives/";
    axios
    .get(API_URL)
    .then(res => this.setState({ courseObjectives: res.data }))
    .catch(err => console.log(err));
  }


  componentDidUpdate(prevProps){
    if(this.props.isClicked !== prevProps.isClicked || this.state.courseObjectives.length< 1){
       this.setState({
        filterText : '',
        courseObjectives:[
          {
          id: 1,
          publicID: 1,
          course_outline_id: 1,
          name: "",
          }
        ]
     });
     console.log(update_Django(this.state));
    }
  }


  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }
  handleRowDel(courseObjective) {
    if(this.state.courseObjectives.length< 2){
      var temp_state = this.state.courseObjectives;
      temp_state[0].publicID = 1;
      temp_state[0].name= '';
      this.setState(temp_state);
    }
    else{
      var index = this.state.courseObjectives.indexOf(courseObjective);
      axios.delete(`http://localhost:8000/api/course_objectives/${this.state.courseObjectives[index].id}`).then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      }, (error) => {
        console.log(error.request);
        console.log(error);
      });
      this.state.courseObjectives.splice(index, 1);
  
      var temp_states = this.state.courseObjectives;
      var arrayLength = temp_states.length;
      var id_start = this.state.courseObjectives[0].course_outline_id;
      for (var i = 0; i < arrayLength; i++) {
        temp_states[i].id =i+1+ id_start;
        temp_states[i].publicID = i+1;
      }
      this.setState(temp_states);
    }
  }

  handleAddEvent(evt) {
    var id = 1+this.state.courseObjectives[this.state.courseObjectives.length-1].id;
    var courseObjective = {
      id: id,
      name: "",
      course_outline_id: this.state.courseObjectives[0].course_outline_id,
      publicID: 1 + this.state.courseObjectives.length,
    };
    this.state.courseObjectives.push(courseObjective);
    this.setState(this.state.courseObjectives);
  }

  handleSend(evt) {
    console.log(this.state.courseObjectives);
    console.log(update_Django(this.state));
  }

  handleCourseObjectivesTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var courseObjectives = this.state.courseObjectives.slice();
    var newCourseObjectives = courseObjectives.map(function (courseObjective) {
      for (var key in courseObjective) {
        if (key == item.name && courseObjective.id == item.id) {
          courseObjective[key] = item.value;
        }
      }
      return courseObjective;
    });
    this.setState({ courseObjectives: newCourseObjectives });
    //  console.log(this.state.courseObjectives);
  }
  render() {
    return (
      <div>
        <CourseObjectivesTable
          onCourseObjectivesTableUpdate={this.handleCourseObjectivesTable.bind(
            this
          )}
          onCourseObjectivesRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          courseObjectives={this.state.courseObjectives}
          filterText={this.state.filterText}
        />
        <button
          className="button is-rounded is-warning is-medium"
          onClick={this.handleSend.bind(this)}
        >
          Update Form
        </button>
      </div>
    );
  }
}

class CourseObjectivesTable extends React.Component {
  render() {
    var onCourseObjectivesTableUpdate = this.props
      .onCourseObjectivesTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var courseObjective = this.props.courseObjectives.map(function (
      courseObjective
    ) {
      if (courseObjective.name.indexOf(filterText) === -1) {
        return;
      }
      return (
        <CourseObjectivesRow
          onCourseObjectivesTableUpdate={onCourseObjectivesTableUpdate}
          courseObjective={courseObjective}
          onDelEvent={rowDel.bind(this)}
          key={courseObjective.id}
        />
      );
    });
    return (
      <div className="columns is-max-desktop is-centered">
        <div>
          <table className="table is-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>{courseObjective}</tbody>
          </table>
          <button
            onClick={this.props.onCourseObjectivesRowAdd}
            className="button is-primary is-rounded"
          >
            Add New Row
          </button>
        </div>
      </div>
    );
  }
}

class CourseObjectivesRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.courseObjective);
  }
  render() {
    return (
      <tr>
        <CourseObjectivesEditableCellNumbers
          onCourseObjectivesTableUpdate={
            this.props.onCourseObjectivesTableUpdate
          }
          cellData={{
            type: "publicID",
            value: this.props.courseObjective.publicID,
            id: this.props.courseObjective.id,
          }}
        />
        <CourseObjectivesEditableCell
          onCourseObjectivesTableUpdate={
            this.props.onCourseObjectivesTableUpdate
          }
          cellData={{
            type: "name",
            value: this.props.courseObjective.name,
            id: this.props.courseObjective.id,
          }}
        />
         <td className="del-cell">
        <button
          onClick={this.onDelEvent.bind(this)}
          className="button is-danger is-rounded"
        >
          Remove
        </button>
        </td>
      </tr>
    );
  }
}
class CourseObjectivesEditableCell extends React.Component {
  render() {
    return (
      <td>
        <textarea
          class="textarea is-info is-fullwidth is-large"
          rows="2"
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          onChange={this.props.onCourseObjectivesTableUpdate}
        />
      </td>
    );
  }
}

class CourseObjectivesEditableCellNumbers extends React.Component {
  render() {
    return (
  
      <td>
        <input
          type="number"
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          onChange={this.props.onCourseObjectivesTableUpdate}
        />
      </td>
    );
  }
}

export default CourseObjectives;

/*
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
