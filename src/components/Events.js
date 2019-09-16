import React, { Component } from "react";
// import ReactDOM from "react-dom";
import Search from "./Search";
import axios from "axios";
// import Modal from "./Modal";
import firebase from "../firebase";

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
      location: "Toronto",
      classification: "music",
      query: "&keyword=",
      priceInfo: "",
      minPrice: 0,
      maxPrice: 1,
      test: [],
      userInput: "",
      searchTerms: "",
      noResult: "",
      isShowing: false
    };
  }

  //axios call to get initial array of events based on city
  getEvents = url => {
    axios({
      method: "GET",
      url: url,
      dataResponse: "json",
      params: {
        apikey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu",
        city: this.state.location,
        classificationName: this.state.classification
      }
    })
      .then(results => {
        if (results.length !== 0) {
          results = results.data._embedded.events;
          // results.length = 10;
          this.setState({
            events: results,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: true,
            events: []
          });
        }
        //call filterResults Function to filter through the array and only return desired items
        this.filterResults();
        console.log("new results array", this.state.filteredEvents);
      })
      .catch(() => {
        this.setState({
          noResult: "Sorry, your search had no results! Try Again?",
          isLoading: false,
          events: []
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
    console.log(this.state.searchTerms);
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
        console.log("updated url", this.state.url);
      }
    );
  };

  //Function to push userInput data to Firebase
  handleClick = event => {
    // e.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push(event);
  };

  //Modal Functions to Show and Hide
  // openModal = () => {
  //   this.setState({
  //     isShowing: true
  //   });
  // };

  // closeModal = () => {
  //   this.setState({
  //     isShowing: false
  //   });
  // };

  //functions and data to run when component loads
  componentDidMount() {
    this.getEvents(this.state.url);
  }

  render() {
    return (
      <main>
        <div className="wrapper">
          <Search
            value={this.state.search}
            searchInput={this.searchInput}
            searchSubmit={this.searchSubmit}
          />
          <div className="events">
            {this.state.noResult && <p>{this.state.noResult}</p>}
            {this.state.isLoading ? (
              <p>...Loading</p>
            ) : (
              this.state.filteredEvents.map(event => {
                return (
                  <div className="eventContainer" key={event.id}>
                    <div className="imageContainer">
                      <img src={event.images[2].url} alt={event.name} />
                    </div>
                    <div className="infoContainer">
                      <h3>{event.name}</h3>
                      <p>Genre: {event.classifications[0].genre.name}</p>
                      <p>Date: {event.dates.start.localDate}</p>
                      <p>Time: {event.dates.start.localTime}</p>
                      <p>Venue: {event._embedded.venues[0].name}</p>

                      <p>
                        <a href={event.url}>Visit Ticketmaster</a>
                      </p>
                    </div>
                    <div className="budgetInputs">
                      {event.priceRanges[0].min === event.priceRanges[0].max ? (
                        <p>
                          Price: <span>{event.priceRanges[0].min}</span>
                        </p>
                      ) : (
                        <p>
                          Price range:{" "}
                          <span>
                            {event.priceRanges[0].min} -{" "}
                            {event.priceRanges[0].max}
                          </span>
                        </p>
                      )}
                      <button
                        value={event.name}
                        onClick={() => this.handleClick(event)}
                      >
                        Add Item
                      </button>
                      {/* {console.log(event.name)} */}
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
