let userSchema = {
    username:'Anies',
    profilePic:'/src/assets/images/profile.jpg',
    balance:100000
}

function userReducer(state = userSchema, action) {
    switch (action.type) {
      case 'UPDATE_USER':
        return {...state,...action.payload}
      case 'CLEAR':
        return {username:'',profilePic:''}
      default:
        return state
    }
  }


export default userReducer
