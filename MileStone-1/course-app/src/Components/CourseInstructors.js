import 'bulma/css/bulma.css';
import React, { useState, useEffect, Component } from 'react'
import './Components.css';
import { v4 as uuidv4 } from 'uuid';

class CourseInstructors extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.state.filterText = "";
        this.state.instructors = [
            {
                id: 1,
                section: '',
                fname: '',
                lname: '',
                phone: '',
                office: '',
                email: '',
            },
        ];

    }
    handleUserInput(filterText) {
        this.setState({ filterText: filterText });
    };
    handleRowDel(section) {
        var index = this.state.instructors.indexOf(section);
        this.state.instructors.splice(index, 1);
        this.setState(this.state.instructors);
    };

    handleAddEvent(evt) {
        var id = uuidv4();
        var section = {
            id: id,
            lname: "",
            phone: "",
            section: "",
            fname: "",
            office: '',
            email: '',
        }
        this.state.instructors.push(section);
        this.setState(this.state.instructors);

    }

    handleInstructorsTable(evt) {
        var item = {
            id: evt.target.id,
            lname: evt.target.lname,
            value: evt.target.value
        };
        var instructors = this.state.instructors.slice();
        var newinstructors = instructors.map(function (section) {

            for (var key in section) {
                if (key == item.lname && section.id == item.id) {
                    section[key] = item.value;

                }
            }
            return section;
        });
        this.setState({ instructors: newinstructors });
    };
    render() {

        return (
            <div>
                <InstructorsTable onInstructorsTableUpdate={this.handleInstructorsTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} instructors={this.state.instructors} filterText={this.state.filterText} />
            </div>
        );

    }

}
export default CourseInstructors


class InstructorsTable extends React.Component {

    render() {
        var onInstructorsTableUpdate = this.props.onInstructorsTableUpdate;
        var rowDel = this.props.onRowDel;
        var filterText = this.props.filterText;
        var section = this.props.instructors.map(function (section) {
            if (section.lname.indexOf(filterText) === -1) {
                return;
            }
            return (<InstructorsRow onInstructorsTableUpdate={onInstructorsTableUpdate} section={section} onDelEvent={rowDel.bind(this)} key={section.id} />)
        });
        return (
            <div>


                <table classlname="table-bordered">
                    <thead>
                        <tr classlname="table-header">
                            <th>Section</th>
                            <th>First Name</th>
                            <th>Family Name</th>
                            <th>Phone</th>
                            <th>Office</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {section}

                    </tbody>

                </table>
                <button type="button" onClick={this.props.onRowAdd} classlname="btn-add">Add Instructor</button>
            </div>
        );

    }

}

class InstructorsRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.section);

    }
    render() {

        return (
            <tr classlname="eachRow">

                <EditableInstructorCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
                    type: "section",
                    value: this.props.section.section,
                    id: this.props.section.id
                }} />
                <EditableInstructorCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
                    "type": "fname",
                    value: this.props.section.fname,
                    id: this.props.section.id
                }} />
                <EditableInstructorCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
                    type: "lname",
                    value: this.props.section.lname,
                    id: this.props.section.id
                }} />

                <EditableInstructorCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
                    type: "phone",
                    value: this.props.section.phone,
                    id: this.props.section.id
                }} />

                <EditableInstructorCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
                    type: "office",
                    value: this.props.section.office,
                    id: this.props.section.id
                }} />

                <EditableInstructorCell onInstructorsTableUpdate={this.props.onInstructorsTableUpdate} cellData={{
                    type: "email",
                    value: this.props.section.email,
                    id: this.props.section.id
                }} />
                <td classlname="del-cell">
                    <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" classlname="del-btn" />
                </td>
            </tr>
        );

    }

}
class EditableInstructorCell extends React.Component {

    render() {
        return (
            <td classlname='EditableCell'>
                <textarea class="textarea is-info" rows="2" lname={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onInstructorsTableUpdate} />
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
