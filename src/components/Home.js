import React, { Component } from "react";
import UserDetails from "./UserDetails";
import NavBar from "./NavBar";


class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Concert Accountant</h1>
          <UserDetails getUserInput={this.getUserInput} />
        </header>
      </div>
    );
  }
}
export default Home;
