import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
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
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/myList" component={UserList} />
          <Route path="/publishedLists" component={PublishedLists} />
          <Route path="/events" component={Events} />
          <Footer />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
