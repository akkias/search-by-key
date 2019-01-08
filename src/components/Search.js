import React, {Component} from 'react';
import SearchBar from './SearchBar';
import Characters from './Characters';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCharacters, searchCharacter} from '../actions';
import CharacterDetails from './CharacterDetails'
import {debounce} from '../utils/funcUtils'
import {get} from '../utils/apiUtils'

class Search extends Component {
    constructor(props) {
        super();
        this.state = {
            allCharacters: "",
            searchedCharacters: "",
            perPageLimit: 18,
            currentPage: 1,
            totalPages: 0,
            offset: 0,
            showDetailsPopover: false,
            characterDetails: [],
            hasSearched: false,
            isLoading: true
        }
        this.getNamedCharacters = debounce(this.getNamedCharacters, 450);
    }
    fetchAllCharacters() {
        get(process.env.REACT_APP_DEV_API_URL        , {
            apikey: process.env.REACT_APP_DEV_API_KEY,
            limit: this.state.perPageLimit, 
            offset: this.state.offset
        }).then(
            response => this.props.getCharacters(response),
            this.setState({
                isLoading: false
            })
         ).catch(
            error => console.log(error)
         );
    }
    getNamedCharacters(keyword) {
        get(process.env.REACT_APP_DEV_API_URL, {
            apikey: process.env.REACT_APP_DEV_API_KEY,
            name: keyword,
            limit: this.state.perPageLimit,
            offset: this.state.offset
        }).then(
            response => this.props.searchCharacter(response),
         ).catch(
            error => console.log(error)
         );
    }
    performSearch(keyword) {
        this.getNamedCharacters(keyword);
    }
    handlePagination (action) {
        let offset;
        this.setState({
            currentPage: action === 'prev' ? this.state.currentPage - 1 : this.state.currentPage + 1,
            isLoading: true
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
        const characterDetails = this.props.allCharacters.results.filter(character => character.id === id);
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
                <SearchBar isAuthenticated={true} performSearch={keyword => this.performSearch(keyword)} />
                {!this.state.isLoading && this.props.allCharacters.results && this.props.allCharacters.results.length ?  
                        <Characters showCharacterDetails={(id) => this.showCharacterDetails(id)} allCharacters={this.state.hasSearched ? this.props.searchedCharacters.results :  this.props.allCharacters.results} />
                    : 
                        this.props.searchedCharacters !== 0 ?
                            <div className="spinner"><img height="64" src="/assets/images/spinner.svg" alt="Loading" /></div> 
                            : "No results found"
                }
                {this.props.totalPages > 1 &&
                    <div className="pager p-a-8">
                        <button disabled={this.state.currentPage <= 1} className={`btn p-x-5 p-y-3 ${this.state.currentPage <= 1 && `btn-disabled`}`} onClick={() => this.handlePagination('prev')}>Prev</button>
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
        allCharacters: state.mcuCharacters.characters.allCharacters,
        searchedCharacters: state.mcuCharacters.characters.searchedCharacters,
        totalPages: state.mcuCharacters.characters.totalPages,
    }
}
const mapDispatchToProps = dispatch => bindActionCreators(
    { getCharacters, searchCharacter }, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Search);
export { Search };
