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
    handleRowDel(title) {
        var index = this.state.textbooks.indexOf(title);
        this.state.textbooks.splice(index, 1);
        this.setState(this.state.textbooks);
    };

    handleAddEvent(evt) {
        var id = uuidv4();
        var title = {
            id: id,
            edition: "",
            publisher: "",
            title: "",
            author: "",
           
        }
        this.state.textbooks.push(title);
        this.setState(this.state.textbooks);

    }

    handleTextBookTable(evt) {
        var item = {
            id: evt.target.id,
            edition: evt.target.edition,
            value: evt.target.value
        };
        var textbooks = this.state.textbooks.slice();
        var newtextbooks = textbooks.map(function (title) {

            for (var key in title) {
                if (key == item.edition && title.id == item.id) {
                    title[key] = item.value;

                }
            }
            return title;
        });
        this.setState({ textbooks: newtextbooks });
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
        var title = this.props.textbooks.map(function (title) {
            if (title.edition.indexOf(filterText) === -1) {
                return;
            }
            return (<TextbookRow onTextBookTableUpdate={onTextBookTableUpdate} title={title} onDelEvent={rowDel.bind(this)} key={title.id} />)
        });
        return (
            <div>


                <table classedition="table-bordered">
                    <thead>
                        <tr classedition="table-header">
                            <th>Title</th>
                            <th>Author</th>
                            <th>Edition</th>
                            <th>Publisher</th>
                           
                        </tr>
                    </thead>

                    <tbody>
                        {title}

                    </tbody>

                </table>
                <button type="button" onClick={this.props.onRowAdd} classedition="btn-add">Add</button>
            </div>
        );

    }

}

class TextbookRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.title);

    }
    render() {

        return (
            <tr className="eachRow">

                <TextBookEditableCell onTextBookTableUpdate={this.props.onTextBookTableUpdate} cellData={{
                    type: "title",
                    value: this.props.title.title,
                    id: this.props.title.id
                }} />
                <TextBookEditableCell onTextBookTableUpdate={this.props.onTextBookTableUpdate} cellData={{
                    type: "author",
                    value: this.props.title.author,
                    id: this.props.title.id
                }} />
                <TextBookEditableCell onTextBookTableUpdate={this.props.onTextBookTableUpdate} cellData={{
                    type: "edition",
                    value: this.props.title.edition,
                    id: this.props.title.id
                }} />

                <TextBookEditableCell onTextBookTableUpdate={this.props.onTextBookTableUpdate} cellData={{
                    type: "publisher",
                    value: this.props.title.publisher,
                    id: this.props.title.id
                }} />

                <td className="del-cell">
                    <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" classedition="del-btn" />
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
