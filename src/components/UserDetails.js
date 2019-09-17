import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import NavBar from "./NavBar";

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      listName: "",
      location: "",
      budget: "",
      redirect: false
    };
  }

  handleInputChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });

    this.handleUserInputData();
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/events',
        state: this.state,
      }}
      />
    }
  };

  handleUserInputData = () => {
    const dbRef = firebase.database().ref("userData");
    dbRef.set(this.state)
    console.log(this.state);
  };

  render() {
    return (
      <form className="userInputForm" onSubmit={this.setRedirect}>
        <p>
          Create a list of your favourite shows in and around Toronto that fits
          your budget.
        </p>
        <p>Fill out your details and let's get started!</p>
        
        <label htmlFor="userName" className="visuallyHidden">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Your Name"
          name="userName"
          onChange={this.handleInputChange}
          required
        ></input>

        <label htmlFor="listName" className="visuallyHidden">
          List Name
        </label>
        <input
          type="text"
          id="list"
          placeholder="List Name"
          name="listName"
          onChange={this.handleInputChange}
          required
        ></input>

        <label htmlFor="budget" className="visuallyHidden">
          Budget
        </label>
        <select
          name="budget"
          id="budget"
          onChange={this.handleInputChange}
          required
        >
          <option value="">Select Budget</option>
          <option value="100">$100</option>
          <option value="200">$200</option>
          <option value="300">$300</option>
          <option value="400">$400</option>
          <option value="500+">$500+</option>
        </select>

        {this.renderRedirect()}
        <button className="formSubmit" type="submit" value="Submit">
          Go To Search
        </button>
      </form>
    );
  }
}
export default UserDetails;
