import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

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
          name: '',
          course_outline_id: 1000,
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
  



    handleRowUpdate(evt) {

      console.log(this.state.finalGrades);

      var API_URL = "http://localhost:8000/api/final_grades/";


      axios
      .get(API_URL)
      .then(res => this.setState({ finalGrades: res.data }))
      .catch(err => console.log(err));



      var arrayLength = this.state.finalGrades.length;
      for (var i = 0; i < arrayLength; i++) {
        console.log(this.state.finalGrades[i]);
        //axios.put(`http://localhost:8000/api/gpa_conversions/${this.state.GPAConversions[i].id}/`, this.state.GPAConversions[i]);

        //axios.post("http://localhost:8000/api/gpa_conversions/", this.state.GPAConversions[i]);
        
        axios.post(API_URL, this.state.finalGrades[i])  .then((response) => {
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
        axios.put(`http://localhost:8000/api/final_grades/${this.state.finalGrades[i].id}`, this.state.finalGrades[i])  .then((response) => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        }, (error) => {
          console.log(error.request);
          console.log(error);
        });
        

        // axios.delete(`http://localhost:8000/api/final_grades/${this.state.finalGrades[i].id}`)  .then((response) => {
        //   console.log(response.data);
        //   console.log(response.status);
        //   console.log(response.statusText);
        //   console.log(response.headers);
        //   console.log(response.config);
        // }, (error) => {
        //   console.log(error.request);
        //   console.log(error);
        // });


      }


      // axios.delete(API_URL)  .then((response) => {
      //   console.log(response.data);
      //   console.log(response.status);
      //   console.log(response.statusText);
      //   console.log(response.headers);
      //   console.log(response.config);
      // }, (error) => {
      //   console.log(error.request);
      //   console.log(error);
      // });


    };
    



    handleAddEvent(evt) {
      var id = uuidv4();
      id = this.state.finalGrades.length + 1;
      var finalGrade = {
        id: id,
        weight: '',
        finalGrade: '',
        name: '',
        course_outline_id: 1000,
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
          <FinalGradesTable onFinalGradesTableUpdate={this.handleFinalGradesTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowUpdate={this.handleRowUpdate.bind(this)} onRowDel={this.handleRowDel.bind(this)} finalGrades={this.state.finalGrades} filterText={this.state.filterText}/>
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
          <tr>
          <button type="button" onClick={this.props.onRowUpdate} className="btn-add">Update</button>
          </tr>
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
          <EditableFinalGradeCellNumbers onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate} cellData={{
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
  
  class EditableFinalGradeCellNumbers extends React.Component {
  
    render() {
      return (
        <td className='EditableCell'>
          <input type='number' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onFinalGradesTableUpdate}/>
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
