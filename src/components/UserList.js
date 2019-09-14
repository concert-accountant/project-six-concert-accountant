import React, { Component } from "react";
import firebase from "../firebase";

class UserList extends Component {

  // removeTestItem(testItemId) {
  //   const dbRef = firebase.database().ref();
  //   dbRef.child(testItemId).remove();
  // }

  render() {
    return (
      <div className="wrapper">
        
          <h2>User List</h2>
          {/* <div>
            {this.state.test.map(testItem => {
              return (
                <li key={testItem.key}>

                  <p>{testItem.name}</p>
                  <button
                    onClick={() => this.removeTestItem(testItem.key)}
                  >
                    {" "}
                    Remove Item{" "}
                  </button>
                </li>
              );
            })}

          </div> */}
        
      </div>
    );
  }
}
export default UserList;
