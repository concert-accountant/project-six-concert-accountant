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
  
  
  publishList = (test, userData) => {
    const userDataObject = {
      userName: userData.userName,
      userList: userData.listName,
      userBudget: userData.budget,
      eventsList: test
    }
    const dbRef = firebase.database().ref("publishList")
    dbRef.push(userDataObject);
    // console.log(userDataObject);    
  };

  componentDidMount() {
    const eventRef = firebase.database().ref("eventList");
    eventRef.on("value", response => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }
      const userRef = firebase.database().ref("userData");
      userRef.once("value").then((snapshot) => {
        const userData = snapshot.val()
        console.log(userData)
        this.setState({
          test: newState,
          userData: userData
        });
      })      
    });
    
  }

  removeTestItem(testItemId) {
    const dbRef = firebase.database().ref("eventList");
    dbRef.child(testItemId).remove();
  }

  render() {
    // const { location } = this.props;
    return (
      <React.Fragment>
        <NavBar />
      <div className="wrapper">
          <h2>User List</h2>
          <div>
            {this.state.test.map(event => {
              return (
                <li className="eventContainer" key={event.key}>

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
              <button className="publishButton" onClick={() => this.publishList(this.state.test, this.state.userData)}> Publish List
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
