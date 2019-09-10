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
      url: "https://app.ticketmaster.com/discovery/v2/events",
      dataResponse: "json",
      params: {
        format: "json",
        apikey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu"
      }
    }).then(results => {
      results = results.data.events;
      this.setState({
        events: results,
        isLoading: false
      });
    });
  };

  componentDidMount () {
    this.getEvents();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
