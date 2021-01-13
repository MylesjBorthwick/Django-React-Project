import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";
import { v4 as uuidv4 } from "uuid";

class CourseObjectives extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.courseObjectives = [
      {
        id: 1,
        publicID: 1,
        name: "",
      },
      {
        id: 2,
        publicID: 2,
        name: "",
      },
    ];
  }
  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }
  handleRowDel(courseObjective) {
    var index = this.state.courseObjectives.indexOf(courseObjective);
    this.state.courseObjectives.splice(index, 1);
    this.setState(this.state.courseObjectives);
  }

  handleAddEvent(evt) {
    var id = uuidv4();
    var courseObjective = {
      id: id,
      name: "",
      publicID: 1 + this.state.courseObjectives.length,
    };
    this.state.courseObjectives.push(courseObjective);
    this.setState(this.state.courseObjectives);
  }

  handleSend(evt) {
    console.log(this.state.courseObjectives);
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
