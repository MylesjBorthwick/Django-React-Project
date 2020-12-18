import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import axios from 'axios'
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const URL = 'https://jsonplaceholder.typicode.com/users'

 
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


const courseObjectives = [
  {
    id: 1,
    name: ' ',
  },
];

const listReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
      };
    default:
      throw new Error();
  }
};



function App() {



  
  const [objectivesList, setObjectivesList] = React.useState({
    list: courseObjectives,
    isShowList: true,
  });
 
  function handleChange(event, id) {
    //setObjectivesList(event.target.value);
  }
  function handleRemove(id) {
    setObjectivesList({ type: 'REMOVE_ITEM', id });
  }
  function handleAdd() {
    const newList = objectivesList.concat({ name:" ", id: uuidv4() });
    setObjectivesList(newList);
  }
  if (!objectivesList.isShowList) {
    return null;
  }





    // const [employees, setEmployees] = useState([])

    // useEffect(() => {
    //     getData()
    // }, [])

    // const getData = async () => {

    //     const response = await axios.get(URL)
    //     setEmployees(response.data)
    // }

    // const removeData = (id) => {

    //     axios.delete(`${URL}/${id}`).then(res => {
    //         const del = employees.filter(employee => id !== employee.id)
    //         setEmployees(del)
    //     })
    // }
 

    const renderHeader = () => {
        let headerElement = ['Objective Number', 'Objective Description', 'Remove']

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
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



    const renderBody = () => {
        return objectivesList.map((item) => {
            return (
                <tr key={item.id}>
                    <td contenteditable='false'>{item.id}</td>
                    <td contenteditable='true'>{item.name}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => handleRemove(item.id)}>Delete</button>
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
                          <thead>
                              <tr>{renderHeader()}</tr>
                          </thead>
                          <tbody>
                              {renderBody()}
                              <div>
                                <button className='add-row-button' onClick={() => handleAdd()}>Add Row</button>
                              </div>
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
