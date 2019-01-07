
export function mcuCharacters(initialState = {characters: {}}, action) {
    switch(action.type) {
        case 'GET_CHARACTERS': 
            return action.payload.characters.data.data
        case 'SEARCH_CHARACTER': 
            const newState = action.payload.characters.data.data
            console.table(...initialState.results)
            return newState;
        default: {
            return initialState;
        }
    }
}