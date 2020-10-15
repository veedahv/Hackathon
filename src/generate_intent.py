import json
from uuid import uuid4
import sys


def newline():
    print('\n')


filename = 'intent.json'


data = {}



def get_id(n=10):
    num = int(uuid4())
    return int(str(num)[:n])

my_id =get_id()
# print(get_uid())
try:
    with open(filename,'r') as file:
        data = json.load(file)

except:
    pass


previous_id = []


# note intent is a list
if data == {}:
    intent=[]
else:
    intent = data['intent']


intent_id = my_id



services = """
services available:
1)checkAccount
2)businessLoan
3)loan
4)insurance
5)bankTranser
6)expences
7)qestion
8)airtimePurchase
9)read
10)create
11)delete
12)update
13)greetings
"""
while True:


    newline()
    print("tags can the name of the services,story or topic this intent is for ")
    print(services)
    tag = input("enter tag name with no space or dash\n use camelcase,\n keep blank for  default 'question' tag=>:  ")


    if not tag:
        tag = 'question'

    question = list(map(lambda x:x.strip(),input("enter a question seperate sentences by '|' : ").split('|')))


    newline()
    answers = list(map(lambda x:x.strip(),input("enter a answers seperate sentences by '|' : ").split('|')))

    newline()
    print("choose one of this enter:\n1) for ==> text/html\n2) for ==> text/plain\n or keep blank for 'text/plain':  ")

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


    newline()
    print("enter props name leave empty od none")
    props = input("enter props for the intent:  ")

    newline()
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

    with open(filename,'w') as file:
        json.dump({"intent":intent},file)

    newline()
    print(f"{len(intent)} intent(s) has been  created so far")





# with open('text.json','w') as file:
#     json.dump(test,file)
