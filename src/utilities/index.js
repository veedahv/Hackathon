


// function to check is sentence have similar word
function sentenceMatch(probability=0.5,text='',preSentence='',withProbability=false){
    try{
        let pattern = new RegExp('\\b(' + text.split(' ').join('|') + ')\\b', 'gi');

        let result = preSentence.match(pattern)
        if (withProbability) {
            return result.length/preSentence.split(' ').length

        } else {
            return Boolean(Boolean(result)&(result.length/preSentence.split(' ').length)>=probability)
        }

    }catch{
        if (withProbability) {
            return 0.0

        } else {
            return false
        }

    }


}

// return a list of id and their probability
function getIntentProbabiliesFromText(intent=[],text=''){
    if(text){

       return intent.map(({id,questions,leastPercentage})=>{
       var qestionProbabilities =   questions.map(value=>sentenceMatch(0.5,text,value,true)>=leastPercentage?sentenceMatch(0.5,text,value,true):0)
       return {id,probability:Math.max(...qestionProbabilities)}
                          })
    }else{
        return []
    }

  }





export {
    sentenceMatch,
    getIntentProbabiliesFromText
}
