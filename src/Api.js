import _ from 'underscore'
import store from './Reducers'
import { getIntentProbabiliesFromText, sentenceMatch } from './utilities'



class Client {
    constructor(templates={}){
        this.clientProbabilityLimit= 0.43
        this.templates = templates

        this.chatInput = document.getElementById('chat-input')
        this.sendBtn = document.getElementById('send-btn')
        this.suggestionListBlock = document.getElementById('suggestion-list-block')
        this.chatBody = document.querySelector('.my-chat-body .row')

        //  message click event
         this.sendBtn.addEventListener('click',()=>{
            this.addMessageToChatList()

        })

        // message input enter button event
        this.chatInput.addEventListener('keydown',(e)=>{

            if(e.key==='Enter'){
                this.addMessageToChatList()
            }
        })

        // adding query event
        this.chatInput.addEventListener('input',(e)=>{
            store.dispatch({type:'ADD_QUERY',payload:e.target.value})
            let listSuggestionBlock = document.querySelectorAll('.list-suggestion-block')
            listSuggestionBlock.forEach(ele=>{
                ele.addEventListener('click',(e)=>{
                    this.addMessageToChatList(e.target.getAttribute("data-message"))
                })
            })

        })

        // update chat data
        this.UpdateChatContent()
    }




    UpdateChatContent(){

        const chatData = store.getState().chat.sort((a,b)=>a.pubDate-b.pubDate)
        var htmlTemplate = ''

        chatData.forEach(element => {
            if (element.user & element.mimeType==="text/plain") {
                htmlTemplate +=this.templates.chatUserBlock(element.body)



            } else if(!element.user & element.mimeType==="text/plain"){
                htmlTemplate +=this.templates.chatBotBlock(element.body)

            } else if(!element.user & element.mimeType==="text/html"){
                htmlTemplate +=this.templates[element.body]()
            }

        });

        this.chatBody.innerHTML=htmlTemplate
    }





    getQuestionListSuggestion(){

        if(store.getState().chatQuery){
            let htmlTemplate = ''

            const result = store.getState().QA.filter((e)=> _.some(e.questions.map(value=>sentenceMatch(0.2,store.getState().chatQuery,value)))).slice(0,6)

            result.forEach(ele=>{
                ele.questions.forEach(elem=>{
                    htmlTemplate +=this.templates.listSuggestionTemplate(elem)
                })
            })


            this.suggestionListBlock.innerHTML = htmlTemplate

        }


    }


    addMessageToChatList(message=''){

        try {

            if(message||store.getState().chatQuery){
                store.dispatch({type:'ADD_CHAT',payload:{
                    user:true,
                    pubDate:new Date(),
                    body:message||store.getState().chatQuery,
                    mimeType:'text/plain'
                }})
                this.chatBody.scroll(0,this.chatBody.scrollHeight)

                const maxPropabilityIntent = _.max(getIntentProbabiliesFromText(store.getState().QA,message||store.getState().chatQuery),(value)=>value.probability)
                const respond = store.getState().QA.filter((e)=> maxPropabilityIntent.probability>this.clientProbabilityLimit?maxPropabilityIntent.id === e.id:false)
                const respondRandomIndex = _.random(respond.length-1)
                store.dispatch({type:'ADD_INDICATOR'})
                setTimeout(() => {
                    store.dispatch({type:'REMOVE_INDICATOR'})
                    store.dispatch({type:'ADD_CHAT',payload:{
                        user:false,
                        pubDate:new Date(),
                        body:respond[0]?respond[respondRandomIndex].answer[_.random(respond[respondRandomIndex].answer.length-1)]:'not getting you qestion please try again...',
                        mimeType:respond[0]?respond[respondRandomIndex].mimeType:'text/plain'

                    }})
                    this.chatBody.scroll(0,this.chatBody.scrollHeight)
                }, _.random(1,3)*1000);

            }
            store.dispatch({type:'CLEAR_QUERY'})
            this.chatInput.value=''
        } catch (e) {
            console.error(e)
        }

    }







}





export default Client
