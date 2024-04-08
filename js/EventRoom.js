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

function chatElement(message, role){
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

    chatMessageContent.appendChild(chatMessageText);
    chatMessageDiv.appendChild(chatMessageContent);
    chatBody.appendChild(chatMessageDiv);
}

function searchInputEntered(event){
    if(event.key === 'Enter'){
        let message = event.target.value;
        chatElement(message, 'loggedInUser');
        event.target.value = '';
    }
}

window.onload = function(){
    thisEventRoomDataWithAllChatDataWithAllUserData.forEach((chat) => {
        chatElement(chat.message, chat.id === currentUser.user_id ? 'loggedInUser' : 'otherUser');
        console.log('chat: ', chat, ' chat.message: ', chat.message)
        console.log('from event room js file')
    })
}