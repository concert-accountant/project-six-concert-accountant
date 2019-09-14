import React, { Component } from "react";
import Search from "./Search";
import axios from "axios";
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
      noResults: ""
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
    }).then(results => {
      results = results.data._embedded.events;
      if (results.length !== 0) {
        // results.length = 10;
        this.setState({
          events: results,
          isLoading: false
        });
      } else if (results.length === 0) {
        this.setState({
          noResult:
            "Sorry, your search had no results! Make sure you put commas between search terms.",
          isLoading: false,
          events: []
        });
      } else {
        this.setState({
          events: results,
          isLoading: false,
          noResult: null
        });
      }
      //call filterResults Function to filter through the array and only return desired items
      this.filterResults();
      console.log("new results array", this.state.filteredEvents);
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

  ///////////////////////////////////
  /////////Working on it/////////////
  //////////////////////////////////
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

  //Function to setstate for userInput when button is pressed
  handleChange = e => {
    this.setState({
      userInput: e.target.value
    });
  };

  //Function to push userInput data to Firebase


  handleClick = e => {

    e.preventDefault();

    const dbRef = firebase.database().ref();

    this.setState({

      userInput: e.target.value

    }, () => dbRef.push(this.state.userInput));
    console.log(this.state.userInput)

  }


  //Function to remove items when remove button is clicked and store in firebase
  removeTestItem(testItemId) {
    const dbRef = firebase.database().ref();
    dbRef.child(testItemId).remove();
  }

  //functions and data to run when component loads
  componentDidMount() {
    this.getEvents(this.state.url);

    const dbRef = firebase.database().ref();
    dbRef.on("value", response => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }
      this.setState({
        test: newState
      });
    });
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
            {this.state.isLoading ? (
              <p>...Loading</p>
            ) : (
              this.state.filteredEvents.map(event => {
                return (
                  <div className="eventContainer" key={event.id}>
                    <h3>Title: {event.name}</h3>
                    <p>Start Date: {event.dates.start.localDate}</p>
                    <p>Info: {event.info}</p>
                    {event.priceRanges[0].min === event.priceRanges[0].max ? (
                      <p>the price: {event.priceRanges[0].min}</p>
                    ) : (
                      <p>
                        The price range: {event.priceRanges[0].min} -{" "}
                        {event.priceRanges[0].max}
                      </p>
                    )}
                    <p>
                      <a href={event.url}>TicketMaster Link</a>
                    </p>
                    
                    <img src={event.images[2].url} alt={event.name} />

                    <div>
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
                      <button value={event.name} onClick={this.handleClick}>Add Item</button>
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
