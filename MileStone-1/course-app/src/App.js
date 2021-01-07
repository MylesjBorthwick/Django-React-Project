import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import axios from 'axios'
import './App.css';
import { v4 as uuidv4 } from 'uuid';

import GPAConversions from './Components/GPAConversions.js';
import FinalGradeDetermination from './Components/FinalGradeDetermination.js';
import CourseObjectives from './Components/CourseObjectives.js';



const refreshPage = () => {
  window.location.reload();
}

function App() {


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
                        <textarea class="textarea is-info" placeholder="Enter Course Number" rows="1"></textarea>
                      </div>
                    </div>

                    <div class="field">
                      <div class="control">
                        <textarea class="textarea is-info" placeholder="Enter Course Name" rows="1"></textarea>
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
                            < FinalGradeDetermination / > 

                          </tbody>
                         
                      </table>
                  

                    </h2>
                  </div>
                </section>
                <section class="section">
                  <div class="container">

                    <h2 class="title2">Notes</h2>

                    <div class="field">
                      <div class="control">
                        <textarea class="textarea is-info" placeholder="Enter notes about additional pass-requirements, sickness exemptions, or grade conversion scale (below)" rows="4"></textarea>
                      </div>
                    </div>

                  </div>
                </section>
                <section class="section">
                  <div class="container">

                    <h1 class="title2">GPA Conversion</h1>
                    
                    <h2 class="subtitle">
                      <table id='courseObjectiveTable'>

                          <tbody>
                              < GPAConversions / > 
 
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
