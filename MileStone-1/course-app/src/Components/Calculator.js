import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';
import axios from "axios";


async function update_Django_backend(state) {
    var API_URL = "http://localhost:8000/api/calculator_use/";
    axios.post(API_URL, state).then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      }, (error) => {
        console.log(error.request);
        console.log(error);
      });
      
      //may somehow get away with doing it without duplicates
      axios.put(`http://localhost:8000/api/calculator_use/${state.id}`, state).then((response) => {
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

  async function update_Django(state) {
    const response = await update_Django_backend(state);
    return response;
  }

class Calculator extends React.Component {

    constructor(props) {
      super(props);
      var API_URL = "http://localhost:8000/api/calculator_use/";

      this.state = {
        id: 1,
        notes: "",
        course_outline_id: 101,
      };

      axios
      .get(API_URL)
      .then(res => {
          this.setState(res.data[0]);  
        })
      .catch(err => console.log(err));   


    }
    componentDidUpdate(prevProps){
      if(this.props.isClicked !== prevProps.isClicked){
         this.setState({
          id: 1,
          notes: "",
          course_outline_id: 101,
       });
       //console.log(update_Django(this.state));
      }
     }



handleClick=()=>{
    console.log(this.state);
    console.log(update_Django(this.state));

}

handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

render(){
   
    return(
        <div class="columns is-mobile is-centered">
        <div class="column is-half">
        <div>
            
            <div class="control">
                    <textarea
                      class="textarea is-info is"
                      placeholder="Enter Calculator Rules"
                      rows="4"
                      name = 'notes'
                      value = {this.state.notes}
                      onChange={this.handleChange}
                      />
                  </div>
                         

                <button onClick={this.handleClick} className="button is-warning is-rounded is-medium">Update Form</button>

        </div>
        </div>
        </div>
    )
}

}
export default Calculator