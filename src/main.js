import Client from './Api';
import Component from './Components';
// import './_index.html';
import './index.html';
import store from './Reducers';
import { QASchema } from './Reducers/QAReducer';
import { watchChat, watchChatQuery } from './Subscribers';
import { getIntentProbabiliesFromText } from './utilities';
import _ from 'underscore'
import {intent} from './intent.json'

window.addEventListener('DOMContentLoaded',()=>{


    const component = new Component()
    const api =new Client(component)

    intent?store.dispatch({type:'ADD_QA',payload:intent}):null
    store.dispatch({type:'ADD_QA',payload:QASchema(store.getState().user)})
    store.subscribe(watchChatQuery((newVal, oldVal, objectPath)=>api.getQuestionListSuggestion()))
    store.subscribe(watchChat((newVal, oldVal, objectPath)=>api.UpdateChatContent()))






})

// testModule.test();
