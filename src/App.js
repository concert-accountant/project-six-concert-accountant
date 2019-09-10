import React, { Component } from "react";
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
// import axios from "axios";
// import firebase from "./firebase"
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      apiKey: "RzVQVthdwCGvl8TaJVeNTb3nxVceKaFu",
      secret: "6RHq8MbsPw41lPHG"
    };
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
