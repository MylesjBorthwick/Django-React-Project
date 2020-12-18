import 'bulma/css/bulma.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const URL = 'https://jsonplaceholder.typicode.com/users'


function App() {

  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const decrement = () => { setCounter(counter - 1) }
  const increment = () => { setCounter(counter + 1) }
  

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      setCounter(parseInt(inputValue))
    }
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
    const addRow = () =>{

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
                    <td contenteditable='true'>{id}</td>
                    <td contenteditable='true'>{name}</td>
                    <td contenteditable='true'>{email}</td>
                    <td contenteditable='true'>{phone}</td>
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
                    <h2 class="subtitle">
                      A survey of software design and development topics for Engineering students. Topics include: key features of an object-oriented programming language, especially inheritance and polymorphism; elements of object-oriented design; programming and application of common data structures; strategies and tools for testing and debugging.
                    </h2>
                    <table class="table">
                      <thead>
                        <tr>
                          <th><abbr title=" "> </abbr></th>
                          <th><abbr title=" "> </abbr></th>
                        </tr>
                      </thead>
                      
                      <tbody>
                        <tr>
                          <th>Course Hours</th>
                          <td>3 units; H (3-2)</td>
                         </tr>
                        <tr>
                          <th>Academic Credit</th>
                          <td>3</td>
                        </tr>
                        <tr>
                          <th>Calendar Reference: </th>
                          <td><a href="https://www.ucalgary.ca/pubs/calendar/current/software-engineering-for-engineers.html#38252" title="2021-2022 Academic Calendar">Academic Calendar</a></td></tr>
   
                      </tbody>
                    </table>
                  </div>
                </section>

                <section class="section">
                  <div class="container">
                    <h1 class="title">Learning Outcomes</h1>
                    <h2 class="subtitle">
                    <h1 id='title'>React Table</h1>
                      <table id='employee'>
                          <thead>
                              <tr>{renderHeader()}</tr>
                          </thead>
                          <tbody>
                              {renderBody()}
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
                    <h1 class="title">Final Grade Determination</h1>
                    <h2 class="subtitle">
                      Create dynamic grade table here

                    </h2>
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
