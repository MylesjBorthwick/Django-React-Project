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

                    <div class="field">
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

                    <div class="field">
                      <div class="control">
                        <input class="input is-primary" type="text" placeholder="Course Hours"></input>
                      </div>
                    </div>

                    <div class="field">
                      <div class="control">
                        <input class="input is-primary" type="text" placeholder="Academic Credit"></input>
                      </div>
                    </div>
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
                          <td>Have a deep understanding, and practical knowledge of object oriented analysis, design, and development </td>
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
