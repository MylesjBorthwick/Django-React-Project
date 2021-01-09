import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import { v4 as uuidv4 } from 'uuid';


class GraduateAttributesTable extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {};
      this.state.filterText = "";
      this.state.attributes = [
        {
          id: 1,
          publicID: 1,
          grad: '',
          instruct: '',
        },
      ];
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(attribute) {
      var index = this.state.attributes.indexOf(attribute);
      this.state.attributes.splice(index, 1);
      this.setState(this.state.attributes);
    };
  
    handleAddEvent(evt) {
      var id = uuidv4() ;
      var attribute = {
        id: id,
        publicID: 1+this.state.attributes.length,
        grad: '',
        instruct: '',
      }
      this.state.attributes.push(attribute);
      this.setState(this.state.attributes);
  
    }
  
    handleAttributesTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
  var attributes = this.state.attributes.slice();
    var newAttributes = attributes.map(function(attribute) {
  
      for (var key in attribute) {
        if (key == item.name && attribute.id == item.id) {
          attribute[key] = item.value;
  
        }
      }
      return attribute;
    });
      this.setState({attributes:newAttributes});
    //  console.log(this.state.attributes);
    };
    render() {
  
      return (
        <div>
          <AttributesTable onAttributesTableUpdate={this.handleAttributesTable.bind(this)} onAttributesRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} attributes={this.state.attributes} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  
  
  class AttributesTable extends React.Component {
  
    render() {
      var onAttributesTableUpdate = this.props.onAttributesTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var attribute = this.props.attributes.map(function(attribute) {
        if (attribute.grad.indexOf(filterText) === -1) {
          return;
        }
        return (<AttributesRow onAttributesTableUpdate={onAttributesTableUpdate} attribute={attribute} onDelEvent={rowDel.bind(this)} key={attribute.id}/>)
      });
      return (
        <div>
  
  
          <table className="table-bordered">
            <thead>
              <tr className="table-header">
                <th>Id</th>
                <th>Graduate Attribute</th>
                <th>Instruction Level</th>

              </tr>
            </thead>
  
            <tbody>
              {attribute}
  
            </tbody>
  
          </table>
          <button type="button" onClick={this.props.onAttributesRowAdd} className="btn-add">Add</button>
  
        </div>
      );
  
    }
  
  }
  
  class AttributesRow extends React.Component {
    onDelEvent() {
      this.props.onDelEvent(this.props.attribute);
  
    }
    render() {
  
      return (
        <tr className="eachRow">
          <AttributesEditableCellNumbers onAttributesTableUpdate={this.props.onAttributesTableUpdate} cellData={{
            "type": "publicID",
            value: this.props.attribute.publicID,
            id: this.props.attribute.id
          }}/>
          <AttributesEditableCell onAttributesTableUpdate={this.props.onAttributesTableUpdate} cellData={{
            "type": "grad",
            value: this.props.attribute.grad,
            id: this.props.attribute.id
          }}/>
            <AttributesEditableCell onAttributesTableUpdate={this.props.onAttributesTableUpdate} cellData={{
            "type": "instruct",
            value: this.props.attribute.instruct,
            id: this.props.attribute.id
          }}/>
          <td className="del-cell">
            <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" className="del-btn"/>
          </td>
        </tr>
      );
  
    }
  
  }
  class AttributesEditableCell extends React.Component {
  
    render() {
      return (
        <td className='EditableCell'>
          <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onAttributesTableUpdate}/>
        </td>
      );
  
    }
  
  }

  class AttributesEditableCellNumbers extends React.Component {
  
    render() {
      return (
        <td className='EditableCell'>
          <input type='number' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onAttributesTableUpdate}/>
        </td>
      );
    }
  }
  
export default GraduateAttributesTable





  


   /*
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
