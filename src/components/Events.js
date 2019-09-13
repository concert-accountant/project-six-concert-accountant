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
  };

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
