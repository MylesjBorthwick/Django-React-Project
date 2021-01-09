import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import { v4 as uuidv4 } from 'uuid';


class Examinations extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {};
      this.state.filterText = "";
      this.state.examinations = [
        {
          id: 1,
          publicID: 1,
          name: '',
        },
        {
          id: 2,
          publicID: 2,
          name: ''
        },
      ];
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(examinations) {
      var index = this.state.examinations.indexOf(examinations);
      this.state.examinations.splice(index, 1);
      this.setState(this.state.examinations);
    };
  
    handleAddEvent(evt) {
      var id = uuidv4() ;
      var examinations = {
        id: id,
        name: "",
        publicID: 1+this.state.examinations.length,
      }
      this.state.examinations.push(examinations);
      this.setState(this.state.examinations);
  
    }
  
    handleExaminationTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
  var examinations = this.state.examinations.slice();
    var newExaminations = examinations.map(function(examinations) {
  
      for (var key in examinations) {
        if (key == item.name && examinations.id == item.id) {
          examinations[key] = item.value;
  
        }
      }
      return examinations;
    });
      this.setState({examinations:newExaminations});
    //  console.log(this.state.examinations);
    };
    render() {
  
      return (
        <div>
          <ExaminationTable onExaminationTableUpdate={this.handleExaminationTable.bind(this)} onExaminationRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} examinations={this.state.examinations} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  
  
  class ExaminationTable extends React.Component {
  
    render() {
      var onExaminationTableUpdate = this.props.onExaminationTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var examinations = this.props.examinations.map(function(examinations) {
        if (examinations.name.indexOf(filterText) === -1) {
          return;
        }
        return (<ExaminationRow onExaminationTableUpdate={onExaminationTableUpdate} examinations={examinations} onDelEvent={rowDel.bind(this)} key={examinations.id}/>)
      });
      return (
        <div>
  
  
          <table className="table-bordered">
            <thead>
              <tr className="table-header">
                <th></th>
                <th>Examination Info</th>
              </tr>
            </thead>
  
            <tbody>
              {examinations}
  
            </tbody>
  
          </table>
          <button type="button" onClick={this.props.onExaminationRowAdd} className="btn-add">Add</button>
  
        </div>
      );
  
    }
  
  }
  
  class ExaminationRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.examinations);
  
    }
    render() {
  
      return (
        <tr className="eachRow">
          <ExaminationsEditableCellNumbers onExaminationTableUpdate={this.props.onExaminationTableUpdate} cellData={{
            "type": "publicID",
            value: this.props.examinations.publicID,
            id: this.props.examinations.id
          }}/>
          <ExaminationsEditableCell onExaminationTableUpdate={this.props.onExaminationTableUpdate} cellData={{
            "type": "name",
            value: this.props.examinations.name,
            id: this.props.examinations.id
          }}/>
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" className="del-btn"/>
          </td>
        </tr>
      );
  
    }
  
  }
  class ExaminationsEditableCell extends React.Component {
  
    render() {
      return (
        <td className='EditableCell'>
          <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onExaminationTableUpdate}/>
        </td>
      );
  
    }
  
  }

  class ExaminationsEditableCellNumbers extends React.Component {
  
    render() {
      return (
        <td className='EditableCell'>
          <input type='number' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onExaminationTableUpdate}/>
        </td>
      );
    }
  }
  
  export default Examinations





  


   /*
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
