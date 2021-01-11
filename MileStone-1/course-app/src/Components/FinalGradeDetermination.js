import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import "./Components.css";
import { v4 as uuidv4 } from "uuid";

class FinalGradeDeterminations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: "",
      finalGrades: [
        {
          id: 1,
          weight: "",
          finalGrade: "",
          name: "",
        },
      ],
    };
  }
  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }
  handleRowDel(finalGrade) {
    var index = this.state.finalGrades.indexOf(finalGrade);
    this.state.finalGrades.splice(index, 1);
    this.setState(this.state.finalGrades);
  }

  handleAddEvent(evt) {
    var id = uuidv4();
    var finalGrade = {
      id: id,
      name: "",
      learningOutcome: "",
      weight: "",
    };
    this.state.finalGrades.push(finalGrade);
    this.setState(this.state.finalGrades);
  }

  handleSend(evt) {
    console.log(this.state.finalGrades);
  }

  handleFinalGradesTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var finalGrades = this.state.finalGrades.slice();
    var newFinalGrades = finalGrades.map(function (finalGrade) {
      for (var key in finalGrade) {
        if (key == item.name && finalGrade.id == item.id) {
          finalGrade[key] = item.value;
        }
      }
      return finalGrade;
    });
    this.setState({ finalGrades: newFinalGrades });
  }
  render() {
    return (
      <div>
        <FinalGradesTable
          onFinalGradesTableUpdate={this.handleFinalGradesTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          finalGrades={this.state.finalGrades}
          filterText={this.state.filterText}
        />
        <button
          className="button is-warning is-rounded is-medium"
          onClick={this.handleSend.bind(this)}
        >
          Update Form
        </button>
      </div>
    );
  }
}
export default FinalGradeDeterminations;

class FinalGradesTable extends React.Component {
  render() {
    var onFinalGradesTableUpdate = this.props.onFinalGradesTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var finalGrade = this.props.finalGrades.map(function (finalGrade) {
      if (finalGrade.name.indexOf(filterText) === -1) {
        return;
      }
      return (
        <FinalGradeRow
          onFinalGradesTableUpdate={onFinalGradesTableUpdate}
          finalGrade={finalGrade}
          onDelEvent={rowDel.bind(this)}
          key={finalGrade.id}
        />
      );
    });
    return (
      <div className="columns is-max-desktop is-centered">
        
          <div>
            <table className="table is-bordered">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Learning Outcome(s) Evaluated</th>
                  <th>Weight</th>
                </tr>
              </thead>

              <tbody>{finalGrade}</tbody>
            </table>
            <button
              onClick={this.props.onRowAdd}
              className="button is-primary is-rounded"
            >
              Add New
            </button>
          </div>
        </div>
    
    );
  }
}

class FinalGradeRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.finalGrade);
  }
  render() {
    return (
      // <tr className="eachRow">
      <tr>
        <EditableFinalGradeCell
          onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate}
          cellData={{
            type: "name",
            value: this.props.finalGrade.name,
            id: this.props.finalGrade.id,
          }}
        />
        <EditableFinalGradeCell
          onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate}
          cellData={{
            type: "learningOutcome",
            value: this.props.finalGrade.learningOutcome,
            id: this.props.finalGrade.id,
          }}
        />
        <EditableFinalGradeCellNumbers
          onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate}
          cellData={{
            type: "weight",
            value: this.props.finalGrade.weight,
            id: this.props.finalGrade.id,
          }}
        />
        <td className="del-cell">
          <button
            onClick={this.onDelEvent.bind(this)}
            className="button is-danger is-rounded is-fullwidth"
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }
}
class EditableFinalGradeCell extends React.Component {
  render() {
    return (
      // <td className='EditableCell'>
      <td>
        <textarea
          class="textarea is-info"
          rows="2"
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          onChange={this.props.onFinalGradesTableUpdate}
        />
      </td>
    );
  }
}

class EditableFinalGradeCellNumbers extends React.Component {
  render() {
    return (
      // <td className='EditableCell'>
      <td>
        <input
          type="number"
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          onChange={this.props.onFinalGradesTableUpdate}
        />
      </td>
    );
  }
}

/*
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
