let eventData = [
    {
        title: 'Event 1',
        description: 'This is the description for Event 1',
        totalMembersAllowed: 10,
        totalMembersJoined: 5,
        isJoined: false,
    },
    {
        title: 'Event 2',
        description: 'This is the description for Event 2',
        totalMembersAllowed: 10,
        totalMembersJoined: 5,
        isJoined: false,
    },
    {
        title: 'Event 3',
        description: 'This is the description for Event 3',
        totalMembersAllowed: 10,
        totalMembersJoined: 5,
        isJoined: false,
    },
    {
        title: 'Event 4',
        description: 'This is the description for Event 4',
        totalMembersAllowed: 10,
        totalMembersJoined: 5,
        isJoined: false,
    },
    {
        title: 'Event 5',
        description: 'This is the description for Event 5',
        totalMembersAllowed: 10,
        totalMembersJoined: 5,
        isJoined: false,
    },
];

window.onload = async function(){
    let mainRow = document.querySelector('#eventMainRow');

    // eventData.forEach((event, index) => {
    //     eachEvent(event.title, event.description, event.totalMembersAllowed, event.totalMembersJoined, event.isJoined);
    //     console.log(event)
    // })
    
    let createEventButton = document.querySelector('#createEventButton');
    createEventButton.addEventListener('click', createEventButtonClicked);

    let searchevent = document.querySelector('#searchInput');
    searchevent.addEventListener('keyup', searchInputEntered);

    await getAllEvents();
}

async function getAllEvents(){
    await fetch('http://localhost:3001/events/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        let allData = data.data
        console.log('all events Data:', allData)

        let currentLoggedInUser = JSON.parse(sessionStorage.getItem('user'));
        let currentLoggedInUserId = null;
        if(currentLoggedInUser === null){
            currentLoggedInUserId = null;
        }else{
            currentLoggedInUserId = currentLoggedInUser.id;
        }

        if(allData.length > 0){
            allData.forEach(async(event, index) => {
                console.log('all events Data:', event)
                console.log('logged in user:', JSON.parse(sessionStorage.getItem('user')))
                console.log('event id:', event.id)

                let ifUserJoinedEvent = false;

                if(currentLoggedInUserId != null){
                    let userId = currentLoggedInUserId;
                    let eventId = event.id;
                    await fetch(`http://localhost:3001/events/${userId}/${eventId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('checking if user has joined event or not:')
                        console.log(data.data)
                        if(data.data.length > 0){
                            console.log('user has joined event')
                            let returnedData = data.data[0];

                            if(returnedData.status == 0){
                                ifUserJoinedEvent = false;
                            }else{
                                ifUserJoinedEvent = true;
                            }
                        }
                    })
                }

                console.log('*************')
                console.log('is user admin:', currentLoggedInUserId == event.user_id ? 'true' : 'false')

                eachEvent(
                    {
                    name: event.name,
                    description: event.description,
                    totalMembersAllowed: event.total_participants_allowed,
                    totalMembersJoined: event.total_participants_joined == null ? 0 : event.total_participants_joined,
                    isJoined: ifUserJoinedEvent,
                    isAdmin: currentLoggedInUserId == event.user_id ? true : false,
                    user_id: currentLoggedInUserId,
                    event_id: event.id
                }
                );
            })
        }
    })
    .catch(error => console.error('Error while fetching events:', error));
}

function eachEvent({name, description, totalMembersAllowed, totalMembersJoined, isJoined, isAdmin, user_id, event_id}){

    let mainRow = document.querySelector('#eventMainRow');

    let colDiv = document.createElement('div');
    colDiv.classList.add('col-md-3');

    let eventMainDiv = document.createElement('div');
    eventMainDiv.classList.add('event-main-div');

    let eventTopRow = document.createElement('div');
    eventTopRow.classList.add('event-top-row');

    let eventTopRowHeading = document.createElement('div');
    eventTopRowHeading.classList.add('event-top-row-heading');

    let eventTopRowHeadingH2 = document.createElement('h2');
    eventTopRowHeadingH2.innerText = name;
    eventTopRowHeading.appendChild(eventTopRowHeadingH2);

    let eventTopRowExpand = document.createElement('div');
    eventTopRowExpand.classList.add('event-top-row-expand');

    let eventTopRowExpandIcon = document.createElement('i');
    eventTopRowExpandIcon.classList.add('bi');
    eventTopRowExpandIcon.classList.add('bi-info-circle');
    eventTopRowExpandIcon.setAttribute('data-bs-toggle', 'modal');
    eventTopRowExpandIcon.setAttribute('data-bs-target', '#exampleModal');
    eventTopRowExpand.appendChild(eventTopRowExpandIcon);

    eventTopRow.appendChild(eventTopRowHeading);
    eventTopRow.appendChild(eventTopRowExpand);

    let eventDescription = document.createElement('div');
    eventDescription.classList.add('event-description');
    eventDescription.innerText = description;

    let membersDiv = document.createElement('div');
    membersDiv.classList.add('members-div');

    let indieMember = document.createElement('div');
    indieMember.classList.add('indie-member');

    let indieMemberIcon = document.createElement('i');
    indieMemberIcon.classList.add('bi');
    indieMemberIcon.classList.add('bi-people');

    let indieMemberSpan = document.createElement('span');
    indieMemberSpan.innerText = totalMembersAllowed;

    indieMember.appendChild(indieMemberIcon);
    indieMember.appendChild(indieMemberSpan);

    let indieMemberJoined = document.createElement('div');
    indieMemberJoined.classList.add('indie-member-joined');

    let indieMemberJoinedIcon = document.createElement('i');
    indieMemberJoinedIcon.classList.add('bi');
    indieMemberJoinedIcon.classList.add('bi-people-fill');

    let indieMemberJoinedSpan = document.createElement('span');
    indieMemberJoinedSpan.innerText = totalMembersJoined;

    indieMemberJoined.appendChild(indieMemberJoinedIcon);
    indieMemberJoined.appendChild(indieMemberJoinedSpan);

    membersDiv.appendChild(indieMember);
    membersDiv.appendChild(indieMemberJoined);

    let joinButton = document.createElement('button');
    joinButton.classList.add('btn');
    joinButton.classList.add('joinButton');
    joinButton.setAttribute('data-isJoined', isJoined);
    
    let buttonType;
    let buttonColor;
    if(isAdmin || isJoined){
        buttonType = 'Open';
        buttonColor = 'btn-outline-success';
    }else{
        buttonType = 'Join';
        buttonColor = 'btn-outline-primary';
    }
    
    joinButton.classList.add(buttonColor);
    joinButton.innerText = buttonType;

    
    joinButton.addEventListener('click', (event)=>{
        let data = JSON.stringify({
            name: name,
            description: description,
            totalMembersAllowed: totalMembersAllowed,
            totalMembersJoined: totalMembersJoined,
            isJoined: isJoined,
            isAdmin: isAdmin,
            event_id: event_id,
        })
        if(isJoined || isAdmin){
            window.location.href = 'http://localhost:5500/EventRoom.html?data=' + encodeURIComponent(data);
        }else{
            join(event, name, description, totalMembersAllowed, totalMembersJoined, isJoined, isAdmin, user_id, event_id);
        }
    }
);

    eventMainDiv.appendChild(eventTopRow);
    eventMainDiv.appendChild(eventDescription);
    eventMainDiv.appendChild(membersDiv);
    eventMainDiv.appendChild(joinButton);

    colDiv.appendChild(eventMainDiv);

    mainRow.appendChild(colDiv);
}

async function join(event, name, description, totalMembersAllowed, totalMembersJoined, isJoined, isAdmin, user_id, event_id){
    let session = JSON.parse(sessionStorage.getItem('user'));
    if(session === null){
        window.location.href = 'http://localhost:5500/login.html';
    }else{
        if(!isAdmin){
            await fetch(`http://localhost:3001/join/${event_id}`, {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': session.token,
                    }
            })
            .then(response => response.json())
            .then(data => {
                    console.log('join request sent')
                    console.log(data)
            })
        }
                        
        // let joinButton = event.target
        // let joinDataAttribute = joinButton.getAttribute('data-isJoined')

        // if(joinDataAttribute === 'false'){
        //     joinButton.setAttribute('data-isJoined', 'true')
        //     joinButton.innerHTML = 'request sent'
    
        //     joinButton.classList.remove('btn-outline-primary')
        //     joinButton.classList.add('btn-outline-success')
        // }
    
        // let data = JSON.stringify({
        //     name: name,
        //     description: description,
        //     totalMembersAllowed: totalMembersAllowed,
        //     totalMembersJoined: totalMembersJoined,
        //     isJoined: true,
        //     isAdmin: isAdmin,
        //     event_id: event_id,
        // })
        // if(joinDataAttribute === 'true'){
        //     window.location.href = 'http://localhost:5500/EventRoom.html?data=' + encodeURIComponent(data);
        // }

        
    }
}

// function createevent(event){
//     let eventTitle = document.querySelector('#eventTitle').value;
//     let eventDescription = document.querySelector('#eventDescription').value;
//     let totalMembersAllowed = document.querySelector('#eventtotalMembers').value;

//     eachEvent(eventTitle, eventDescription, totalMembersAllowed, 0, false);
//     console.log('Create Event Clicked');
// }

async function createEventButtonClicked(event){
    let session = JSON.parse(sessionStorage.getItem('user'));

    if(session === null){
        window.location.href = 'http://localhost:5500/login.html';
    }else{
        let eventTitle = document.querySelector('#eventTitle').value;
        let eventDescription = document.querySelector('#eventDescription').value;
        let totalMembersAllowed = document.querySelector('#eventtotalMembers').value;
    
        let data = JSON.stringify({
            name: eventTitle,
            location: 'finland',
            datetime: '2021-10-10',
            description: eventDescription,
            total_participants_allowed: totalMembersAllowed,
            user_id: session.id,
        })
    
        await fetch('http://localhost:3001/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session.token,
            },
            body: data
        })
        .then(response => response.json())
        .then(async data => {
            console.log('frontend: returned data, after add event')
            console.log(data)
            
            window.location.href = 'index.html'
            // console.log(data.data.title, data.data.description, data.data.totalmembers)
            // eachEvent(data.data.title, data.data.description, data.data.totalmembers, 0, false);
        })
        .catch(error => console.error('Error while adding events:', error));
    }

}