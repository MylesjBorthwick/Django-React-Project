import "bulma/css/bulma.css";
import React, { useState, useEffect, Component } from "react";

import "./App.scss";

import Collapsible from "./Components/Collapsible";
import axios from "axios";

const App =()=> {

  const [isClicked, setIsClicked] = useState(false); 

  async function update_Django_backend() {
    var API_URL = "http://localhost:8000/api/master_update/";

    return  axios.delete(API_URL).then((response) => {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    }, (error) => {
      console.log(error.request);
      console.log(error);
    }); 
  }

  async function update_Django() {
    const response = await update_Django_backend();
    return response;
  }


  const createNew = () => {
    const response = update_Django();

    setIsClicked(!isClicked);

    console.log('button pressed');
    console.log(response);
  };

  return (
    <div className="App">
      <section class="hero is-dark is-bold">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-1">Course Creation Form</h1>
            <h2 class="subtitle">Edit form by section or create new form</h2>

            
            <div className="container is full-width">
              <Collapsible isClicked={isClicked}/>
            </div>

            <div className="container">
              <div className="column is-multiline is-centered">
                <div className="column is-fullhd"></div>

                <div class="container">
                  <h1 class="title is-1">Create New Course?</h1>
                  <div class="control">
                    <button
                      class="button is-primary is-large is-rounded is-halfwidth"
                      onClick={createNew}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
