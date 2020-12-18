import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Components.css';

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
          <GPAConversionTable onGPAConversionTableUpdate={this.handleGPAConversionTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} GPAConversions={this.state.GPAConversions} filterText={this.state.filterText}/>
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


