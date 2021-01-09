import 'bulma/css/bulma.css';
import React, { useState, useEffect, Component } from 'react'
import './Components.css';
import { v4 as uuidv4 } from 'uuid';

class TextBook extends React.Component {

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
            },
        ];

    }
    handleUserInput(filterText) {
        this.setState({ filterText: filterText });
    };
    handleRowDel(textbook) {
        var index = this.state.textbooks.indexOf(textbook);
        this.state.textbooks.splice(index, 1);
        this.setState(this.state.textbooks);
    };

    handleAddEvent(evt) {
        var id = uuidv4();
        var textbook = {
            id: id,
            title: "",
            author: "",
            edition: "",
            publisher: "",
            
           
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
            </div>
        );

    }

}
export default TextBook


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
            <div>


                <table className="table-bordered">
                    <thead>
                        <tr className="table-header">
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
                <button type="button" onClick={this.props.onRowAdd} className="btn-add">Add</button>
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
            <tr className="eachRow">

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

                <td className="del-cell">
                    <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" className="del-btn" />
                </td>
            </tr>
        );

    }

}
class TextBookEditableCell extends React.Component {

    render() {
        return (
            <td className='EditableCell'>
                <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onTextBookTableUpdate} />
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
