import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import axios from 'axios'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';

const URL = 'https://jsonplaceholder.typicode.com/users'

class FinalGrades extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.finalGrades = [
      {
        id: 1,
        weight: '',
        finalGrade: '',
        name: ''
      }, 
    ];

  }
  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(finalGrade) {
    var index = this.state.finalGrades.indexOf(finalGrade);
    this.state.finalGrades.splice(index, 1);
    this.setState(this.state.finalGrades);
  };

  handleAddEvent(evt) {
    var id = uuidv4();
    var finalGrade = {
      id: id,
      name: "",
      learningOutcome: "",
      weight: "",
    }
    this.state.finalGrades.push(finalGrade);
    this.setState(this.state.finalGrades);

  }

  handleFinalGradesTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
var finalGrades = this.state.finalGrades.slice();
  var newFinalGrades = finalGrades.map(function(finalGrade) {

    for (var key in finalGrade) {
      if (key == item.name && finalGrade.id == item.id) {
        finalGrade[key] = item.value;

      }
    }
    return finalGrade;
  });
    this.setState({finalGrades:newFinalGrades});
  };
  render() {

    return (
      <div>
        <FinalGradesTable onFinalGradesTableUpdate={this.handleFinalGradesTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} finalGrades={this.state.finalGrades} filterText={this.state.filterText}/>
      </div>
    );

  }

}


class FinalGradesTable extends React.Component {

  render() {
    var onFinalGradesTableUpdate = this.props.onFinalGradesTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var finalGrade = this.props.finalGrades.map(function(finalGrade) {
      if (finalGrade.name.indexOf(filterText) === -1) {
        return;
      }
      return (<FinalGradeRow onFinalGradesTableUpdate={onFinalGradesTableUpdate} finalGrade={finalGrade} onDelEvent={rowDel.bind(this)} key={finalGrade.id}/>)
    });
    return (
      <div>


        <table className="table-bordered">
          <thead>
          <tr className="table-header">
              <th>Component</th>
              <th>Learning Outcome(s) Evaluated</th>
              <th>Weight</th>
            </tr>
          </thead>

          <tbody>
            {finalGrade}

          </tbody>

        </table>
        <button type="button" onClick={this.props.onRowAdd} className="btn-add">Add</button>
      </div>
    );

  }

}

class FinalGradeRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.finalGrade);

  }
  render() {

    return (
      <tr className="eachRow">
        <EditableFinalGradeCell onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate} cellData={{
          "type": "name",
          value: this.props.finalGrade.name,
          id: this.props.finalGrade.id
        }}/>
        <EditableFinalGradeCell onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate} cellData={{
          type: "learningOutcome",
          value: this.props.finalGrade.learningOutcome,
          id: this.props.finalGrade.id
        }}/>
        <EditableFinalGradeCell onFinalGradesTableUpdate={this.props.onFinalGradesTableUpdate} cellData={{
          type: "weight",
          value: this.props.finalGrade.weight,
          id: this.props.finalGrade.id
        }}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" className="del-btn"/>
        </td>
      </tr>
    );

  }

}
class EditableFinalGradeCell extends React.Component {

  render() {
    return (
      <td className='EditableCell'>
        <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onFinalGradesTableUpdate}/>
      </td>
    );

  }

}









class CourseObjectives extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.courseObjectives = [
      {
        id: 1,
        publicID: 1,
        name: '',

      },
      {
        id: 2,
        publicID: 2,
        name: ''
      },
    ];
  }
  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(courseObjective) {
    var index = this.state.courseObjectives.indexOf(courseObjective);
    this.state.courseObjectives.splice(index, 1);
    this.setState(this.state.courseObjectives);
  };

  handleAddEvent(evt) {
    var id = uuidv4() ;
    var courseObjective = {
      id: id,
      name: "",
      publicID: 1+this.state.courseObjectives.length,
    }
    this.state.courseObjectives.push(courseObjective);
    this.setState(this.state.courseObjectives);

  }

  handleCourseObjectivesTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
var courseObjectives = this.state.courseObjectives.slice();
  var newCourseObjectives = courseObjectives.map(function(courseObjective) {

    for (var key in courseObjective) {
      if (key == item.name && courseObjective.id == item.id) {
        courseObjective[key] = item.value;

      }
    }
    return courseObjective;
  });
    this.setState({courseObjectives:newCourseObjectives});
  //  console.log(this.state.courseObjectives);
  };
  render() {

    return (
      <div>
        <CourseObjectivesTable onCourseObjectivesTableUpdate={this.handleCourseObjectivesTable.bind(this)} onCourseObjectivesRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} courseObjectives={this.state.courseObjectives} filterText={this.state.filterText}/>
      </div>
    );

  }

}


class CourseObjectivesTable extends React.Component {

  render() {
    var onCourseObjectivesTableUpdate = this.props.onCourseObjectivesTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var courseObjective = this.props.courseObjectives.map(function(courseObjective) {
      if (courseObjective.name.indexOf(filterText) === -1) {
        return;
      }
      return (<CourseObjectivesRow onCourseObjectivesTableUpdate={onCourseObjectivesTableUpdate} courseObjective={courseObjective} onDelEvent={rowDel.bind(this)} key={courseObjective.id}/>)
    });
    return (
      <div>


        <table className="table-bordered">
          <thead>
            <tr className="table-header">
              <th>Id</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {courseObjective}

          </tbody>

        </table>
        <button type="button" onClick={this.props.onCourseObjectivesRowAdd} className="btn-add">Add</button>

      </div>
    );

  }

}

class CourseObjectivesRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.courseObjective);

  }
  render() {

    return (
      <tr className="eachRow">
        <CourseObjectivesEditableCell onCourseObjectivesTableUpdate={this.props.onCourseObjectivesTableUpdate} cellData={{
          "type": "component",
          value: this.props.courseObjective.publicID,
          id: this.props.courseObjective.id
        }}/>
        <CourseObjectivesEditableCell onCourseObjectivesTableUpdate={this.props.onCourseObjectivesTableUpdate} cellData={{
          "type": "name",
          value: this.props.courseObjective.name,
          id: this.props.courseObjective.id
        }}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="Remove" className="del-btn"/>
        </td>
      </tr>
    );

  }

}
class CourseObjectivesEditableCell extends React.Component {

  render() {
    return (
      <td className='EditableCell'>
        <textarea class="textarea is-info" rows="2" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onCourseObjectivesTableUpdate}/>
      </td>
    );

  }

}

const refreshPage = () => {
  window.location.reload();
}

function App() {


  const [employees, setEmployees] = React.useState([])

  React.useEffect(() => {
      getData()
  }, [])

  const getData = async () => {

      const response = await axios.get(URL)
      setEmployees(response.data)
  }

  const removeData = (id) => {

      axios.delete(`${URL}/${id}`).then(res => {
          const del = employees.filter(employee => id !== employee.id)
          setEmployees(del)
      })
  }

  const renderHeader = () => {
      let headerElement = ['id', 'name', 'email', 'phone', 'operation']

      return headerElement.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  const renderBody = () => {
      return employees && employees.map(({ id, name, email, phone }) => {
          return (
              <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td className='opration'>
                      <button className='button' onClick={() => removeData(id)}>Delete</button>
                  </td>
              </tr>
          )
      })
  }


  return (
    <div className="App">
      <div className="container">
        <div className="columns is multiline">
          <div className="column is-full">
            <div className="notification">
              <body>

              <section class="section">
                  <div class="container">

                    <h1 class="title is-1">Course Creation Form</h1>
                    
                  </div>
                </section>


                <section class="section">
                  <div class="container">

                    <h1 class="title">Course Info</h1>

                    <div class="field has-addons">
                      <div class="control">
                        <textarea class="textarea is-info" placeholder="Enter Course Name" rows="1"></textarea>
                      </div>
                    </div>

                    <div class="field">
                      <div class="control">
                        <textarea class="textarea is-info" placeholder="Enter Course Number" rows="1"></textarea>
                      </div>
                    </div>

                    <div class="field">
                      <div class="control">
                        <textarea class="textarea is-info" placeholder="Enter Course Description" rows="4"></textarea>
                      </div>
                    </div>

                    <div class="field has-addons">
                      <div class="control">
                        <input class="input is-primary" type="text" placeholder="Course Hours"></input>
                      </div>
                    </div>

                    <div class="field has-addons">
                      <div class="control">
                        <input class="input is-primary" type="text" placeholder="Academic Credit"></input>
                      </div>
                    </div>

                    <div class="field has-addons">
                      <div class="control">
                        <input class="input is-primary" type="text" placeholder="Calendar Link"></input>
                      </div>
                    </div>
                  </div>
                </section>

                <section class="section">
                  <div class="container">

                    <h1 class="title">Learning Outcomes</h1>
                    
                    <h2 class="subtitle">
                      <table id='courseObjectiveTable'>

                          <tbody>
                              < CourseObjectives / > 
 
                          </tbody>
                      </table>
                    </h2>
                  </div>
                </section>

                <section class="section">
                  <div class="container">
                    <h1 class="title">Final Grade Determination</h1>
                    <h2 class="subtitle">
                    <h1 id='title'> </h1>
                      <table id='FinalGradesTable'>
                          <tbody>
                            < FinalGrades / > 

                          </tbody>
                         
                      </table>
                  

                    </h2>
                  </div>
                </section>

                <section class="section">
                  <div class="container">
                    <h1 class="title">Create Course?</h1>
                    <div class="control">
                      <button class="button is-primary is-large" onClick={refreshPage}>Create</button>
                    </div>

                  </div>
                </section>

              </body>

            </div>
          </div>
        </div>
      </div>

    </div>);



}

export default App;
