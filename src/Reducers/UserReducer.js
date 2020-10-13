let userSchema = {
    username:'Anies',
    profilePic:'/src/assets/images/profile.jpg',
    balance:100000
}

function userReducer(state = userSchema, action) {
    switch (action.type) {
      case 'ADD':
        return {...state,...action.payload}
      case 'CLEAR':
        return {username:'',profilePic:''}
      default:
        return state
    }
  }


export default userReducer
