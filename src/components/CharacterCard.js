import React from 'react';

const CharacterCard = (props) => {
    return(
        <div onClick={() => props.showCharacterDetails(props.character.id)}>
          <div className="character-img" style={{ background: `url(${props.character.thumbnail.path}.${props.character.thumbnail.extension}) no-repeat center / cover` }}></div>
          <h4 className="character-title p-a-4">{props.character.name}</h4>
        </div>
    )
}
export default CharacterCard;