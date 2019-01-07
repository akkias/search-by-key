export function getCharacters(characters) {
    return {
        type: "GET_CHARACTERS",
        payload: {
            characters
        }
    }
}
export function searchCharacter(character) {
    return {
        type: "SEARCH_CHARACTER",
        payload: {
            character
        }
    }
}