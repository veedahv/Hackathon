

var chatSchema = [
    {
        user:false,
        pubDate:new Date(),
        mimeType:'text/plain',
        body:'Welcome Ma/Sir am Fab-VA \nand am a bot'
    },
    {
        user:false,
        pubDate:new Date(),
        mimeType:'text/plain',
        body:'What can i help you with?...'
    }
    // {
    //     user:false,
    //     pubDate:new Date(),
    //     mimeType:'text',
    //     body:'Am curry and am you personal assistance'
    // },
    // {
    //     user:true,
    //     pubDate:new Date(),
    //     mimeType:'text',
    //     body:'Hello curry,i need to check my account balance'
    // },
    // {
    //     user:false,
    //     pubDate:new Date(),
    //     mimeType:'text',
    //     body:'you have $365 of you balance'
    // },
    // {
    //     user:true,
    //     pubDate:new Date(),
    //     mimeType:'text',
    //     body:'How can i make and airtime purchase'
    // },
    // {
    //     user:false,
    //     pubDate:new Date(),
    //     mimeType:'text',
    //     body:'simple dail *777*100* if you are an airtel user'
    // },
]

// {
//     user:false,
//     pubDate:new Date(),
//     mimeType:'text',
//     body:'<div class=" bot-block col mb-2 col-12 text-left"><div class="spinner-grow text-primary" role="status" style="height: 10px;width: 10px;"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-primary" role="status" style="height: 10px;width: 10px;"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-primary" role="status" style="height: 10px;width: 10px;"><span class="sr-only">Loading...</span></div></div>'
// }

function chatReducer(state = chatSchema, action) {
    switch (action.type) {
      case 'ADD_CHAT':
        return [...state,action.payload]
      case 'ADD_INDICATOR':
        return [...state,{
            user:false,
            pubDate:new Date(),
            mimeType:'text/html',
            body:'Indicator'
        }]
      case 'REMOVE_INDICATOR':
        return state.slice(0,-1)
      case 'CLEAR_CHAT':
        return []
      default:
        return state
    }
  }

export default chatReducer
