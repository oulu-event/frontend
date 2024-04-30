let currentUser = {
    user_id: 3,
    name: 'John',
}

let thisEventRoomDataWithAllChatDataWithAllUserData = 
[
    {
        id: 1,
        message: 'Hi, Welcome to the event!',
        timestamp: '2024-01-01 12:00:00',
        username: 'John',
    }
]

let urlData = {};

function chatElement({message, role, name}){
    let chatBody = document.querySelector('.chat-body');

    let chatMessageDiv = document.createElement('div');
    chatMessageDiv.classList.add('chat-message');
    if(role === 'loggedInUser'){
        chatMessageDiv.setAttribute("data-role", "loggedInUser")
    }else{
        chatMessageDiv.setAttribute("data-role", "otherUser")
    }

    let offsetDiv = document.createElement('div');
    offsetDiv.classList.add('offset');

    chatMessageDiv.appendChild(offsetDiv);

    let chatMessageContent = document.createElement('div');
    chatMessageContent.classList.add('chat-message-content');

    let chatMessageText = document.createElement('p');
    chatMessageText.classList.add('chat-message-text');
    chatMessageText.innerHTML = message;

    let chatUserName = document.createElement('span');
    chatUserName.classList.add('chat-user-name');
    chatUserName.innerHTML = `${name}`;

    chatMessageContent.appendChild(chatUserName);
    chatMessageContent.appendChild(chatMessageText);

    chatMessageDiv.appendChild(chatMessageContent);
    chatBody.appendChild(chatMessageDiv);
}

async function searchInputEntered(event){
    if(event.key === 'Enter'){

        let message = event.target.value;
        let session = JSON.parse(sessionStorage.getItem('user'));
        console.log('the session is: ', session)

        let urlParams = new URLSearchParams(window.location.search);
        let uriData = urlParams.get('data')
        let eventData = JSON.parse(decodeURIComponent(uriData));

        await fetch('http://localhost:3001/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session.token
            },
            body: JSON.stringify({
                content: message,
                event_id: eventData.event_id,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('after sending message')
            console.log(data)
        })
        // chatElement(message, 'loggedInUser');
        // event.target.value = '';
    }
}

window.onload = async function(){

    let session = JSON.parse(sessionStorage.getItem('user'));

    let urlParams = new URLSearchParams(window.location.search);
    let data = urlParams.get('data')
    let eventData = JSON.parse(decodeURIComponent(data));

    await fetch(`http://localhost:3001/comments/${eventData.event_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        let allData = data.data;

        
        allData.forEach((chat) => {
            console.log('session id: ', session.id, ' chat user id: ', chat.user_id)
            if(session.id == chat.user_id){
                console.log('logged in user')
            }else{
                console.log('other user')
            }
            chatElement({message: chat.content, role: session.id == chat.user_id ? 'loggedInUser' : 'otherUser', name: chat.firstname});
            console.log('chat: ', chat, ' chat.message: ', chat.content)
            console.log('from event room js file')
        })
        console.log('all messages for this event:')
        console.log(data)
    })

    
    // if(data){
    //     let eventData = JSON.parse(decodeURIComponent(data));

    //     urlData = eventData;
    // }

    // console.log(urlData)

    // thisEventRoomDataWithAllChatDataWithAllUserData.forEach((chat) => {
    //     chatElement(chat.message + " " + urlData.name, chat.id === currentUser.user_id ? 'loggedInUser' : 'otherUser');
    //     console.log('chat: ', chat, ' chat.message: ', chat.message)
    //     console.log('from event room js file')
    // })


    // let session = JSON.parse(sessionStorage.getItem('user'));
    // console.log('the session is: ', session)
}