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
          lowerGrade: '',
          upperGrade: '',
          T_sign: 'T >=',
          name: 'A+'
        }, {
          id: 2,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'A'
        }, {
          id: 3,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'A-'
        }, {
          id: 4,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'B+'
        }, {
          id: 5,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'B'
        }, {
          id: 6,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'B-'
        }, {
          id: 7,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'C+'
        },{
          id: 8,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'C'
        }, {
          id: 9,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'C-'
        }, {
          id: 10,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'D+'
        }, {
          id: 11,
          lowerGrade: '',
          upperGrade: '',
          T_sign: '=< T <',
          name: 'D'
        }, {
          id: 13,
          lowerGrade: '',
          upperGrade: '',
          T_sign: 'T <',
          name: 'F'
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
      var item = {
        id: evt.target.id,
        lowerGrade: evt.target.lowerGrade,
        upperGrade: evt.target.upperGrade,
        T_sign: evt.target.T_sign,
        name: evt.target.name
      };
      console.log("Hello World!");
      // console.log(evt.T_sign);
      // console.log(item);
      console.log(this.state.GPAConversions);
      var GPAConversions = this.state.GPAConversions.slice();
      console.log("Sections:");

      

      var arrayLength = this.state.GPAConversions.length;
      for (var i = 0; i < arrayLength; i++) {
        console.log(this.state.GPAConversions[i]);
        //axios.put(`http://localhost:8000/api/gpa_conversions/${this.state.GPAConversions[i].id}/`, this.state.GPAConversions[i]);
        axios.post("http://localhost:8000/api/gpa_conversions/", this.state.GPAConversions[i]);
        // console.log(this.state.GPAConversions[i].id);
        // console.log(this.state.GPAConversions[i].lowerGrade);
        // console.log(this.state.GPAConversions[i].upperGrade);
        // console.log(this.state.GPAConversions[i].T_sign);
        // console.log(this.state.GPAConversions[i].name);
      //Do something
      }
      var newGPAConversions = GPAConversions.map(function(GPAConversion) {

        
        // for (var key in GPAConversions) {
        //   console.log(key);
        // }
        // for (var key in GPAConversion) {
        //   console.log(key);
        // }
      });
    };
    // handleSubmit(evt){
    //   console.log();

    //   if (evt.id) {
    //     axios
    //       .put(`http://localhost:8000/api/todos/${item.id}/`, evt)
    //       .then(res => this.refreshList());
    //     return;
    //   }
    //   axios
    //     .post("http://localhost:8000/api/todos/", item)
    //     .then(res => this.refreshList());
    // };  
    



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
