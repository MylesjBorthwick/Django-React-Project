import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import axios from "axios";

async function update_Django_backend(state) {
  var API_URL = "http://localhost:8000/api/instructors/";

  var arrayLength = state.instructors.length;
  for (var i = 0; i < arrayLength; i++) {
    
    axios.post(API_URL, state.instructors[i]).then((response) => {
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
    axios.put(`http://localhost:8000/api/instructors/${state.instructors[i].id}`, state.instructors[i]).then((response) => {
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

class CourseInstructors extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {};
      this.state.filterText = "";
      this.state.instructors = [
        {
          id: 1,
          course_outline_id: 101,
          section: '',
          fname: '',
          lname: '',
          phone: '',
          office: '',
          email: '',
        },
     
      ];
      var API_URL = "http://localhost:8000/api/instructors/";
      axios
      .get(API_URL)
      .then(res => this.setState({ instructors: res.data }))
      .catch(err => console.log(err));

    }

    componentDidUpdate(prevProps){
      if(this.props.isClicked !== prevProps.isClicked || this.state.instructors.length< 1){
         this.setState({
          filterText : '',
          instructors:[
            {
              id: 1,
              course_outline_id: 101,
              section: '',
              fname: '',
              lname: '',
              phone: '',
              office: '',
              email: '',
            }
          ]
       });
      console.log(update_Django(this.state));

      }

    }



    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(instructor) {
      if(this.state.instructors.length< 2){
        var temp_state = this.state.instructors;
        temp_state[0].section= '';
        temp_state[0].fname= '';
        temp_state[0].lname= '';
        temp_state[0].phone= '';
        temp_state[0].office= '';
        temp_state[0].email= '';
        temp_state[0].section= '';
        this.setState(temp_state);
      }
      else{
        var index = this.state.instructors.indexOf(instructor);
        axios.delete(`http://localhost:8000/api/instructors/${this.state.instructors[index].id}`).then((response) => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        }, (error) => {
          console.log(error.request);
          console.log(error);
        });
  
        this.state.instructors.splice(index, 1);
        var temp_states = this.state.instructors;
        var arrayLength = temp_states.length;
        var id_start = this.state.instructors[0].course_outline_id;
        for (var i = 0; i < arrayLength; i++) {
          temp_states[i].id = i+1 +id_start;
        }
        this.setState(temp_states);
      }
    };

    handleSend(evt){
      console.log(this.state.instructors);
      console.log(update_Django(this.state));
    }
  
    handleAddEvent(evt) {
      var id = 1+ this.state.instructors[this.state.instructors.length-1].id;
      var instructor = {
        id: id,
        course_outline_id: this.state.instructors[0].course_outline_id,
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
          <button className = 'button is-warning is-rounded is-medium' onClick={this.handleSend.bind(this)}>Update Form</button>
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
        <div className="columns is-max-desktop is-centered">
        <div>
  
  
          <table className="table is-bordered">
            <thead>
              <tr>
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
          <button onClick={this.props.onInstructorRowAdd} className="button is-primary is-rounded">Add New Row</button>
  
        </div>
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
        <tr>
          <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            type: "section",
            value: this.props.instructor.section,
            id: this.props.instructor.id
          }}/>
          <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            type: "fname",
            value: this.props.instructor.fname,
            id: this.props.instructor.id
          }}/>
           <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            type: "lname",
            value: this.props.instructor.lname,
            id: this.props.instructor.id
          }}/>
            <InstructorEditableCellNumbers onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            type: "phone",
            value: this.props.instructor.phone,
            id: this.props.instructor.id
          }}/>
          <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            type: "office",
            value: this.props.instructor.office,
            id: this.props.instructor.id
          }}/>
             <InstructorEditableCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
            type: "email",
            value: this.props.instructor.email,
            id: this.props.instructor.id
          }}/>
           <button onClick={this.onDelEvent.bind(this)}  className="button is-danger is-rounded">Remove</button>
        </tr>
      );
  
    }
  
  }
  class InstructorEditableCell extends React.Component {
  
    render() {
      return (
        <td>
          <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onInstructorsTableUpdate}/>
        </td>
      );
  
    }
  
  }

  class InstructorEditableCellNumbers extends React.Component {
  
    render() {
      return (
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
