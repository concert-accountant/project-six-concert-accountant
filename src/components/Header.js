import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDetails from './UserDetails';

class Header extends Component {

  render() {
    // const {} = this.props;
    return (
      <header>
        <nav className="navBar">
          <h4>Concert Accountant</h4>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/events">Search Events</Link>
            </li>
            <li>
              <Link to="/myList">My List</Link>
            </li>
            <li>
              <Link to="/publishedLists">Published Lists</Link>
            </li>
          </ul>
        </nav>
        <h1>Concert Accountant</h1>
      </header>
    );
  }
}
export default Header;
