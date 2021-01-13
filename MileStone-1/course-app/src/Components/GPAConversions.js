import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Components.css';
import axios from "axios";



class GPAConversions extends React.Component {

    constructor(props) {
      super(props);
  
      //  this.state.GPAConversions = [];
      this.state = {};
      this.state.filterText = "";
      this.state.GPAConversions = [
        {
          id: 1,
          lowerGrade: '95',
          upperGrade: '100',
          T_sign: 'T >=',
          name: 'A+',
          course_outline_id: 1000
        }, {
          id: 2,
          lowerGrade: '90',
          upperGrade: '95',
          T_sign: '=< T <',
          name: 'A',
          course_outline_id: 1000
        }, {
          id: 3,
          lowerGrade: '85',
          upperGrade: '90',
          T_sign: '=< T <',
          name: 'A-',
          course_outline_id: 1000

        }, {
          id: 4,
          lowerGrade: '80',
          upperGrade: '85',
          T_sign: '=< T <',
          name: 'B+',
          course_outline_id: 1000

        }, {
          id: 5,
          lowerGrade: '75',
          upperGrade: '80',
          T_sign: '=< T <',
          name: 'B',
          course_outline_id: 1000

        }, {
          id: 6,
          lowerGrade: '70',
          upperGrade: '75',
          T_sign: '=< T <',
          name: 'B-',
          course_outline_id: 1000

        }, {
          id: 7,
          lowerGrade: '65',
          upperGrade: '70',
          T_sign: '=< T <',
          name: 'C+',
          course_outline_id: 1000

        },{
          id: 8,
          lowerGrade: '60',
          upperGrade: '65',
          T_sign: '=< T <',
          name: 'C',
          course_outline_id: 1000

        }, {
          id: 9,
          lowerGrade: '55',
          upperGrade: '60',
          T_sign: '=< T <',
          name: 'C-',
          course_outline_id: 1000

        }, {
          id: 10,
          lowerGrade: '50',
          upperGrade: '55',
          T_sign: '=< T <',
          name: 'D+',
          course_outline_id: 1000

        }, {
          id: 11,
          lowerGrade: '45',
          upperGrade: '50',
          T_sign: '=< T <',
          name: 'D',
          course_outline_id: 1000

        }, {
          id: 12,
          lowerGrade: '0',
          upperGrade: '45',
          T_sign: 'T <',
          name: 'F',
          course_outline_id: 1000

        }
      ];
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(GPAConversion) {
      var index = this.state.GPAConversions.indexOf(GPAConversion);
      this.state.GPAConversions.splice(index, 1);
      this.setState(this.state.GPAConversions);
    };
    handleRowUpdate(evt) {

      console.log(this.state.GPAConversions);

      var API_URL = "http://localhost:8000/api/gpa_conversions/";


      axios
      .get(API_URL)
      .then(res => this.setState({ GPAConversions: res.data }))
      .catch(err => console.log(err));



      var arrayLength = this.state.GPAConversions.length;
      for (var i = 0; i < arrayLength; i++) {
        console.log(this.state.GPAConversions[i]);
        //axios.put(`http://localhost:8000/api/gpa_conversions/${this.state.GPAConversions[i].id}/`, this.state.GPAConversions[i]);

        //axios.post("http://localhost:8000/api/gpa_conversions/", this.state.GPAConversions[i]);
        
        axios.post(API_URL, this.state.GPAConversions[i])  .then((response) => {
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
        axios.put(`http://localhost:8000/api/gpa_conversions/${this.state.GPAConversions[i].id}`, this.state.GPAConversions[i])  .then((response) => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        }, (error) => {
          console.log(error.request);
          console.log(error);
        });
        

        axios.delete(`http://localhost:8000/api/gpa_conversions/${this.state.GPAConversions[i].id}`)  .then((response) => {
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


      axios.delete(API_URL)  .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      }, (error) => {
        console.log(error.request);
        console.log(error);
      });


    };
    



    handleAddEvent(evt) {
      var id = uuidv4();
      var GPAConversion = {
        id: id,
        name: "",
        upperGrade: "",
        lowerGrade: "",
        T_sign: "=< T <",
      }
      this.state.GPAConversions.push(GPAConversion);
      this.setState(this.state.GPAConversions);
  
    }
  
    handleGPAConversionTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
    var GPAConversions = this.state.GPAConversions.slice();
    var newGPAConversions = GPAConversions.map(function(GPAConversion) {
  
      for (var key in GPAConversion) {
        if (key == item.name && GPAConversion.id == item.id) {
          GPAConversion[key] = item.value;
  
        }
      }
      return GPAConversion;
    });
      this.setState({GPAConversions:newGPAConversions});
    };

    render() {
  
      return (
        <div>
          <GPAConversionTable onGPAConversionTableUpdate={this.handleGPAConversionTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} onRowUpdate={this.handleRowUpdate.bind(this)} GPAConversions={this.state.GPAConversions} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  export default GPAConversions;

  
  
  class GPAConversionTable extends React.Component {
  
    render() {
      var onGPAConversionTableUpdate = this.props.onGPAConversionTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var GPAConversion = this.props.GPAConversions.map(function(GPAConversion) {
        if (GPAConversion.name.indexOf(filterText) === -1) {
          return;
        }
        return (<GPAConversionRow onGPAConversionTableUpdate={onGPAConversionTableUpdate} GPAConversion={GPAConversion} onDelEvent={rowDel.bind(this)} key={GPAConversion.id}/>)
      });
      return (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Letter Grade</th>
                <th></th>
                <th >Total Mark (T)</th>
                <th></th>
              </tr>
            </thead>
  
            <tbody>
              {GPAConversion}
  
            </tbody>
  
          </table>
          <tr>
          <button type="button" onClick={this.props.onRowUpdate} className="btn-add">Update</button>
          </tr>
        </div>
      );
  
    }
  
  }
  
  class GPAConversionRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.GPAConversion);
  
    }
    render() {
  
      return (
        <tr className="eachRow">
          <NonEditableCell onGPAConversionTableUpdate={this.props.onGPAConversionTableUpdate} cellData={{
            "type": "name",
            value: this.props.GPAConversion.name,
            id: this.props.GPAConversion.id
          }}/>
          <EditableCell onGPAConversionTableUpdate={this.props.onGPAConversionTableUpdate} cellData={{
            type: "upperGrade",
            value: this.props.GPAConversion.upperGrade,
            id: this.props.GPAConversion.id
          }}/>
          <NonEditableCell onGPAConversionTableUpdate={this.props.onGPAConversionTableUpdate} cellData={{
            type: "T_sign",
            value: this.props.GPAConversion.T_sign,
            id: this.props.GPAConversion.id
          }}/>
          <EditableCell onGPAConversionTableUpdate={this.props.onGPAConversionTableUpdate} cellData={{
            type: "lowerGrade",
            value: this.props.GPAConversion.lowerGrade,
            id: this.props.GPAConversion.id
          }}/>
  
        </tr>
      );
  
    }
  
  }
  class EditableCell extends React.Component {
  
    render() {
      return (
        <td>
          <input type='number' class='last-table-cell' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onGPAConversionTableUpdate}/>
        </td>
      );
  
    }
  
  }
  class NonEditableCell extends React.Component {
  
    render() {
      return (
        <td>
          <input readonly type='text' class='last-table-cell' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} />
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
