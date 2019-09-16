import React, { Component } from "react";
import firebase from "../firebase";
import NavBar from "./NavBar";

class PublishedLists extends Component {
  constructor() {
    super();
    this.state = {
      test: [],
      userInput: "",
    }
  }

componentDidMount() {
  const dbRef = firebase.database().ref("publishList");
  dbRef.on("value", response => {
    const newState = [];
    const data = response.val();
    for (let key in data) {
      newState.push({ key: key, eventList: data[key] });
    }
    this.setState({
      test: newState,
    });
    
  });

}

render() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="wrapper">
      <div>
        <h2>Published Lists</h2>
        <h3>100$</h3>
        <h3>200$</h3>
        <h3>300$</h3>
        <h3>400$</h3>
        <h3>500$+</h3>
      </div>

      <div>
        {this.state.test.map((list, i) => {
          console.log(list);
          
          return (
            <li className="publishContainer" key={list.key}>
            
              {list.eventList.map(details => {
                return(
                  <div key={details.key + i}>
                    <h3>Event Name: {details.name.name}</h3>
                    <p>Price: $ {details.name.priceRanges[0].min}</p>
                    <a href={details.name.url}>Event Link on Ticketmaster</a>
                    <div className="imageContainer">
                      <img src={details.name.images[2].url} alt={details.name.name} />
                    </div>
                  </div>
                )
              })}
            </li>
          );
        })}
        
      </div>
      {/* {console.log(this.state.test)} */}
      </div>
    </React.Fragment>
  );

}
}
export default PublishedLists;
