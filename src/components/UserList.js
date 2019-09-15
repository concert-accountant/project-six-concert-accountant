import React, { Component } from "react";
import firebase from "../firebase";

class UserList extends Component {
  constructor() { 
    super();
    this.state = {
      test: [],
      userInput: "",
    }
  }
  

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", response => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }
      this.setState({
        test: newState,
      });
    });
    
  }

  removeTestItem(testItemId) {
    const dbRef = firebase.database().ref();
    dbRef.child(testItemId).remove();
  }

  render() {
    return (
      <div className="wrapper">
        
          <h2>User List</h2>
          <div>
            {this.state.test.map(event => {
              return (
                <li key={event.key}>

                  <p>{event.name.name}</p>
                  <p>{event.name.url}</p>
                  <p>{event.name.priceRanges[0].min}</p>
                  <button onClick={() => this.removeTestItem(event.key)}>Remove Item
                  </button>
                </li>
              );
            })}

          </div>
        {/* {console.log(this.state.test)} */}
      </div>
    );
    
  }
}
export default UserList;
