import 'bulma/css/bulma.css';
import {useState} from "react";
function App() {
  
  const  [counter, setCounter] = useState(0);
  const  [inputValue, setInputValue] = useState("");

  const decrement = ()=>{setCounter(counter-1)}
  const increment = ()=>{setCounter(counter+1)}

  const handleKeyDown = (e) => {
    if(e.key == "Enter"){
      setCounter(parseInt(inputValue))
    }
  }

  return (
  <div className="App">
    <div claddName="container">
      <div className="columns is multiline">
        <div className="column is-full">
          <div className="notification">
            <div className="columns">
              <div className="column is-half">
                <div className="field has-addons">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter Number" 
                      value = {inputValue}
                      onChange = {(e)=>setInputValue(e.target.value)}
                      onKeyDown = {handleKeyDown}
                      />
                  </div>
                  <div class="control">
                    <a class="button is-info"
                    onClick = {()=> setCounter(parseInt(inputValue))}
                    >Set</a>
                  </div>
                </div>
                <div class="buttons has-addons">
                  <button className="button is-primary"
                  onClick = {()=>setCounter(increment)}
                  
                  >Up</button>
                  <button className="button is-warning"
                  onClick = {()=>setCounter(decrement)}
                  
                  >Down</button>
                </div>
              </div>
              <div className="column is-half">
                <h1 className = "title">{counter}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>);
}

export default App;
