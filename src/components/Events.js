import React, { Component } from "react";
import Search from "./Search";
import axios from "axios";
import firebase from "../firebase";
import NavBar from "./NavBar";
import { Redirect } from "react-router-dom";

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      filteredEvents: [],
      isLoading: true,
      apiKey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu",
      secret: "6RHq8MbsPw41lPHG",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?",
      baseUrl:
        "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu&classificationName=music",
      city: "Toronto",
      classification: "music",
      query: "&keyword=",
      currentBudget: 0,
      targetBudget: 0,
      test: [],
      userInput: "",
      searchTerms: "",
      noResult: "",
      isShowing: false,
      redirect: false
    };
  }

  //axios call to get initial array of events based on city
  getEvents = url => {
    let budget = "";
    firebase
      .database()
      .ref("userData")
      .once("value")
      .then(snapshot => {
        budget = snapshot.val().budget;
        // console.log("snapshot budget", snapshot.val().budget);

        axios({
          method: "GET",
          url: url,
          dataResponse: "json",
          params: {
            apikey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu",
            city: this.state.city,
            classificationName: this.state.classification
          }
        })
          .then(results => {
            if (results.length !== 0) {
              results = results.data._embedded.events;
              // results.length = 10;
              this.setState({
                events: results,
                isLoading: false,
                noResult: "",
                targetBudget: budget
              });
            } else {
              this.setState({
                isLoading: true,
                events: []
              });
            }
            //call filterResults Function to filter through the array and only return desired items
            this.filterResults();
            // console.log("new results array", this.state.filteredEvents);
            // console.log(this.props.location.state.budget);
          })
          .catch(() => {
            this.setState({
              noResult: "Sorry, your search had no results! Try Again?",
              isLoading: false,
              events: []
            });
          });
      });
  };

  //function to filter through the events array in state and take out events that don't have a priceRange and then again for items that have a priceRange but no min/max price in the array
  filterResults = () => {
    const resultsCopy = [...this.state.events];
    const priceResults = resultsCopy.filter(singleEvent => {
      return singleEvent.priceRanges;
    });
    const withPrice = priceResults.filter(hasPrice => {
      return hasPrice.priceRanges[0].min && hasPrice.priceRanges[0].max;
    });
    this.setState({
      filteredEvents: withPrice
    });
  };

  //function to store search input data in search component
  searchInput = event => {
    this.setState({
      searchTerms: event.target.value
    });
    // console.log(this.state.searchTerms);
  };

  //function to handle form submit and show results in search component
  searchSubmit = e => {
    e.preventDefault();
    //add query into const and url between the two
    const { baseUrl, query, searchTerms } = this.state;
    this.setState(
      () => {
        return {
          url: `${baseUrl}${query}${searchTerms}`,
          searchTerms: ""
        };
      },
      () => {
        this.getEvents(this.state.url);
        // console.log("updated url", this.state.url);
      }
    );
  };

  //Function to push userInput data to Firebase
  handleClick = event => {
    // console.log(event.priceRanges[0].min);
    if (
      event.priceRanges[0].min + this.state.currentBudget >
      this.state.targetBudget
    ) {
      this.setState({
        redirect: true,
        // currentBudget: event.priceRanges[0].min + this.state.currentBudget
      });
    } else {
      this.setState({
        currentBudget: event.priceRanges[0].min + this.state.currentBudget,
      }, () => {
          const dbRef = firebase.database().ref("eventList");
          dbRef.push(event);
          const budgetRef = firebase.database().ref("currentBudget");
          budgetRef.set(this.state.currentBudget);
      });
      
    }
    //if below is greater than .location.budget
    //set redirect to true
    // this.setState({
    //   currentBudget: event.priceRanges[0].min + this.state.currentBudget
    // redirect:
    // });
    //else
    // this.setState({
    //   currentBudget: event.priceRanges[0].min + this.state.currentBudget
    // });
  };

  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   });
  // };

  budgetCheck = () => {
    if (this.state.redirect) {
      // alert("Yo you dummy you spent too much dudzes");
      return (
        <Redirect
          to={{
            pathname: "/myList",
            state: this.props.location.state
          }}
        />
      );
    }
    // else {
    //   console.log("your budget is:", this.state.currentBudget);
    // }
  };

  //functions and data to run when component loads
  componentDidMount() {
    this.getEvents(this.state.url);

    let previousBudget = "";
    firebase
      .database()
      .ref("currentBudget")
      .once("value")
      .then(snapshot => {
        previousBudget = snapshot.val();
        this.setState({
          currentBudget: previousBudget
        })
      })
  }

  // componentDidUpdate() {
  //   this.budgetCheck();
  //   console.log(this.state.currentBudget);
  // }

  render() {
    console.log("your budget is:", this.state.currentBudget);
    console.log("budget", this.state.targetBudget);
    return (
      <main>
        <NavBar location={this.props.location.state} />
        <div className="wrapper">
          <Search
            value={this.state.search}
            searchInput={this.searchInput}
            searchSubmit={this.searchSubmit}
          />
          <div className="noResults">
            {this.state.noResult && <p>{this.state.noResult}</p>}
          </div>
          <div className="events">
            {this.state.isLoading ? (
              <p className="loading">...LOADING</p>
            ) : (
              this.state.filteredEvents.map(event => {
                return (
                  <div className="eventContainer" key={event.id}>
                    <div className="imageContainer">
                      <img src={event.images[2].url} alt={event.name} />
                    </div>
                    <div className="infoContainer">
                      <h3>{event.name}</h3>
                      <a href={event.url}>Visit Ticketmaster</a>
                      <div className="dataContainer">
                        <p>
                          <span>Genre:</span>{" "}
                          {event.classifications[0].genre.name}
                        </p>
                        <p>
                          <span>Date:</span> {event.dates.start.localDate}
                        </p>
                        <p>
                          <span>Time:</span> {event.dates.start.localTime}
                        </p>
                        <p>
                          <span>Venue:</span> {event._embedded.venues[0].name}
                        </p>
                      </div>
                    </div>
                    <div className="budgetInputs">
                      {event.priceRanges[0].min === event.priceRanges[0].max ? (
                        <p>
                          Price: <span>${event.priceRanges[0].min}</span>
                        </p>
                      ) : (
                        <p>
                          Price range:{" "}
                          <span>
                            ${event.priceRanges[0].min} - $
                            {event.priceRanges[0].max}
                          </span>
                        </p>
                      )}
                      {this.budgetCheck()}
                      <button
                        disabled={
                          this.state.currentBudget > this.state.targetBudget
                        }
                        className="addItem"
                        // value={event.name}
                        onClick={() => this.handleClick(event)}
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div></div>
      </main>
    );
  }
}

export default Events;
