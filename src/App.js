import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Events from "./components/Events";
import UserList from "./components/UserList";
import PublishedLists from "./components/PublishedLists";
import Footer from "./components/Footer";
// import firebase from "./firebase"
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/myList" component={UserList} />
          <Route path="/publishedLists" component={PublishedLists} />
          <Route path="/events" component={Events} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
