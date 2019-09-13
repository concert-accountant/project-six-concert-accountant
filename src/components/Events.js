import React, { Component } from "react";
import Search from './Search';
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
      location: "Toronto",
      priceInfo: "",
      minPrice: 0,
      maxPrice: 1,
      test: [],
      userInput: '',
    };
  }

  handleChange = (e) => {
    this.setState({userInput: e.target.value})
  }

  handleClick = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push(this.state.userInput);
    this.setState({
      userInput: ""
    })
  }

  removeTestItem(testItemId) {
    const dbRef = firebase.database().ref();
    dbRef.child(testItemId).remove();
  }

  getEvents = () => {
    axios({
      method: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?",
      dataResponse: "json",
      params: {
        apikey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu",
        city: this.state.location,
        classificationName: "music"
        // id: "1778vpG65T-dA3a"
      }
    }).then(results => {
      results = results.data._embedded.events;
      // results.length = 10;
      console.log("results", results);
      this.setState({
        events: results,
        isLoading: false
      });
      this.filterResults();
      console.log("new results array", this.state.filteredEvents);
    });
  };

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

  componentDidMount() {
    this.getEvents();
    
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({key: key, name: data[key]});
      }
      this.setState({
        test: newState
      });
      // console.log(response.val());
    });
  }

  render() {
    return (
      <main>
        <div className = "wrapper">
        
        <Search />
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
                  <img src={event.images[0].url} alt={event.name} />
                  
                  <div>
                    {this.state.test.map((testItem) => {
                      return (
                        <li key={testItem.key}>
                          {/* <p>{testItem.name} - {testItem.key}</p>
            </li>
            <li key={i}> */}
                          <p>{testItem.name}</p>
                          <button onClick={() => this.removeTestItem(testItem.key)}> Remove Item </button>
                        </li>)
                    })}
                    <form action="submit">
                      <label htmlFor="newTestItem">Add a test item to your test</label>
                      <input
                        type="text"
                        id="newItem"
                        onChange={this.handleChange}
                        value={this.state.userInput} />

                      <button onClick={this.handleClick}>Add Test Item</button>

                    </form>
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
