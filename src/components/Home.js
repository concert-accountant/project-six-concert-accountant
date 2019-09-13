import React, { Component } from "react";
import UserDetails from "./UserDetails";

class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Concert Accountant</h1>
          {/* <p>Shows are expensive! Let us help you create a list of shows that fit your budget. Fill out the info below and let's get started creating the perfect list for you.</p> */}
          <UserDetails getUserInput={this.getUserInput} />
        </header>
      </div>
    );
  }
}
export default Home;
