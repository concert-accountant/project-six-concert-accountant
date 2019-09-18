import React, { Component } from "react";
import firebase from "../firebase";
import NavBar from "./NavBar";

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      test: [],
      userInput: "",
      currentBudget: ""
    };
  }

  //push user data to firebase and allows removing items from firebase
  publishList = (test, userData) => {
    const userDataObject = {
      userName: userData.userName,
      userList: userData.listName,
      userBudget: userData.budget,
      eventsList: test
    };
    const dbRef = firebase.database().ref("publishList");
    dbRef.push(userDataObject);

    const removeRef = firebase.database().ref("eventList");
    removeRef.remove();
  };

  //on mount take firebase data, take snapshot, and set states for user details
  componentDidMount() {
    const eventRef = firebase.database().ref("eventList");
    eventRef.on("value", response => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }
      const userRef = firebase.database().ref("userData");
      userRef.once("value").then(snapshot => {
        const userData = snapshot.val();
        this.setState({
          test: newState,
          userData: userData
        });
      });
    });
  }

  //function to remove items from user list
  removeTestItem = testItemId => {
    let removedPrice = testItemId.name.priceRanges[0].min;
    let snapshotBudget = "";
    firebase
      .database()
      .ref("currentBudget")
      .once("value")
      .then(snapshot => {
        snapshotBudget = snapshot.val();
        this.setState(
          {
            currentBudget: snapshotBudget - removedPrice
          },
          () => {
            const budgetRef = firebase.database().ref("currentBudget");
            budgetRef.set(this.state.currentBudget);

            const dbRef = firebase.database().ref("eventList");
            dbRef.child(testItemId.key).remove();
          }
        );
      });
  };

  render() {
    return (
      <React.Fragment>
        <main>
          <NavBar />
          <div className="search wrapper">
            <h2>
              User <span> List</span>
            </h2>
            <div className="publish">
              <button
                className="publishButton"
                onClick={() =>
                  this.publishList(this.state.test, this.state.userData)
                }
              >
                {" "}
                Publish List
              </button>
            </div>
            <div className="events">
              {this.state.test.map(event => {
                return (
                  <div className="eventContainer" key={event.key}>
                    <div className="imageContainer">
                      <img
                        src={event.name.images[2].url}
                        alt={event.name.name}
                      />
                    </div>
                    <div className="infoContainer">
                      <h3>Event Name: {event.name.name}</h3>
                      <a
                        href={event.name.url}
                        target="_blank"
                        aria-label="go to Ticketmaster's website."
                        rel="noopener noreferrer"
                      >
                        Ticketmaster Link
                      </a>
                      <div className="dataContainer">
                        <p>
                          <span>Genre:</span>{" "}
                          {event.name.classifications[0].genre.name}
                        </p>
                        <p>
                          <span>Date:</span> {event.name.dates.start.localDate}
                        </p>
                        <p>
                          <span>Time:</span> {event.name.dates.start.localTime}
                        </p>
                        <p>
                          <span>Venue:</span>{" "}
                          {event.name._embedded.venues[0].name}
                        </p>
                      </div>
                    </div>
                    <div className="budgetInputs">
                      <p>
                        Price: <span>${event.name.priceRanges[0].min}</span>
                      </p>
                      <button
                        className="removeButton"
                        onClick={() => this.removeTestItem(event)}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
export default UserList;
