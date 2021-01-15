import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import axios from "axios";

async function update_Django_backend(state) {
  var API_URL = "http://localhost:8000/api/graduate_attributes/";

  var arrayLength = state.attributes.length;
  for (var i = 0; i < arrayLength; i++) {
    console.log(state.attributes[i]);
    
    axios.post(API_URL, state.attributes[i]).then((response) => {
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
    axios.put(`http://localhost:8000/api/graduate_attributes/${state.attributes[i].id}`, state.attributes[i]).then((response) => {
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
          course_outline_id: 101,
        },
      ];
      var API_URL = "http://localhost:8000/api/graduate_attributes/";
      axios
      .get(API_URL)
      .then(res => this.setState({ attributes: res.data }))
      .catch(err => console.log(err));
    }

    componentDidUpdate(prevProps){
      if(this.props.isClicked !== prevProps.isClicked || this.state.attributes.length< 1){
         this.setState({
          filterText : '',
          attributes:[
            {
              id: 1,
              publicID: 1,
              grad: '',
              instruct: '',
              course_outline_id: 101,
            }
          ]
       });
        console.log(update_Django(this.state));
      }
    }

    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(attribute) {
      var index = this.state.attributes.indexOf(attribute);
      axios.delete(`http://localhost:8000/api/graduate_attributes/${this.state.attributes[index].id}`).then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      }, (error) => {
        console.log(error.request);
        console.log(error);
      });
      this.state.attributes.splice(index, 1);

      var temp_state = this.state.attributes;
      var arrayLength = temp_state.length;
      for (var i = 0; i < arrayLength; i++) {
        temp_state[i].id = i+1;
        temp_state[i].publicID = i+1;
      }
  
      this.setState(temp_state);
    };
  
    handleAddEvent(evt) {
      var id = 1+this.state.attributes.length;
      var attribute = {
        id: id,
        publicID: id,
        grad: '',
        instruct: '',
        course_outline_id: 101,

      }
      this.state.attributes.push(attribute);
      this.setState(this.state.attributes);
  
    }

    handleSend(evt){
      console.log(this.state.attributes);
      console.log(update_Django(this.state));

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
          <button className = 'button is-warning is-rounded is-medium' onClick={this.handleSend.bind(this)}>Update Form</button>
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
        <div className="columns is-max-desktop is-centered">
        <div>
  
  
          <table className="table is-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Graduate Attribute</th>
                <th>Instruction Level</th>

              </tr>
            </thead>
  
            <tbody>
              {attribute}
  
            </tbody>
  
          </table>
          <button onClick={this.props.onAttributesRowAdd} className="button is-primary is-rounded">Add New</button>
  
        </div>
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
        <tr>
          <AttributesEditableCellNumbers onAttributesTableUpdate={this.props.onAttributesTableUpdate} cellData={{
            type: "publicID",
            value: this.props.attribute.publicID,
            id: this.props.attribute.id
          }}/>
          <AttributesEditableCell onAttributesTableUpdate={this.props.onAttributesTableUpdate} cellData={{
            type: "grad",
            value: this.props.attribute.grad,
            id: this.props.attribute.id
          }}/>
            <AttributesEditableCell onAttributesTableUpdate={this.props.onAttributesTableUpdate} cellData={{
            type: "instruct",
            value: this.props.attribute.instruct,
            id: this.props.attribute.id
          }}/>
          <td className="del-cell">
          <button onClick={this.onDelEvent.bind(this)} className="button is-danger is-rounded is-fullwidth">Remove</button>
          </td>
        </tr>
      );
  
    }
  
  }
  class AttributesEditableCell extends React.Component {
  
    render() {
      return (
        <td>
          <textarea class="textarea is-info is-large" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onAttributesTableUpdate}/>
        </td>
      );
  
    }
  
  }

  class AttributesEditableCellNumbers extends React.Component {
  
    render() {
      return (
        <td>
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
