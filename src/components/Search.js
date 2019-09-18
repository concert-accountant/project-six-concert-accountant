import React, { Component } from "react";

class Search extends Component {
  render() {
    const { value, searchInput, searchSubmit } = this.props;
    return (
      <div className="search">
        <h2>
          Search <span>Events</span>
        </h2>
        <form className="searchBar" onSubmit={searchSubmit}>
          <label htmlFor="userSearch" className="visuallyHidden">
            Search Events
          </label>
          <input
            type="text"
            id="userSearch"
            name="userSearch"
            placeholder="Search Event, Show, Artist..."
            value={value}
            onChange={searchInput}
          />
          <button className="searchButton" type="submit" value="Submit">
            Find Events
          </button>
        </form>
        <h3 className="searchResults">Events:</h3>
      </div>
    );
  }
}

export default Search;
