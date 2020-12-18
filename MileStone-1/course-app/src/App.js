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
        category: 'Sporting Goods',
        price: '49.99',
        qty: 12,
        name: 'football'
      }, {
        id: 2,
        category: 'Sporting Goods',
        price: '9.99',
        qty: 15,
        name: 'baseball'
      }, {
        id: 3,
        category: 'Sporting Goods',
        price: '29.99',
        qty: 14,
        name: 'basketball'
      }, {
        id: 4,
        category: 'Electronics',
        price: '99.99',
        qty: 34,
        name: 'iPod Touch'
      }, {
        id: 5,
        category: 'Electronics',
        price: '399.99',
        qty: 12,
        name: 'iPhone 5'
      }, {
        id: 6,
        category: 'Electronics',
        price: '199.99',
        qty: 23,
        name: 'nexus 7'
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
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: "",
      price: "",
      category: "",
      qty: 0
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
              <th>Name</th>
              <th>price</th>
              <th>quantity</th>
              <th>category</th>
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
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "price",
          value: this.props.product.price,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "qty",
          value: this.props.product.qty,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "category",
          value: this.props.product.category,
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


// class CourseObjectives extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list: [
//         { id: '1', objective: "" },
//       ],
//     };

//     onUpdateItems = () => {
//       this.setState(state => {
//         const list = state.list.map(item => {id});
   
//         return {
//           list,
//         };
//       });
//     };

//     onRemoveItems = i => {
//       this.setState(state => {
//         const list = state.list.filter((j, objective) => i !== j);
//         if (list == []){
//           list = [
//             { id: '1', objective: "" }
//           ]
//         }
//         return {
//           list,
//         };
//       });
//     };
//   }
// }


// const courseObjectives = [
//   {
//     id: 1,
//     name: ' ',
//   },
// ];

// const listReducer = (state, action) => {
//   switch (action.type) {
//     case 'REMOVE_ITEM':
//       return {
//         ...state,
//         list: state.list.filter((item) => item.id !== action.id),
//       };
//     default:
//       throw new Error();
//   }
// };



function App() {


  // const [objectivesList, setObjectivesList] = React.useState({
  //   list: courseObjectives,
  //   isShowList: true,
  // });
 
  // function handleChange(event, id) {
  //   //setObjectivesList(event.target.value);
  // }
  // function handleRemove(id) {
  //   setObjectivesList({ type: 'REMOVE_ITEM', id });
  // }
  // function handleAdd() {
  //   const newList = objectivesList.concat({ name:" ", id: uuidv4() });
  //   setObjectivesList(newList);
  // }
  // if (!objectivesList.isShowList) {
  //   return null;
  // }



  const addRow = () => {

}


    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setEmployees(response.data)
    }

    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del)
        })
    }

    const renderHeader = () => {
        let headerElement = ['Objective Number', 'Objective Description', 'Remove']

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    const renderBody = () => {
      return employees && employees.map(({ id, name}) => {
        return (
            <tr key={id}>
                <td contenteditable='false'>{id}</td>
                <td contenteditable='true'>{name}</td>
                <td className='opration'>
                    <button className='button' onClick={() => removeData(id)}>Delete</button>
                </td>
            </tr>
            
        )
    })
  }



    const renderHeaderGrades = () => {
      let headerElement = ['Component', 'Learning Outcome(s) Evaluated', 'Weight','Remove']

      return headerElement.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  const renderBodyGrades = () => {
    return employees && employees.map(({ id, name, email}) => {
        return (
            <tr key={id}>
                <td contenteditable='false'>{id}</td>
                <td contenteditable='true'>{name}</td>
                <td contenteditable='true'>{email}</td>
                <td className='opration'>
                    <button className='button' onClick={() => removeData(id)}>Delete</button>
                </td>
            </tr>
            
        )
    })
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
                      <table id='employee'>

                          <tbody>
                              ReactDOM.render( < Products / > , document.getElementById('container'));
 
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
                      <table id='employee'>
                          <thead>
                              <tr>{renderHeaderGrades()}</tr>
                          </thead>
                          <tbody>
                              {renderBodyGrades()}
                              <div>
                                <button className='add-row-button' onClick={() => addRow()}>Add Row</button>
                              </div>
                          </tbody>
                      </table>
                  

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
