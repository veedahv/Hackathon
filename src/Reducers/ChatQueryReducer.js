function chatQueryReducer(state = '', action) {
    switch (action.type) {
      case 'ADD_QUERY':
        return action.payload
      case 'CLEAR_QUERY':
        return []
      default:
        return state
    }
  }

export default chatQueryReducer
