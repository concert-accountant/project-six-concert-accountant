import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navBar">
        <h4>
          <span>Concert</span> Accountant
        </h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
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
    );
  }
}
export default NavBar;
