

var chatSchema = [
    {
        id:2000055,
        user:false,
        pubDate:new Date(),
        mimeType:'text/plain',
        body:`Welcome Anies am Vee and am a bot`,
        link:0,
        getProps:false,
        props:"name",
        leastPercentage:0.3
    },
    {
        id:20000,
        user:false,
        pubDate:new Date(),
        mimeType:'text/plain',
        body:'What can i help you with?...',
        link:0,
        getProps:false,
        props:"name",
        leastPercentage:0.3

    }

]



function chatReducer(state = chatSchema, action) {
    switch (action.type) {
      case 'ADD_CHAT':
        return [...state,action.payload]
      case 'ADD_INDICATOR':
        return [...state,{
            user:false,
            pubDate:new Date(),
            mimeType:'text/html',
            body:'Indicator',
            link:0,
            getProps:false,
            props:"",
            leastPercentage:0.3
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
