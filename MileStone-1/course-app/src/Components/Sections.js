import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import axios from "axios";


class Sections extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {};
      this.state.filterText = "";
      this.state.sections = [
        {
          id: 1,
          name: '',
          days: '',
          time: '',
          location: '',
          course_outline_id: 101,
        },
     
      ];

      var API_URL = "http://localhost:8000/api/sections/";
      axios
      .get(API_URL)
      .then(res => this.setState({ sections: res.data }))
      .catch(err => console.log(err));
    }

    componentDidUpdate(prevProps){
      if(this.props.isClicked !== prevProps.isClicked){
         this.setState({
          filterText : '',
          sections:[
            {
              id: 1,
              name: '',
              days: '',
              time: '',
              location: '',
              course_outline_id: 101,
            }
          ]
       });
      }
   
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(section) {
      var index = this.state.sections.indexOf(section);
      axios.delete(`http://localhost:8000/api/sections/${this.state.sections[index].id}`).then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      }, (error) => {
        console.log(error.request);
        console.log(error);
      });
      this.state.sections.splice(index, 1);
      this.setState(this.state.sections);
    };
  
    handleAddEvent(evt) {
      var id = this.state.sections.length+1 ;
      var section = {
        id: id,
        name: '',
        days: '',
        time: '',
        location: '',
        course_outline_id: 101,
        
      }
      this.state.sections.push(section);
      this.setState(this.state.sections);
  
    }

    handleSend(evt){
      console.log(this.state.sections);
      var API_URL = "http://localhost:8000/api/sections/";

      var arrayLength = this.state.sections.length;
      for (var i = 0; i < arrayLength; i++) {
        
        axios.post(API_URL, this.state.sections[i]).then((response) => {
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
        axios.put(`http://localhost:8000/api/sections/${this.state.sections[i].id}`, this.state.sections[i]).then((response) => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        }, (error) => {
          console.log(error.request);
          console.log(error);
        });
    }
    }
  
    handleSectionsTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
  var sections = this.state.sections.slice();
    var newSections = sections.map(function(section) {
  
      for (var key in section) {
        if (key == item.name && section.id == item.id) {
          section[key] = item.value;
  
        }
      }
      return section;
    });
      this.setState({sections:newSections});
    //  console.log(this.state.sections);
    };
    render() {
  
      return (
        <div>
          <SectionsTable onSectionsTableUpdate={this.handleSectionsTable.bind(this)} onSectionsRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} sections={this.state.sections} filterText={this.state.filterText}/>
          <button className = 'button is-warning is-rounded is-medium' onClick={this.handleSend.bind(this)}>Update Form</button>
        </div>
      );
  
    }
  
  }
  
  
  class SectionsTable extends React.Component {
  
    render() {
      var onSectionsTableUpdate = this.props.onSectionsTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var section = this.props.sections.map(function(section) {
        if (section.name.indexOf(filterText) === -1) {
          return;
        }
        return (<SectionsRow onSectionsTableUpdate={onSectionsTableUpdate} section={section} onDelEvent={rowDel.bind(this)} key={section.id}/>)
      });
      return (
        <div className="columns is-max-desktop is-centered">
        <div>
  
  
          <table className="table is-bordered">
            <thead>
              <tr>
                <th>Section</th>
                <th>Day(s) of the Week</th>
                <th>Time</th>
                <th>Location</th>
              </tr>
            </thead>
  
            <tbody>
              {section}
  
            </tbody>
  
          </table>
          <button onClick={this.props.onSectionsRowAdd} className="button is-primary is-rounded">Add New Row</button>
  
        </div>
        </div>
      );
  
    }
  
  }
  
  class SectionsRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.section);
  
    }
    render() {
  
      return (
        <tr>
          <SectionsEditableCell onSectionsTableUpdate={this.props.onSectionsTableUpdate} cellData={{
            type: "name",
            value: this.props.section.name,
            id: this.props.section.id
          }}/>
          <SectionsEditableCell onSectionsTableUpdate={this.props.onSectionsTableUpdate} cellData={{
            type: "days",
            value: this.props.section.days,
            id: this.props.section.id
          }}/>
            <SectionsEditableCell onSectionsTableUpdate={this.props.onSectionsTableUpdate} cellData={{
            type: "time",
            value: this.props.section.time,
            id: this.props.section.id
          }}/>
          <SectionsEditableCell onSectionsTableUpdate={this.props.onSectionsTableUpdate} cellData={{
            type: "location",
            value: this.props.section.location,
            id: this.props.section.id
          }}/>
         
            <button onClick={this.onDelEvent.bind(this)}  className="button is-danger is-rounded">Remove</button>
        
        </tr>
      );
  
    }
  
  }
  class SectionsEditableCell extends React.Component {
  
    render() {
      return (
        <td>
          <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onSectionsTableUpdate}/>
        </td>
      );
  
    }
  
  }


  export default Sections





  


   /*
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
