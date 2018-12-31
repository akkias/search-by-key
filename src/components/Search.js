import React, {Component} from 'react';
import SearchBar from './SearchBar';
import Characters from './Characters';
import CharacterDetails from './CharacterDetails'
import {debounce} from '../utils/funcUtils'

const URL = 'https://gateway.marvel.com/v1/public/characters';
class Search extends Component {
    constructor(props) {
        super();
        this.state = {
            allCharacters: '',
            searchedCharacters: '',
            showLoader: true,
            perPageLimit: 18,
            currentPage: 0,
            initTotalPages: 0,
            searchTotalPages: 0,
            offset: 0,
            showDetailsPopover: false,
            characterDetails: []
        }
        this.getNamedCharacters = debounce(this.getNamedCharacters, 450);
    }
    fetchAllCharacters() {
        fetch(URL+`?apikey=24d21955ce01a5cd7e83534899cbdea8&limit=${this.state.perPageLimit}&offset=${this.state.offset}`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                allCharacters: response.data,
                searchedCharacters: response.data,
                showLoader: false,
                initTotalPages: response.data.total,
                searchTotalPages: response.data.total
            });
        })
    }
    async getNamedCharacters (keyword) {
        const response = await fetch(URL+`?apikey=24d21955ce01a5cd7e83534899cbdea8&name=${keyword}&limit=${this.state.perPageLimit}&offset=${this.state.offset}`);
        const data = await response.json();
        this.setState({
            searchedCharacters: data.data,
            showLoader: false,
            searchTotalPages: data.data.total
        })
    }
    performSearch (keyword) {
        if(!keyword) {
            return this.setState({
                searchedCharacters: this.state.allCharacters,
                searchTotalPages: this.state.initTotalPages
            })
        }
        this.setState({
            showLoader: true,
            offset: 0
        })
        this.getNamedCharacters(keyword);
    }
    handlePagination (action) {
        let offset;
        this.setState({
            currentPage: action === 'prev' ? this.state.currentPage - 1 : this.state.currentPage + 1,
            showLoader: true
        },function() {
            offset = Math.ceil(this.state.currentPage * this.state.perPageLimit);
            this.setState({
                offset
                },function() {
                    this.fetchAllCharacters();
                }
            )
        })
    }
    showCharacterDetails(id) {
        const characterDetails = this.state.searchedCharacters.results.filter(character => character.id === id);
        this.setState({
            characterDetails,
            showDetailsPopover: true
        })
    }
    hideCharacterDetails() {
        this.setState({
            showDetailsPopover: false
        })
    }
    componentDidMount() {
        this.fetchAllCharacters();
    }
    render() {
        return(
            <>
                <SearchBar performSearch={keyword => this.performSearch(keyword)} />
                {this.state.showLoader ?  
                    <div className="spinner"><img height="64" src="/assets/images/spinner.svg" alt="Loading" /></div> 
                    : 
                    this.state.searchedCharacters.results.length ?
                        <Characters showCharacterDetails={(id) => this.showCharacterDetails(id)} currentPage={this.state.currentPage} handlePagination={(action) => this.handlePagination(action)} characters={this.state.searchedCharacters} />
                        : 'No Results Found'
                }
                {this.state.searchTotalPages > 1 &&
                    <div className="pager p-a-8">
                        {this.state.currentPage !== 0 &&
                            <button className="btn p-x-5 p-y-3" onClick={() => this.handlePagination('prev')}>Prev</button>
                        }
                        <button className="btn p-x-5 p-y-3" onClick={() => this.handlePagination('next')}>Next</button>
                    </div>
                }
                {this.state.showDetailsPopover &&
                    <CharacterDetails characterDetails={this.state.characterDetails} hideCharacterDetails={() => this.hideCharacterDetails()} />
                }
            </>
        )
    }
}

export default Search;