import React, { Component } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import axios from "axios";
// import firebase from "./firebase"
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      isLoading: true,
      apiKey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu",
      secret: "6RHq8MbsPw41lPHG"
    };
  }

  getEvents = () => {
    axios({
      method: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json",
      dataResponse: "json",
      params: {
        apikey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu"
      }
    }).then(results => {
      results = results.data._embedded.events;
      results.length = 10;
      console.log(results);
      this.setState({
        events: results,
        isLoading: false
      });
    });
  };

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        {this.state.isLoading ? (
          <p>...Loading</p>
        ) : (
          this.state.events.map(event => {
            return (
              <div key={event.id}>
                <h3>Title: {event.name}</h3>
                <p>Start Date: {event.dates.start.localDate}</p>
                <p>Info: {event.info}</p>
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
        <Footer />
      </div>
    );
  }
}

export default App;
