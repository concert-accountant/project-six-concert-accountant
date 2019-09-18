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

  //function to take snapshot of database, and make axios call and filter the results
  getEvents = url => {
    let budget = "";
    firebase
      .database()
      .ref("userData")
      .once("value")
      .then(snapshot => {
        budget = snapshot.val().budget;

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
      }
    );
  };

  //Function to push userInput data to Firebase and increase users budget as they add items
  handleClick = event => {
    if (
      event.priceRanges[0].min + this.state.currentBudget >
      this.state.targetBudget
    ) {
      this.setState({
        redirect: true
      });
    } else {
      this.setState(
        {
          currentBudget: event.priceRanges[0].min + this.state.currentBudget
        },
        () => {
          const dbRef = firebase.database().ref("eventList");
          dbRef.push(event);
          const budgetRef = firebase.database().ref("currentBudget");
          budgetRef.set(this.state.currentBudget);
        }
      );
    }
  };

  //function to redirect to to the users list when they have reach their budget
  budgetCheck = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/myList",
            state: this.props.location.state
          }}
        />
      );
    }
  };

  //get event function and snapshot of database to save budget on page changes
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
        });
      });
  }
  //render displays our components and maps through events array to display results
  render() {
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
                      <a
                        href={event.url}
                        target="_blank"
                        aria-label="go to Ticketmaster's website."
                        rel="noopener noreferrer"
                      >
                        Visit Ticketmaster
                      </a>
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
      </main>
    );
  }
}

export default Events;
