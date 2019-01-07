import React, {Component} from 'react';
import {Link} from 'react-router-dom';
const SearchIcon = 'assets/images/search.svg';


class SearchBar extends Component {
    inputChange = (e) => {
            this.props.performSearch(e.target.value)
    }
    render() {
        return(
            <header className="header p-x-12">
                <div className="header-content">
                    <div className="searchbar-wrapper">
                        <img src={SearchIcon} alt="Search" className="search-icon" height="20" />
                        <input onChange={this.inputChange} placeholder="Please type something to start searching" type="text" />
                    </div>
                    {this.props.isAuthenticated && 
                        <div className="m-l-a">
                            <Link to="/signin">Sign In</Link>
                            <Link to="/signup" className="m-l-2">Sign Up</Link>
                        </div>
                    }
                </div>
            </header>
        )
    }
}

export default SearchBar;