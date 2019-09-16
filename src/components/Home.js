import React, { Component } from "react";
import UserDetails from "./UserDetails";


class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <h1><span>Concert</span> Accountant</h1>
          <UserDetails getUserInput={this.getUserInput} />
        </header>
      </div>
    );
  }
}
export default Home;
