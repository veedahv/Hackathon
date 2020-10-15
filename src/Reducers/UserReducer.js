let userSchema = {
    username:'Anies',
    profilePic:'/src/assets/images/profile.jpg',
    balance:100000,
    BVN:12345678988,
    atmCard:3313,
    expenses:[
        {
            date:new Date(),
            description:'transfer money',
            amount:3000
        },
        {
            date:new Date(),
            description:'pay light bill',
            amount:40000
        },
        {
            date:new Date(),
            description:'insurance',
            amount:50000
        },
        {
            date:new Date(),
            description:'purchase airtime',
            amount:10000
        },
    ]
}

function userReducer(state = userSchema, action) {
    switch (action.type) {
      case 'UPDATE_USER':
        return {...state,...action.payload}
      case 'CLEAR_USER':
        return {...state,[action.payload]:''}
      default:
        return state
    }
  }


export default userReducer
