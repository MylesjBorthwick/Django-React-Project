import 'bulma/css/bulma.css';
import { useState } from "react";
import React, { Component } from 'react'
import ReactDOM from 'react-dom'; 

class Table extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
        students: [
           { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
           { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
           { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
           { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
        ]
     }
  }

  renderTableHeader() {
     let header = Object.keys(this.state.students[0])
     return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
     })
  }

  renderTableData() {
     return this.state.students.map((student, index) => {
        const { id, name, age, email } = student //destructuring
        return (
           <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{email}</td>
           </tr>
        )
     })
  }

  render() {
     return (
        <div>
           <h1 id='title'>React Dynamic Table</h1>
           <table id='students'>
              <tbody>
                 <tr>{this.renderTableHeader()}</tr>
                 {this.renderTableData()}
              </tbody>
           </table>
        </div>
     )
  }
}




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

                      ReactDOM.render(<Table />, document.getElementById('root'));

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
