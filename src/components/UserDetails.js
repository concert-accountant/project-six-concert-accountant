import React, { Component } from "react";
import {Redirect, withRouter} from "react-router-dom"; 
import firebase from "../firebase";

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      listName: "",
      location: "",
      budget: "",
      redirect: false,
    };
  }

  handleInputChange = e => {
    e.preventDefault();
    
        this.setState({
            [e.target.name]: e.target.value,
        })
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    })

    this.handleUserInputData();
  };
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/events' />
    }
  };

  handleUserInputData = () => {
    const dbRef = firebase.database().ref("userData");
    dbRef.push(this.state)
    console.log(this.state);
  }

  render() {
    return (  
      <form className="userInputForm" onSubmit={this.setRedirect}>
        <p>Let us help you create a list of shows that fit your budget. Fill out your details and let's get started!</p>

        <label htmlFor="userName" className="visuallyHidden">Name</label>
        <input type="text" id="name" placeholder="Name" name="userName" onChange={this.handleInputChange} required></input>

        <label htmlFor="listName" className="visuallyHidden">List Name</label>
        <input type="text" id="list" placeholder="List" name="listName" onChange={this.handleInputChange} required></input>

        <label htmlFor="location" className="visuallyHidden">Location</label>
        <input type="text" id="location" placeholder="Location" name="location" onChange={this.handleInputChange} required></input>

        <label htmlFor="budget" className="visuallyHidden">Budget</label>
        <select name="budget" id="budget" onChange={this.handleInputChange} required>
            <option value="">Select Budget</option>
            <option value="100">$100</option>
            <option value="200">$200</option>
            <option value="300">$300</option>
            <option value="400">$400</option>
            <option value="500+">$500+</option>
        </select>

        {this.renderRedirect()}
        <button className="formSubmit" type="submit" value="Submit">Go To Search</button>

      </form>
    );
  }
}
export default UserDetails;
