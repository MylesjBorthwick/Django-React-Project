import 'bulma/css/bulma.css';
import React, { useState, useEffect , Component} from 'react'
import axios from 'axios'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';

const URL = 'https://jsonplaceholder.typicode.com/users'

class Products extends React.Component {

  constructor(props) {
    super(props);

    //  this.state.products = [];
    this.state = {};
    this.state.filterText = "";
    this.state.products = [
      {
        id: 1,
        price: 'Have a deep understanding, and practical knowledge of object oriented analysis, design, and development.',
        name: 'football'
      }, {
        id: 2,

        price: 'Design and develop software programs in Java.',
        name: 'baseball'
      }, {
        id: 3,
    
        price: 'Define the concepts of object-oriented design, such as inheritance and polymorphism.',
        name: 'basketball'
      }, {
        id: 4,
        price: 'Design and develop client-server applications.',
        name: 'iPod Touch'
      }
    ];

  }
  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {
    var id = 0;
    var product = {
      id: id,
      name: "",
      price: "",
    }
    this.state.products.push(product);
    this.setState(this.state.products);

  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
var products = this.state.products.slice();
  var newProducts = products.map(function(product) {

    for (var key in product) {
      if (key == item.name && product.id == item.id) {
        product[key] = item.value;

      }
    }
    return product;
  });
    this.setState({products:newProducts});
  //  console.log(this.state.products);
  };
  render() {

    return (
      <div>
        <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
      </div>
    );

  }

}


class ProductTable extends React.Component {

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
    });
    return (
      <div>


        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Learning Outcome</th>
              <th>Remove</th>
          
            </tr>
          </thead>

          <tbody>
            {product}
          </tbody>

        </table>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>

      </div>
    );

  }

}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  render() {

    return (
      <tr className="eachRow">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "id",
          value: this.props.product.id,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "price",
          value: this.props.product.price,
          id: this.props.product.id
        }}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
      </tr>
    );

  }

}
class EditableCell extends React.Component {

  render() {
    return (
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

} 


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
                    <h1 id='title'>At the end of this course, you will be able to: </h1>
                      <table id='employee'>

                          <tbody>
                            < Products / >
 
                          </tbody>
                      </table>
                    </h2>
                  </div>
                </section>

                <section class="section">
                  <div class="container">
                    <h1 class="title">Final Grade Determination</h1>
                    <h2 class="subtitle">
                    <h1 id='title'>The final grade for this course will be based on the following: </h1>
               
                 
                      <table id='employee'>
                          <tbody>
                               < Products / > ;
 
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
