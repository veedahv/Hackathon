import chatQueryReducer from "./ChatQueryReducer"
import chatReducer from "./ChatReducer"
import QAReducer from "./QAReducer"
import suggestionReducer from "./SuggestionReducer"
import userReducer from "./UserReducer"
import {applyMiddleware, combineReducers,createStore} from 'redux'
import { composeWithDevTools   } from 'redux-devtools-extension';








  const rootReducer = combineReducers({
        chat:chatReducer,
        suggestion:suggestionReducer,
        user:userReducer,
        QA:QAReducer,
        chatQuery:chatQueryReducer
    })



  const store = createStore(rootReducer,composeWithDevTools(applyMiddleware()))

  export default store



