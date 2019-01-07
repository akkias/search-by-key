import React from 'react';

const CharacterDetails = (props) => {
    return(
        <div className="character-details">
            {props.characterDetails.map((character, i) => {return(
                <div key={i}>
                    <button className="character-details-close" onClick={() => props.hideCharacterDetails()}>
                        <img height="12" src="/assets/images/close.svg" alt="Loading" />
                    </button>
                    <div className="character-details-cover" style={{ background: `url(${character.thumbnail.path}.${character.thumbnail.extension}) no-repeat center / cover` }}></div>
                    <div className="p-a-12">
                        <h2 className="character-title m-b-4">{character.name}</h2>
                        <p className="character-description m-t-0">{character.description}</p>
                        <div className="additional-links">
                            {character.urls.map((link, i) => {
                                return(
                                    <a className="m-r-2" key={i} href={link.url} rel='nofollow noreferrer noopener' target="_blank">{link.type}</a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )})} 
        </div>
    )
}
export default CharacterDetails;