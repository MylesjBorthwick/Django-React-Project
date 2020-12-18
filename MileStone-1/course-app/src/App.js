import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import axios from 'axios'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';

const URL = 'https://jsonplaceholder.typicode.com/users'

class CourseObjectives extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.courseObjectives = [
      {
        id: 1,
        publicID: 1,
        name: ''
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


        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {courseObjective}

          </tbody>

        </table>
        <button type="button" onClick={this.props.onCourseObjectivesRowAdd} className="btn btn-success pull-right">Add</button>

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
          "type": "category",
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
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onCourseObjectivesTableUpdate}/>
      </td>
    );

  }

}

// class CourseObjectives extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list: [
//         { id: '1', objective: "" },
//       ],
//     };

//     onUpdateItems = () => {
//       this.setState(state => {
//         const list = state.list.map(item => {id});
   
//         return {
//           list,
//         };
//       });
//     };

//     onRemoveItems = i => {
//       this.setState(state => {
//         const list = state.list.filter((j, objective) => i !== j);
//         if (list == []){
//           list = [
//             { id: '1', objective: "" }
//           ]
//         }
//         return {
//           list,
//         };
//       });
//     };
//   }
// }


// const courseObjectives = [
//   {
//     id: 1,
//     name: ' ',
//   },
// ];

// const listReducer = (state, action) => {
//   switch (action.type) {
//     case 'REMOVE_ITEM':
//       return {
//         ...state,
//         list: state.list.filter((item) => item.id !== action.id),
//       };
//     default:
//       throw new Error();
//   }
// };



function App() {


  // const [objectivesList, setObjectivesList] = React.useState({
  //   list: courseObjectives,
  //   isShowList: true,
  // });
 
  // function handleChange(event, id) {
  //   //setObjectivesList(event.target.value);
  // }
  // function handleRemove(id) {
  //   setObjectivesList({ type: 'REMOVE_ITEM', id });
  // }
  // function handleAdd() {
  //   const newList = objectivesList.concat({ name:" ", id: uuidv4() });
  //   setObjectivesList(newList);
  // }
  // if (!objectivesList.isShowList) {
  //   return null;
  // }



  const addRow = () => {

}


    const [employees, setEmployees] = useState([])

    useEffect(() => {
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
        let headerElement = ['Objective Number', 'Objective Description', 'Remove']

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    const renderBody = () => {
      return employees && employees.map(({ id, name}) => {
        return (
            <tr key={id}>
                <td contenteditable='false'>{id}</td>
                <td contenteditable='true'>{name}</td>
                <td className='opration'>
                    <button className='button' onClick={() => removeData(id)}>Delete</button>
                </td>
            </tr>
            
        )
    })
  }



    const renderHeaderGrades = () => {
      let headerElement = ['Component', 'Learning Outcome(s) Evaluated', 'Weight','Remove']

      return headerElement.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  const renderBodyGrades = () => {
    return employees && employees.map(({ id, name, email}) => {
        return (
            <tr key={id}>
                <td contenteditable='false'>{id}</td>
                <td contenteditable='true'>{name}</td>
                <td contenteditable='true'>{email}</td>
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
                      <table id='employee'>

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
                      <table id='employee'>
                          <thead>
                              <tr>{renderHeaderGrades()}</tr>
                          </thead>
                          <tbody>
                              {renderBodyGrades()}
                              <div>
                                <button className='add-row-button' onClick={() => addRow()}>Add Row</button>
                              </div>
                          </tbody>
                      </table>
                  

                    </h2>
                  </div>
                </section>

                <section class="section">
                  <div class="container">
                    <h1 class="title">Submit Form?</h1>
                    <div class="control">
                      <button class="button is-primary">Submit</button>
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
