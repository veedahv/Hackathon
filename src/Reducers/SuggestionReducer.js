

function suggestionReducer(state = [], action) {
    switch (action.type) {
      case 'ADD_SUGGESTIONS':
        return [...state,...action.payload]
      case 'CLEAR_SUGGESTIONS':
        return []
      default:
        return state
    }
  }


export default suggestionReducer
