import React, { Component } from "react";

class Search extends Component {
    render(){
        return(
            <div className="search">
                <h2>Search Events</h2>
                <label htmlFor="userSearch"></label>
                <input type="text" id="userSearch" placeholder="Search Event, Show, Artist..." className="userSearch"></input>
                <button className="" type="submit" value="Submit">Find Events</button>
        
                {/* <h2>`{this.state.userName}'s Results`</h2>  */}
                <h3 className="searchResults">Search Results</h3>
            </div>
        )
    }
}

export default Search;