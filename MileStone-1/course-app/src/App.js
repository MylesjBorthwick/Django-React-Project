import 'bulma/css/bulma.css';
import { useState } from "react";
import React from "react";
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
                      Create dynamic outcome table here
                    </h2>
                    <table class="table">
                      <thead>
                        <tr>
                          <th><abbr title="Number"> </abbr></th>
                          <th><abbr title="Outcome">Outcome</abbr></th>
                        </tr>
                      </thead>
                      
                      <tbody>
                        <tr>
                          <th>1</th>
                          <th>Have a deep understanding, and practical knowledge of object oriented analysis, design, and development.</th>
                         </tr>
                        <tr>
                          <th>2</th>
                          <td>Design and develop software programs in Java.</td>

                        </tr>
   
                      </tbody>
                    </table>
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
