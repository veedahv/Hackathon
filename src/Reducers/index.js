import chatQueryReducer from "./ChatQueryReducer"
import chatReducer from "./ChatReducer"
import QAReducer from "./QAReducer"
import suggestionReducer from "./SuggestionReducer"
import userReducer from "./UserReducer"
import {combineReducers,createStore} from 'redux'








  const rootReducer = combineReducers({
        chat:chatReducer,
        suggestion:suggestionReducer,
        user:userReducer,
        QA:QAReducer,
        chatQuery:chatQueryReducer
    })



  const store = createStore(rootReducer)

  export default store



