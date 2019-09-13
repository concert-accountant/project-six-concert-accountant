import React, { Component } from "react";
import axios from "axios";

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
      maxPrice: 1
    };
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
    if (this.state.filteredEvents) {
      console.log("filtered events bbbby", this.state.filteredEvents);
    //   this.setState.minPrice = this.state.filteredEvents.priceRanges[0].min;
    //   this.setState.maxPrice = this.state.filteredEvents.priceRanges[0].max;
    //   if (this.state.minPrice === this.state.maxPrice) {
    //     this.setState.priceInfo = `Price: ${this.state.minPrice}`;
    //   } else {
    //     this.setState.priceInfo = `Price Range: ${this.state.minPrice} - ${this.state.maxPrice}`;
    //   }
    // } else {
    //   this.setState.priceInfo = "Price Unavailable";
    }
  };

  // eventPrices = events => {
  //   let priceInfo = "";
  //   if (events.priceRanges) {
  //     let minPrice = events.priceRanges[0].min;
  //     let maxPrice = events.priceRanges[0].max;
  //     if (minPrice === maxPrice) {
  //       priceInfo = `Price: ${minPrice}`;
  //     } else {
  //       priceInfo = `Price Range: ${minPrice} - ${maxPrice}`;
  //     }
  //   } else {
  //     priceInfo = "Price Unavailable";
  //   }
  //   return priceInfo;
  // };

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <main>
        <div className="events">
          {this.state.isLoading ? (
            <p>...Loading</p>
          ) : (
            this.state.filteredEvents.map(event => {
              // console.log("priceInfo:", this.state.priceInfo);
              // console.log(event.priceRanges[0].min);
              return (
                <div className="eventContainer" key={event.id}>
                  <h3>Title: {event.name}</h3>
                  <p>Start Date: {event.dates.start.localDate}</p>
                  <p>Info: {event.info}</p>
                  <p>{this.state.priceInfo}</p>
                  {/* <p>Min price: {event.priceRanges[0].min}</p> */}
                  {/* <p>Max price: {event.priceRanges[0].max}</p> */}
                  <p>
                    <a href={event.url}>TicketMaster Link</a>
                  </p>
                  <img src={event.images[0].url} alt={event.name} />
                </div>
              );
            })
          )}
        </div>
      </main>
    );
  }
}
export default Events;
