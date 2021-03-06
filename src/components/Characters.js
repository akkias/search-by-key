import React, {Component} from 'react';
import CharacterCard from './CharacterCard'

class Characters extends Component {
    constructor(props) {
        super();
    }

    renderCharacters(characters) {
        return characters.map(character => {
            return(
                <div key={character.id} className="card card-character">
                    <CharacterCard showCharacterDetails={(id) => this.props.showCharacterDetails(id)} character={character} />
                </div>
            )
        })
    }
    render() {
        return (
            <div className="p-a-11">
                <div className="characters-wrapper">
                    {(this.props.allCharacters && this.props.allCharacters.length) 
                        && this.renderCharacters(this.props.allCharacters)}
                </div>
            </div>
        )
    }
}
export default Characters;