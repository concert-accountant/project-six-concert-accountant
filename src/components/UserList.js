import React, { Component } from "react";
import firebase from "../firebase";
import NavBar from "./NavBar";

class UserList extends Component {
  constructor() { 
    super();
    this.state = {
      test: [],
      userInput: "",
    }
  }
  
  publishList = test => {
    const dbRef = firebase.database().ref("publishList");
    dbRef.push(test);
    console.log("test");
    
  };

  componentDidMount() {
    const dbRef = firebase.database().ref("eventList");
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
    const dbRef = firebase.database().ref("eventList");
    dbRef.child(testItemId).remove();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
      <div className="wrapper">
          <h2>User List</h2>
          <div>
            {this.state.test.map(event => {
              return (
                <li className="listContainer" key={event.key}>

                  <div className="imageContainer">
                    <img src={event.name.images[2].url} alt={event.name.name} />
                  </div>
                  
                  <h3>Event Name: {event.name.name}</h3>
                  <p>Price: $ {event.name.priceRanges[0].min}</p>
                  <a href={event.name.url}>Event Link on Ticketmaster</a>
                  
                  <div>
                    <button className="removeButton" onClick={() => this.removeTestItem(event.key)}>Remove Item
                  </button>
                  </div>
                  
                </li>
              );
            })}
            <div>
              <button className="publishButton" onClick={() => this.publishList(this.state.test)}> Publish List
              </button>
            </div>
          </div>
        {/* {console.log(this.state.test)} */}
      </div>
      </React.Fragment>
    );
    
  }
}
export default UserList;
