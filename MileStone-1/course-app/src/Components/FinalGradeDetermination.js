import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import { v4 as uuidv4 } from 'uuid';

class FinalGradeDeterminations extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {};
      this.state.filterText = "";
      this.state.finalGrades = [
        {
          id: 1,
          weight: '',
          finalGrade: '',
          name: ''
        }, 
      ];
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(finalGrade) {
      var index = this.state.finalGrades.indexOf(finalGrade);
      this.state.finalGrades.splice(index, 1);
      this.setState(this.state.finalGrades);
    };
  
    handleAddEvent(evt) {
      var id = uuidv4();
      var finalGrade = {
        id: id,
        name: "",
        learningOutcome: "",
        weight: "",
      }
      this.state.finalGrades.push(finalGrade);
      this.setState(this.state.finalGrades);
  
    }
  
    handleFinalGradesTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
  var finalGrades = this.state.finalGrades.slice();
    var newFinalGrades = finalGrades.map(function(finalGrade) {
  
      for (var key in finalGrade) {
        if (key == item.name && finalGrade.id == item.id) {
          finalGrade[key] = item.value;
  
        }
      }
      return finalGrade;
    });
      this.setState({finalGrades:newFinalGrades});
    };
    render() {
  
      return (
        <div>
          <FinalGradesTable onFinalGradesTableUpdate={this.handleFinalGradesTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} finalGrades={this.state.finalGrades} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  export default FinalGradeDeterminations
  
  
  class FinalGradesTable extends React.Component {
  
    render() {
      var onFinalGradesTableUpdate = this.props.onFinalGradesTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var finalGrade = this.props.finalGrades.map(function(finalGrade) {
        if (finalGrade.name.indexOf(filterText) === -1) {
          return;
        }
        return (<FinalGradeRow onFinalGradesTableUpdate={onFinalGradesTableUpdate} finalGrade={finalGrade} onDelEvent={rowDel.bind(this)} key={finalGrade.id}/>)
      });
      return (
        <div>
  
  
          <table className="table-bordered">
            <thead>
            <tr className="table-header">
                <th>Component</th>
                <th>Learning Outcome(s) Evaluated</th>
                <th>Weight</th>
              </tr>
            </thead>
  
            <tbody>
              {finalGrade}
  
            </tbody>
  
          </table>
          <button type="button" onClick={this.props.onRowAdd} className="btn-add">Add</button>
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
        <tr className="eachRow">
          <EditableFinalGradeCell onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate} cellData={{
            "type": "name",
            value: this.props.finalGrade.name,
            id: this.props.finalGrade.id
          }}/>
          <EditableFinalGradeCell onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate} cellData={{
            type: "learningOutcome",
            value: this.props.finalGrade.learningOutcome,
            id: this.props.finalGrade.id
          }}/>
          <EditableFinalGradeCell onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate} cellData={{
            type: "weight",
            value: this.props.finalGrade.weight,
            id: this.props.finalGrade.id
          }}/>
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" className="del-btn"/>
          </td>
        </tr>
      );
  
    }
  
  }
  class EditableFinalGradeCell extends React.Component {
  
    render() {
      return (
        <td className='EditableCell'>
          <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onFinalGradesTableUpdate}/>
        </td>
      );
  
    }
  
  }
  
  