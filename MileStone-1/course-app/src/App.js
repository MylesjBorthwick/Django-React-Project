import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import bulmaCollapsible from '@creativebulma/bulma-collapsible/dist/css/bulma-collapsible.min.css';



import GPAConversions from "./Components/GPAConversions.js";
import FinalGradeDetermination from "./Components/FinalGradeDetermination.js";
import CourseObjectives from "./Components/CourseObjectives.js";
import Examinations from "./Components/Examinations.js";
import Sections from "./Components/Sections.js";
import CourseInstructors from "./Components/CourseInstructors.js";
import TextBook from "./Components/TextBook.js";
import GraduateAttributesTable from "./Components/GraduateAttributesTable.js";
import Calendar from "./Components/Calendar";
import Calculator from "./Components/Calculator";
import Policies from "./Components/Policies";
import Notes from "./Components/Notes";


const refreshPage = () => {
  window.location.reload();
};

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="column is-multiline is-centered">
          <div className="column is-fullhd">

        
          
            <section class="section">
              <div class="container">
                
                  <h1 class="title is-1">Course Creation Form</h1>
               
              </div>
            </section>
            </div>
            
            <div className = 'message is-bordered'>
            <section class="section">
              <div class="container">
                <h1 class="title">Calendar Information</h1>
                <Calendar/>
               
              </div>
            </section>
            </div>

            <div className = 'card'>
            <section class="section">
              <div class="container">
                <h1 class="title">Learning Outcomes</h1>
                <h2 class="title2">Course Objectives</h2>

                    <CourseObjectives />
              

                <h3 class="title2">Graduate Attributes</h3>

              
                    <GraduateAttributesTable />
                
              </div>
            </section>
            </div>

            <div className = 'message is-bordered'>
            <section class="section">
              <div class="container">
                <h1 class="title">Timetable</h1>
                <h2 class="subtitle">
                
                      <Sections />
                
                </h2>
              </div>
            </section>
            </div>
           

            <div className = 'card'>
            <section class="section">
              <div class="container">
                <h1 class="title">Course Instructors</h1>
                <h2 class="subtitle">
                 
                      <CourseInstructors />
               
                </h2>
              </div>
            </section>
            </div>
            <div className = 'message is-bordered'>
            <section class="section">
              <div class="container">
                <h1 class="title">Examinations</h1>
                <div class="block">
                  The following examinations will be held in this course:
                </div>
                <h2 class="subtitle">
           
                      <Examinations />
                   
                
                </h2>
              </div>
              <div class="block">
                  
                </div>
              <div class="container">
                <h1 class="title">Use of Calculators in Examinations</h1>
                <Calculator/>
              </div>
            </section>
            </div>

            <div className='card'>
            <section class="section">
              <div class="container">
                <h1 class="title">Final Grade Determination</h1>
                <h2 class="subtitle">
                  
                 
                  <FinalGradeDetermination />

                </h2>
              </div>

              <div class="container">
                <h2 class="title2">Extra Notes</h2>

                <Notes/>
              </div>
         
              <div class="container">
                <h1 class="title2">GPA Conversion</h1>

                <h2 class="subtitle">
                  <table id="courseObjectiveTable">
                    <tbody>
                      <GPAConversions />
                    </tbody>
                  </table>
                </h2>
              </div>
            </section>
            </div>
            

            <div className='message is-bordered'>
            <section class="section">
              <div class="container">
                <h1 class="title">Textbooks</h1>
                <h2 class="title2">Required Textbooks</h2>
                <h3 class="subtitle">
                      <TextBook />
                </h3>

                <h4 class="title2">Recommended Textbooks</h4>
                <h5 class="subtitle">
                      <TextBook />            
                </h5>
              </div>
            </section>
            </div>
            
            <div className='card'>
            <section class="section">
              <div class="container">
                <h1 class="title">Course Policies</h1>

                <Policies/>
              </div>
            </section>
            </div>

            <section class="section">
              <div class="container">
                <h1 class="title">Create New Course?</h1>
                <div class="control">
                  <button
                    class="button is-primary is-large is-rounded is-halfwidth"
                    onClick={refreshPage}
                  >
                    Create
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
   
  );
}

export default App;
