export function getCharacters(characters) {
    return {
        type: "GET_CHARACTERS",
        payload: {
            characters
        }
    }
}
export function searchCharacter(characters) {
    return {
        type: "SEARCH_CHARACTER",
        payload: {
            characters
        }
    }
}