import React, { Component } from "react";
import firebase from "../firebase";
import NavBar from "./NavBar";

class PublishedLists extends Component {
  constructor() {
    super();
    this.state = {
      test: [],
      userInput: "",
      userData: []
    };
  }

  //pulls data from firebase on component did mount to display published lists
  componentDidMount() {
    const dbRef = firebase.database().ref("publishList");
    dbRef.on("value", response => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({ key: key, eventList: data[key] });
      }
      this.setState({
        test: newState
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <NavBar />
          <div className="search wrapper">
            <h2>
              Published <span>Lists</span>
            </h2>
            {this.state.test.map((list, i) => {
              return (
                <div className="fullList" key={list.key}>
                  <div className="user">
                    <h3>
                      User Name: <span>{list.eventList.userName}</span>
                    </h3>
                    <h3>
                      List Name: <span>{list.eventList.userList}</span>
                    </h3>
                    <h3>
                      Budget: <span>${list.eventList.userBudget}</span>
                    </h3>
                  </div>
                  <div className="publishedEvents">
                    {list.eventList.eventsList.map(details => {
                      return (
                        <div className="publishContainer" key={details.key + i}>
                          <h4>{details.name.name}</h4>
                          <p>Date: {details.name.dates.start.localDate}</p>
                          <p>
                            Price: $
                            <span>{details.name.priceRanges[0].min}</span>
                          </p>
                          <a
                            href={details.name.url}
                            target="_blank"
                            aria-label="go to Ticketmaster's website."
                            rel="noopener noreferrer"
                          >
                            Ticketmaster Link
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </React.Fragment>
    );
  }
}
export default PublishedLists;
