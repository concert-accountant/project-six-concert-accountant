import React, {Component} from 'react';
import UserDetails from './UserDetails';

class Home extends Component {
    render() {
        return(
            <UserDetails getUserInput={this.getUserInput}/>
        )
    }
}

export default Home;