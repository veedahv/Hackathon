import json
from uuid import uuid4
import asyncio


data = {}



def get_id(n=10):
    num = int(uuid4())
    return int(str(num)[:n])

my_id =get_id()
# print(get_uid())

with open('test.json','r') as file:
    data = json.load(file)

previous_id = []


# note intent is a list
intent = data['intent']

intent_id = my_id
while True:
    
    print("tags can the name of the services,story or topic this intent is for ")
    tag = input("enter tag name with no space or dash\n use camelcase,\n keep blank for  default 'question' tag=>:  ")

    if not tag:
        tag = 'question'

    question = list(map(lambda x:x.strip(),input("enter a question seperate sentences by '|' : ").split('|')))
    answers = list(map(lambda x:x.strip(),input("enter a answers seperate sentences by '|' : ").split('|')))

    print("choose one of this enter:\n1) for ==> text/html\n2) for ==> text/plain\n or keep blank for 'text/html':  ")

    mimeType = input("enter mimeType for the intent:  ")
    if not mimeType:
        mimeType = 'text/plain'
    elif mimeType=='1':
        mimeType = 'text/html'
    elif mimeType=='2':
        mimeType = 'text/plain'


    ids = ''.join(previous_id)
    print(f"previous ids : \n{ids}")
    link = input(f"enter id to be linked.\nenter 'next' to used next id is '{intent_id+1}' :  ")
    if not link:
        link=0
    elif link=='next':
        link = intent_id + 1



    print("enter props name leave empty od none")
    props = input("enter props for the intent:  ")
    leastPercentage = input("enter least Percentage for the intent:  ")

    if not leastPercentage:
        leastPercentage = 0.3

    previous_id = previous_id +['==>'+str(intent_id)+'\n']
    print("previous id",previous_id)

    

    new_data = {
        "id":intent_id,
        "tag":''.join(list(map(lambda x:x.strip(),tag.split(' ')))),
        "questions":question,
        "answer":answers,
        "link":int(link),
        "mimeType":mimeType,
        "props":props,
        "leastPercentage":float(leastPercentage)

    }
    intent_id = intent_id + 1

    intent = intent + [new_data]

    print(intent)





# with open('text.json','w') as file:
#     json.dump(test,file)
    