import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import { v4 as uuidv4 } from 'uuid';


class CourseInstructors extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {};
      this.state.filterText = "";
      this.state.instructors = [
        {
          id: 1,
          section: '',
          fname: '',
          lname: '',
          phone: '',
          office: '',
          email: '',
        },
     
      ];
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(instructor) {
      var index = this.state.instructors.indexOf(instructor);
      this.state.instructors.splice(index, 1);
      this.setState(this.state.instructors);
    };
  
    handleAddEvent(evt) {
      var id = uuidv4() ;
      var instructor = {
        id: id,
        section: '',
        fname: '',
        lname: '',
        phone: '',
        office: '',
        email: '',
    
      }
      this.state.instructors.push(instructor);
      this.setState(this.state.instructors);
  
    }
  
    handleInstructorsTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
  var instructors = this.state.instructors.slice();
    var newinstructors = instructors.map(function(instructor) {
  
      for (var key in instructor) {
        if (key == item.name && instructor.id == item.id) {
          instructor[key] = item.value;
  
        }
      }
      return instructor;
    });
      this.setState({instructors:newinstructors});
    //  console.log(this.state.instructors);
    };
    render() {
  
      return (
        <div>
          <InstructorsTable onInstructorsTableUpdate={this.handleInstructorsTable.bind(this)} onInstructorRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} instructors={this.state.instructors} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  
  
  class InstructorsTable extends React.Component {
  
    render() {
      var onInstructorsTableUpdate = this.props.onInstructorsTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var instructor = this.props.instructors.map(function(instructor) {
        if (instructor.section.indexOf(filterText) === -1) {
          return;
        }
        return (<InstructorRow onInstructorsTableUpdate={onInstructorsTableUpdate} instructor={instructor} onDelEvent={rowDel.bind(this)} key={instructor.id}/>)
      });
      return (
        <div>
  
  
          <table className="table-bordered">
            <thead>
              <tr className="table-header">
                <th>Section</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Office</th>
                <th>Email</th>
              </tr>
            </thead>
  
            <tbody>
              {instructor}
  
            </tbody>
  
          </table>
          <button type="button" onClick={this.props.onInstructorRowAdd} className="btn-add">Add</button>
  
        </div>
      );
  
    }
  
  }
  
  class InstructorRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.instructor);
  
    }
    render() {
  
      return (
        <tr className="eachRow">
          <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            "type": "section",
            value: this.props.instructor.section,
            id: this.props.instructor.id
          }}/>
          <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            "type": "fname",
            value: this.props.instructor.fname,
            id: this.props.instructor.id
          }}/>
           <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            "type": "lname",
            value: this.props.instructor.lname,
            id: this.props.instructor.id
          }}/>
            <InstructorEditableCellNumbers onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            "type": "phone",
            value: this.props.instructor.phone,
            id: this.props.instructor.id
          }}/>
          <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            "type": "office",
            value: this.props.instructor.office,
            id: this.props.instructor.id
          }}/>
             <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            "type": "email",
            value: this.props.instructor.email,
            id: this.props.instructor.id
          }}/>
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" className="del-btn"/>
          </td>
        </tr>
      );
  
    }
  
  }
  class InstructorEditableCell extends React.Component {
  
    render() {
      return (
        <td className='EditableCell'>
          <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onInstructorsTableUpdate}/>
        </td>
      );
  
    }
  
  }

  class InstructorEditableCellNumbers extends React.Component {
  
    render() {
      return (
        // <td className='EditableCell'>
        <td>
          <input type='number' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onInstructorsTableUpdate}/>
        </td>
      );
    }
  }


  export default CourseInstructors





  


   /*
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
