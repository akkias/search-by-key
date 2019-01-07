
export function mcuCharacters(initialState = {characters: {}}, action) {
    switch(action.type) {
        case 'GET_CHARACTERS': 
            return action.payload.characters.data.data
        default: {
            return initialState;
        }
    }
}