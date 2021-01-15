import 'bulma/css/bulma.css';
import React, { useState, useEffect, Component } from 'react'
import './Components.css';
import axios from "axios";

async function update_Django_backend(state) {
    var API_URL = "http://localhost:8000/api/required_textbooks/";

    var arrayLength = state.textbooks.length;
    for (var i = 0; i < arrayLength; i++) {
      
      axios.post(API_URL, state.textbooks[i]).then((response) => {
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
      axios.put(`http://localhost:8000/api/required_textbooks/${state.textbooks[i].id}`, state.textbooks[i]).then((response) => {
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
  
  async function update_Django(state) {
    const response = await update_Django_backend(state);
    return response;
  }


class ReqTextBook extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.state.filterText = "";
        this.state.textbooks = [
            {
                id: 1,
                title: '',
                author: '',
                edition: '',
                publisher: '',
                course_outline_id:101,
            },
        ];
        var API_URL = "http://localhost:8000/api/required_textbooks/";
        axios
        .get(API_URL)
        .then(res => this.setState({ textbooks: res.data }))
        .catch(err => console.log(err));
    }

    componentDidUpdate(prevProps){
        if(this.props.isClicked !== prevProps.isClicked || this.state.textbooks.length< 1){
           this.setState({
            filterText : '',
            textbooks:[
              {
                id: 1,
                title: '',
                author: '',
                edition: '',
                publisher: '',
                course_outline_id:101,
              }
            ]
         });
          console.log(update_Django(this.state));
        }
      }

    handleSend(evt){
        console.log(this.state.textbooks);
        console.log(update_Django(this.state));

      }

    handleUserInput(filterText) {
        this.setState({ filterText: filterText });
    };
    handleRowDel(textbook) {
        var index = this.state.textbooks.indexOf(textbook);
        axios.delete(`http://localhost:8000/api/required_textbooks/${this.state.textbooks[index].id}`).then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
          }, (error) => {
            console.log(error.request);
            console.log(error);
          });
        this.state.textbooks.splice(index, 1);
        var temp_state = this.state.textbooks;
        var arrayLength = temp_state.length;
        for (var i = 0; i < arrayLength; i++) {
          temp_state[i].id = i+1;
        }
    
        this.setState(temp_state);    
    };

    handleAddEvent(evt) {
        var id = this.state.textbooks.length+1;
        var textbook = {
            id: id,
            title: "",
            author: "",
            edition: "",
            publisher: "",
            course_outline_id:101,
           
        }
        this.state.textbooks.push(textbook);
        this.setState(this.state.textbooks);

    }

    handleTextBookTable(evt) {
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var textbooks = this.state.textbooks.slice();
        var newTextbooks = textbooks.map(function (textbook) {

            for (var key in textbook) {
                if (key == item.name && textbook.id == item.id) {
                    textbook[key] = item.value;

                }
            }
            return textbook;
        });
        this.setState({ textbooks: newTextbooks });
    };
    render() {

        return (
            <div>
                <TextBookTable onTextBookTableUpdate={this.handleTextBookTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} textbooks={this.state.textbooks} filterText={this.state.filterText} />
                <button className = 'button is-warning is-rounded is-medium' onClick={this.handleSend.bind(this)}>Update Form</button>
            </div>
        );

    }

}
export default ReqTextBook


class TextBookTable extends React.Component {

    render() {
        var onTextBookTableUpdate = this.props.onTextBookTableUpdate;
        var rowDel = this.props.onRowDel;
        var filterText = this.props.filterText;
        var textbook = this.props.textbooks.map(function (textbook) {
            if (textbook.title.indexOf(filterText) === -1) {
                return;
            }
            return (<TextbookRow onTextBookTableUpdate={onTextBookTableUpdate} textbook={textbook} onDelEvent={rowDel.bind(this)} key={textbook.id} />)
        });
        return (

            <div className="columns is-max-desktop is-centered">
            <div>


                <table className="table is-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Edition</th>
                            <th>Publisher</th>
                           
                        </tr>
                    </thead>

                    <tbody>
                        {textbook}

                    </tbody>

                </table>
                <button onClick={this.props.onRowAdd} className="button is-primary is-rounded">Add New Row</button>
            </div>

            </div>
        );

    }

}

class TextbookRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.textbook);

    }
    render() {

        return (
            <tr>

                <TextBookEditableCell onTextBookTableUpdate={this.props.onTextBookTableUpdate} cellData={{
                    type: "title",
                    value: this.props.textbook.title,
                    id: this.props.textbook.id
                }} />
                <TextBookEditableCell onTextBookTableUpdate={this.props.onTextBookTableUpdate} cellData={{
                    type: "author",
                    value: this.props.textbook.author,
                    id: this.props.textbook.id
                }} />
                <TextBookEditableCell onTextBookTableUpdate={this.props.onTextBookTableUpdate} cellData={{
                    type: "edition",
                    value: this.props.textbook.edition,
                    id: this.props.textbook.id
                }} />

                <TextBookEditableCell onTextBookTableUpdate={this.props.onTextBookTableUpdate} cellData={{
                    type: "publisher",
                    value: this.props.textbook.publisher,
                    id: this.props.textbook.id
                }} />

<button onClick={this.onDelEvent.bind(this)}  className="button is-danger is-rounded">Remove</button>
            </tr>
        );

    }

}
class TextBookEditableCell extends React.Component {

    render() {
        return (
            <td>
                <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onTextBookTableUpdate} />
            </td>
        );
    }
}



