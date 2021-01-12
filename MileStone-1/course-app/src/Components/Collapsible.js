
import React, { useState, useEffect, Component } from "react";
import "./Components.css";
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import CourseObjectives from "./CourseObjectives.js";
import Calendar from "./Calendar";
import GraduateAttributesTable from "./GraduateAttributesTable";
import Sections from "./Sections";
import CourseInstructors from "./CourseInstructors";
import Calculator from "./Calculator";
import Examinations from "./Examinations";
import FinalGradeDeterminations from "./FinalGradeDetermination";
import Notes from "./Notes";
import GPAConversions from "./GPAConversions";
import TextBook from "./TextBook";
import Policies from "./Policies";

class Collapsible extends React.Component {
    componentDidMount() {
      this.collapsibles = bulmaCollapsible.attach(".is-collapsible", {
        container: this.refs.collapsibles
      });
    }
  
    render() {
      return (
        <div ref="collapsibles" id="accordion_first">
          <article className="message is-danger is-medium">
            <div className="message-header">
              
                Calendar Information{" "}
                <p>
                <a href="#collapsible-message-accordion-1" data-action="collapse">
                  Collapse/Expand
                </a>
              </p>
            </div>
            <div
              id="collapsible-message-accordion-1"
              className="message-body is-collapsible"
              data-parent="accordion_first"
            >
              <div className="message-body-content">

                <Calendar/>
               
              </div>
            </div>
          </article>

          <article className="message is-warning is-medium">
          <div className="message-header">
            
              Learning Outcomes{" "}
              <p>
              <a href="#collapsible-message-accordion-2" data-action="collapse">
                Collapse/Expand
              </a>
            </p>
          </div>
          <div
            id="collapsible-message-accordion-2"
            className="message-body is-collapsible"
            data-parent="accordion_first"
          >
            <div className="message-body-content">
            <div class="container">
               
                <h2 class="title2">Course Objectives</h2>

                    <CourseObjectives />
              

                <h3 class="title2">Graduate Attributes</h3>

              
                    <GraduateAttributesTable />
                
              </div>
            </div>
          </div>
        </article>

        <article className="message is-danger is-medium">
          <div className="message-header">
            
              Timetable{" "}
              <p>
              <a href="#collapsible-message-accordion-3" data-action="collapse">
                Collapse/Expand
              </a>
            </p>
          </div>
          <div
            id="collapsible-message-accordion-3"
            className="message-body is-collapsible"
            data-parent="accordion_first"
          >
            <div className="message-body-content">
            <div class="container">
            <h1 class="title2">Timetable</h1>
              

                    <Sections />
              

                
              </div>
            </div>
          </div>
        </article>

 
        <article className="message is-warning is-medium">
          <div className="message-header">
            
              Course Instructors{" "}
              <p>
              <a href="#collapsible-message-accordion-4" data-action="collapse">
                Collapse/Expand
              </a>
            </p>
          </div>
          <div
            id="collapsible-message-accordion-4"
            className="message-body is-collapsible"
            data-parent="accordion_first"
          >
            <div className="message-body-content">
            <div class="container">
            <h1 class="title2">Instructors</h1>
              

                    <CourseInstructors />
                
              </div>
            </div>
          </div>
        </article>

        <article className="message is-danger is-medium">
          <div className="message-header">
            
              Examinations{" "}
              <p>
              <a href="#collapsible-message-accordion-5" data-action="collapse">
                Collapse/Expand
              </a>
            </p>
          </div>
          <div
            id="collapsible-message-accordion-5"
            className="message-body is-collapsible"
            data-parent="accordion_first"
          >
            <div className="message-body-content">
            <div class="container">
           
           
            <h2 class="title2">Examinations</h2>

                    <Examinations />
                    <h2 class="title2">Use of Calculators in Examinations</h2>
                    <Calculator/>

                
              </div>
            </div>
          </div>
        </article>

        <article className="message is-warning is-medium">
          <div className="message-header">
            
              Grade Determination{" "}
              <p>
              <a href="#collapsible-message-accordion-6" data-action="collapse">
                Collapse/Expand
              </a>
            </p>
          </div>
          <div
            id="collapsible-message-accordion-6"
            className="message-body is-collapsible"
            data-parent="accordion_first"
          >
            <div className="message-body-content">
            <div class="container">

            
            <h2 class="title2">Grade Determination</h2>

                    <FinalGradeDeterminations />
                    <h2 class="title2">Extra Notes</h2>
                    <Notes/>
                    <h2 class="title2">GPA Conversions</h2>
                    <GPAConversions/>

                
              </div>
            </div>
          </div>
        </article>


        <article className="message is-danger is-medium">
          <div className="message-header">
            
              Textbooks{" "}
              <p>
              <a href="#collapsible-message-accordion-7" data-action="collapse">
                Collapse/Expand
              </a>
            </p>
          </div>
          <div
            id="collapsible-message-accordion-7"
            className="message-body is-collapsible"
            data-parent="accordion_first"
          >
            <div className="message-body-content">
            <div class="container">
     
           
            <h2 class="title2">Required Textbooks</h2>

                    <TextBook />
                    <h2 class="title2">Recommended Textbooks</h2>
                    <TextBook/>

                
              </div>
            </div>
          </div>
        </article>

        <article className="message is-warning is-medium">
          <div className="message-header">
            
              Policies{" "}
              <p>
              <a href="#collapsible-message-accordion-8" data-action="collapse">
                Collapse/Expand
              </a>
            </p>
          </div>
          <div
            id="collapsible-message-accordion-8"
            className="message-body is-collapsible"
            data-parent="accordion_first"
          >
            <div className="message-body-content">
            <div class="container">
           
            <h2 class="title2">Course Policies</h2>

                    <Policies/>

                
              </div>
            </div>
          </div>
        </article>

          
      
        </div>
      )
    }
  }
  export default Collapsible;