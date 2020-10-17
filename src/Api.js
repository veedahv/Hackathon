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




    scrollToButtom(){
        this.chatBody.scroll(0,this.chatBody.scrollHeight)
    }



    render(text){
        const {username,profilePic,balance,BVN} = store.getState().user
        const period = new Date().toLocaleString().split(" ").slice(-1)[0]==='PM'?"Afternoon":"Morning"
        return text.replace("<% username %>",username)
        .replace("<% balance %>",balance)
        .replace("<% profilePic %>",profilePic)
        .replace("<% BVN %>",BVN)
        .replace("<% period %>",period)

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

        if(store.getState().chatQuery.query){

            let htmlTemplate = ''

            const result = store.getState().QA.filter((e)=> _.some(e.questions.map(value=>sentenceMatch(0.2,store.getState().chatQuery.query,value)))).slice(0,6)

            result.forEach(ele=>{
                ele.questions.forEach(elem=>{
                    htmlTemplate +=this.templates.listSuggestionTemplate(elem)
                })
            })


            this.suggestionListBlock.innerHTML = htmlTemplate

        }else{
            this.suggestionListBlock.innerHTML = ''
        }


    }






    addMessageToChatList(message=''){

        try {

            if(message||store.getState().chatQuery.query){
                if(store.getState().chatQuery.propsName){
                    const chatQuery = store.getState().chatQuery
                    store.dispatch({type:'ADD_KWARGS',payload:{tag:chatQuery.tag,props:{[chatQuery.propsName]:chatQuery.query}}})
                    store.dispatch({type:"REMOVE_PROPS_NAME"})
                }
                store.dispatch({type:'ADD_CHAT',payload:{
                    user:true,
                    pubDate:new Date(),
                    body:message||store.getState().chatQuery.query,
                    mimeType:'text/plain',
                    link:0,
                    props:"name",
                    leastPercentage:0.3
                }})

                this.scrollToButtom()


                var respond;

                if(store.getState().chatQuery.link){
                     respond = store.getState().QA.filter((e)=>store.getState().chatQuery.link===e.id)
                    store.dispatch({type:'REMOVE_LINK'})
                }else{
                    const maxPropabilityIntent = _.max(getIntentProbabiliesFromText(store.getState().QA,message||store.getState().chatQuery.query),(value)=>value.probability)
                     respond = store.getState().QA.filter((e)=> maxPropabilityIntent.probability>this.clientProbabilityLimit?maxPropabilityIntent.id === e.id:false)
                }
                const respondRandomIndex = _.random(respond.length-1)
                store.dispatch({type:'ADD_INDICATOR'})
                this.scrollToButtom()

                const body = respond[0]?this.render(respond[respondRandomIndex].answer[_.random(respond[respondRandomIndex].answer.length-1)]):'not getting you qestion please try again...'
                const mimeType = respond[0]?respond[respondRandomIndex].mimeType:'text/plain'
                const props = respond[0]?respond[respondRandomIndex].props:''
                const tag = respond[0]?respond[respondRandomIndex].tag:''


                if(respond[0]&&respond[respondRandomIndex].link){

                    store.dispatch({type:'ADD_LINK',payload:respond[respondRandomIndex].link})


                }

                setTimeout(() => {
                    store.dispatch({type:'REMOVE_INDICATOR'})
                    store.dispatch({type:'ADD_PROPS_NAME',payload:{propsName:props,tag}})
                    store.dispatch({type:'ADD_CHAT',payload:{
                        user:false,
                        pubDate:new Date(),
                        body,
                        mimeType

                    }})
                    this.scrollToButtom()
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
