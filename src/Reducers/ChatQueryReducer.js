
const initial = {
    query:'',
    args:[],
    kwargs:{},
    link:0,
    propsName:"",
    tag:''
}
function chatQueryReducer(state = initial, {type,payload}) {
    switch (type) {
      case 'ADD_QUERY':
        return {...state,query:payload}
      case 'CLEAR_QUERY':
        return {...state,query:''}
      case 'ADD_KWARGS':
        return {...state,kwargs:{...state.kwargs,[payload.tag]:{...state.kwargs[payload.tag],...payload.props}}}
      case 'REMOVE_KWARGS':
        return {...state,kwargs:{}}
      case 'ADD_LINK':
        return {...state,link:payload}
      case 'REMOVE_LINK':
        return {...state,link:0}
      case 'ADD_PROPS_NAME':
        return {...state,propsName:payload.propsName,tag:payload.tag}
      case 'REMOVE_PROPS_NAME':
        return {...state,propsName:'',tag:''}
      default:
        return state
    }
  }

export default chatQueryReducer
