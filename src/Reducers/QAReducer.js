


const QASchema = ({username,balance})=> [
    {
        id:100,
        tag:'greetings',
        questions:['ok','alright','okay'],
        answer:['Your are welcome'],
        mimeType:"text/plain"

    },
    {
        id:122,
        tag:'greetings',
        questions:['hello','hi','hey','hy'],
        answer:[`Welcome ${username}, How may i be of help?`,'How are you doing?'],
        mimeType:"text/plain"
    },
    {
        id:123,
        tag:'time',
        questions:['Whats the current time'],
        answer:[new Date().toGMTString()],
        mimeType:"text/plain"
    },
    {
        id:333,
        tag:'greetings',
        questions:['good morning','good AM'],
        answer:[`Good moring  ${username}, How may i be of help?`],
        mimeType:"text/plain"
    },
    {
        id:777,
        tag:'account',
        questions:['What is my current Account balance','i want to check my account balance','my account balance'],
        answer:[`you have N${balance} left of your current account balance`,`${username} Your account balance is remaining ${balance}`],
        mimeType:"text/plain"
    }


]

const initialState = [
    {
        id:900,
        tag:'greetings',
        questions:['ok','alright','okay'],
        answer:['Your are welcome'],
        mimeType:"text/plain"
    },
    {
        id:776,
        tag:'time',
        questions:['Whats the current time'],
        answer:[new Date().toGMTString()],
        mimeType:"text/plain"
    },
    {
        id:332,
        tag:'greetings',
        questions:['how are you doing?'],
        answer:['am doing just fine'],
        mimeType:"text/plain"
    },
    {
        id:112,
        tag:'question',
        questions:['How do i purchase airtime from my bank'],
        answer:['To purchase airtime follow the following step \n 1) Dail *333# \n 2) then follow the instructions shown on your screen.'],
        mimeType:"text/plain"
    },
    {
        id:655,
        tag:'transfer',
        questions:['i need to make transfer'],
        answer:['Please type in the beneficiary account number and the amount you want to transfer'],
        mimeType:"text/plain"
    }
]

function QAReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_QA':
        return [...state,...action.payload]
      case 'CLEAR_QA':
        return []
      default:
        return state
    }
  }


export default QAReducer
export {QASchema}

