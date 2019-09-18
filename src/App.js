import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Events from "./components/Events";
import UserList from "./components/UserList";
import PublishedLists from "./components/PublishedLists";
import Footer from "./components/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/myList" component={UserList} />
            <Route path="/publishedLists" component={PublishedLists} />
            <Route path="/events" component={Events} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
