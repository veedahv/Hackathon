import watch from 'redux-watch';
import store from '../Reducers';


// // store is THE redux store
// let w = watch(store.getState, 'admin.name')
// store.subscribe(w((newVal, oldVal, objectPath) => {
//   console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
//   // admin.name changed from JP to JOE
// }))

const watchChatQuery = watch(store.getState, 'chatQuery')
const watchChat = watch(store.getState, 'chat')
const watchSuggestion = watch(store.getState, 'suggestion')
const watchUser = watch(store.getState, 'user')
const watchQA = watch(store.getState, 'QA')




export {
    watchChatQuery,
    watchChat,
    watchSuggestion,
    watchUser,
    watchQA
}
