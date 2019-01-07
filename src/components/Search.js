import React, {Component} from 'react';
import SearchBar from './SearchBar';
import Characters from './Characters';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCharacters} from '../actions';
import axios from 'axios';
import CharacterDetails from './CharacterDetails'
import {debounce} from '../utils/funcUtils'
import {get} from '../utils/apiUtils'

const URL = 'https://gateway.marvel.com/v1/public/characters';
const APIKey = `24d21955ce01a5cd7e83534899cbdea8`;
class Search extends Component {
    constructor(props) {
        super();
        this.state = {
            allCharacters: "",
            searchedCharacters: "",
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
        axios.get(URL,{
            params:{
                apikey: APIKey,
                limit: this.props.perPageLimit, 
                offset: this.props.offset
            }
        })
        .then(response => {
            this.props.getCharacters(response);
        })
    }
    async getNamedCharacters (keyword) {
        get(URL, {
            apikey: APIKey, 
            name: keyword,
            limit: this.props.perPageLimit,
            offset: this.props.offset
        }).then(
            response => this.props.searchCharacter(response),
            this.setState({
                showLoader: false
            })
         ).catch(
            error => console.log(error)
         );
    }
    performSearch(keyword) {
        if(!keyword) {
            return this.setState({
                searchedCharacters: this.props.allCharacters,
                searchTotalPages: this.props.initTotalPages
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
            currentPage: action === 'prev' ? this.props.currentPage - 1 : this.props.currentPage + 1,
            showLoader: true
        },function() {
            offset = Math.ceil(this.props.currentPage * this.props.perPageLimit);
            this.setState({
                offset
                },function() {
                    this.fetchAllCharacters();
                }
            )
        })
    }
    showCharacterDetails(id) {
        const characterDetails = this.props.searchedCharacters.filter(character => character.id === id);
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
        get(URL, {
            apikey: APIKey,
            limit: this.props.perPageLimit, 
            offset: this.props.offset
        }).then(
            response => this.props.getCharacters(response),
            this.setState({
                showLoader: false
            })
         ).catch(
            error => console.log(error)
         );
    }
    render() {
        return(
            <>
                <SearchBar isAuthenticated={this.props.isAuthenticated} performSearch={keyword => this.performSearch(keyword)} />
                {this.props.searchedCharacters && this.props.searchedCharacters.length ?  
                        <Characters showCharacterDetails={(id) => this.showCharacterDetails(id)} allCharacters={this.props.searchedCharacters} />
                    : 
                    <div className="spinner"><img height="64" src="/assets/images/spinner.svg" alt="Loading" /></div> 
                }
                {this.props.searchTotalPages > 1 &&
                    <div className="pager p-a-8">
                        {this.props.currentPage !== 0 &&
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
const mapStateToProps =  (state) => { 
    return {
        allCharacters: state.mcuCharacters.results,
        searchedCharacters: state.mcuCharacters.results,
        initTotalPages: state.mcuCharacters.total,
        searchTotalPages: state.mcuCharacters.total
    }
}
const mapDispatchToProps = dispatch => bindActionCreators(
    { getCharacters }, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Search);
export { Search };
