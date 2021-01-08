import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import { v4 as uuidv4 } from 'uuid';

class Sections extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {};
      this.state.filterText = "";
      this.state.sections = [
        {
          id: 1,
          location: '',
          name: '',
          days: '',
          time:'',
        }, 
      ];
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(section) {
      var index = this.state.sections.indexOf(section);
      this.state.sections.splice(index, 1);
      this.setState(this.state.sections);
    };
  
    handleAddEvent(evt) {
      var id = uuidv4();
      var section = {
        id: id,
        days: "",
        time: "",
        location: "",
        name: "",
      }
      this.state.sections.push(section);
      this.setState(this.state.sections);
  
    }
  
    handleSectionsTable(evt) {
      var item = {
        id: evt.target.id,
        days: evt.target.days,
        value: evt.target.value
      };
  var sections = this.state.sections.slice();
    var newsections = sections.map(function(section) {
  
      for (var key in section) {
        if (key == item.days && section.id == item.id) {
          section[key] = item.value;
  
        }
      }
      return section;
    });
      this.setState({sections:newsections});
    };
    render() {
  
      return (
        <div>
          <SectionsTable onSectionsTableUpdate={this.handleSectionsTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} sections={this.state.sections} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  export default Sections
  
  
  class SectionsTable extends React.Component {
  
    render() {
      var onSectionsTableUpdate = this.props.onSectionsTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var section = this.props.sections.map(function(section) {
        if (section.days.indexOf(filterText) === -1) {
          return;
        }
        return (<SectionTableRow onSectionsTableUpdate={onSectionsTableUpdate} section={section} onDelEvent={rowDel.bind(this)} key={section.id}/>)
      });
      return (
        <div>
  
  
          <table classdays="table-bordered">
            <thead>
            <tr classdays="table-header">
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
          <button type="button" onClick={this.props.onRowAdd} classdays="btn-add">Add Section</button>
        </div>
      );
  
    }
  
  }
  
  class SectionTableRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.section);
  
    }
    render() {
  
      return (
        <tr classdays="eachRow">
          <EditableSectionCell onSectionsTableUpdate={this.props.onSectionsTableUpdate} cellData={{
            "type": "name",
            value: this.props.section.name,
            id: this.props.section.id
          }}/>
          <EditableSectionCell onSectionsTableUpdate={this.props.onSectionsTableUpdate} cellData={{
            type: "days",
            value: this.props.section.days,
            id: this.props.section.id
          }}/>
          <EditableSectionCell onSectionsTableUpdate={this.props.onSectionsTableUpdate} cellData={{
            type: "location",
            value: this.props.section.location,
            id: this.props.section.id
          }}/>
             <EditableSectionCell onSectionsTableUpdate={this.props.onSectionsTableUpdate} cellData={{
            type: "time",
            value: this.props.section.time,
            id: this.props.section.id
          }}/>
          <td classdays="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" classdays="del-btn"/>
          </td>
        </tr>
      );
  
    }
  
  }
  class EditableSectionCell extends React.Component {
  
    render() {
      return (
        <td classdays='EditableCell'>
          <textarea class="textarea is-info" rows="2" days={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onSectionsTableUpdate}/>
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
