import React, { Component } from "react";
import axios from "axios";

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      isLoading: true,
      apiKey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu",
      secret: "6RHq8MbsPw41lPHG",
      location: "Kelowna",
      priceString: "hello"
    };
  }

  getEvents = () => {
    axios({
      method: "GET",
      url:
        "https://app.ticketmaster.com/discovery/v2/events.json?",
      dataResponse: "json",
      params: {
        apikey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu",
        city: this.state.location,
        id: "1778vpG65T-dA3a"
      }
    }).then(results => {
      results = results.data._embedded.events;
      
      // results.length = 10;
      console.log("results", results);
      this.setState({
        events: results,
        isLoading: false
      });      
      // if (this.state.events) {
      //   console.log("hello from if", this.state.events);
      //   let minPrice = this.state.events.priceRanges[0].min;
      //   let maxPrice = this.state.events.priceRanges[0].max;
      //   console.log("maxPrice", maxPrice);
      //   if (minPrice === maxPrice) {
      //     this.setState.priceString = `Price: ${minPrice}`;
      //   } else {
      //     this.setState.priceString = `Price Range: ${minPrice} - ${maxPrice}`;
      //   }
      // } else {
      //   this.setState.priceString = "Price Unavailable";
      //   console.log("hello from else", this.state.events);
      // }
    });
  };

  // eventPrices = events => {
  //   let priceString = "";
  //   if (events.priceRanges) {
  //     let minPrice = events.priceRanges[0].min;
  //     let maxPrice = events.priceRanges[0].max;
  //     if (minPrice === maxPrice) {
  //       priceString = `Price: ${minPrice}`;
  //     } else {
  //       priceString = `Price Range: ${minPrice} - ${maxPrice}`;
  //     }
  //   } else {
  //     priceString = "Price Unavailable";
  //   }
  //   return priceString;
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
            this.state.events.map(event => {
              console.log("pricestring:", this.state.pricestring);
              return (
                <div className="eventContainer" key={event.id}>
                  <h3>Title: {event.name}</h3>
                  <p>Start Date: {event.dates.start.localDate}</p>
                  <p>Info: {event.info}</p>
                  {/* <p>{`${this.state.priceString}`}</p> */}
                  <p>Min price: {event.priceRanges[0].min}</p>
                  <p>Max price: {event.priceRanges[0].max}</p>
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
