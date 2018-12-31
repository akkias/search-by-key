import React, {Component} from 'react';
const SearchIcon = 'assets/images/search.svg';


class SearchBar extends Component {
    constructor(props) {
        super();
        this.state = {
            keyword: ''
        }
    }
    inputChange = (e) => {
        this.setState({
            keyword: e.target.value
        },
        function() {
            this.props.performSearch(this.state.keyword)
        })
    }
    render() {
        return(
            <header className="searchbar-header p-x-12">
                <div className="searchbar-wrapper">
                    <img src={SearchIcon} alt="Search" className="search-icon" height="20" />
                    <input onChange={this.inputChange} placeholder="Please type something to start searching" type="text" />
                </div>
            </header>
        )
    }
}

export default SearchBar;