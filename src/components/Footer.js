import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer>
        {" "}
        Created by:{" "}
        <a
          href="http://www.twitter.com/developer_matt/"
          target="_blank"
          aria-label="go to Matt Donaldsons twitter"
          rel="noopener noreferrer"
        >
          Matt
        </a>
        , {"   "}
        <a
          href="http://www.twitter.com/alexawolo/"
          target="_blank"
          aria-label="go to Alexa Woloszuk's twitter"
          rel="noopener noreferrer"
        >
          Alexa
        </a>
        ,{"  "}
        <a
          href="http://www.twitter.com/jeffrudd19/"
          target="_blank"
          aria-label="go to Jeff Rudd's twitter"
          rel="noopener noreferrer"
        >
          Jeff
        </a>
        , and {"  "}
        <a
          href="http://www.twitter.com/PritikaRoy/"
          target="_blank"
          aria-label="go to Pritika Roy's twitter"
          rel="noopener noreferrer"
        >
          Pritika
        </a>{" "}
         API provided by{" "}
        <a
          href="https://developer.ticketmaster.com/products-and-docs/apis/getting-started/"
          target="_blank"
          aria-label="go to Ticketmaster's Discovery website"
          rel="noopener noreferrer"
        >
          Ticketmaster
        </a>
      </footer>
    );
  }
}
export default Footer;
