import React, { Component } from "react";

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      listName: "",
      location: "",
      budget: ""
    };
  }

  handleInputChange = e => {
    e.preventDefault();
    
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

  handleSubmit = e => {
    e.preventDefault();
    const data = this.state
    console.log(data);
  
    };

  render() {
    return (  
      <form className="userInputForm" onSubmit={this.handleSubmit}>
        <p>Let us help you create a list of shows that fit your budget. Fill out your details and let's get started!</p>

        <label htmlFor="userName" className="visuallyHidden">Name</label>
        <input type="text" required id="name" placeholder="Name" name="userName" onChange={this.handleInputChange}></input>

        <label htmlFor="listName" className="visuallyHidden">List Name</label>
        <input type="text" required id="list" placeholder="List" name="listName" onChange={this.handleInputChange}></input>

        <label htmlFor="location" className="visuallyHidden">Location</label>
        <input type="text" required id="location" placeholder="Location" name="location" onChange={this.handleInputChange}></input>

        <label htmlFor="budget" className="visuallyHidden">Budget</label>
        <select name="budget" required id="budget" onChange={this.handleInputChange}>
            <option value="">Select Budget</option>
            <option value="100">$100</option>
            <option value="200">$200</option>
            <option value="300">$300</option>
            <option value="400">$400</option>
            <option value="500+">$500+</option>
        </select>

        <button type="submit" value="Submit">Go To Search</button>
      </form>
    );
  }
}
export default UserDetails;
