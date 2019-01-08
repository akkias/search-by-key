
export function mcuCharacters(initialState = {characters: {allCharacters:{},searchedCharacters:{}}}, action) {
    switch(action.type) {
        case 'GET_CHARACTERS': 
        let allCharacters =  action.payload.characters.data.data;
        return {...initialState, characters:{allCharacters, totalPages: allCharacters.total}}
        case 'SEARCH_CHARACTER': 
            const searchedCharacters = action.payload.characters.data.data
            return {...initialState, characters:{...initialState.characters,searchedCharacters, totalPages: searchedCharacters.total}}
        default: {
            return initialState;
        }
    }
}