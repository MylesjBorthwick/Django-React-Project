import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import './Components.css';



class Calculator extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        notes: "",
      
      };
  
    }

handleClick=()=>{
    console.log(this.state);
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