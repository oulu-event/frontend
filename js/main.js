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

    await fetch('http://localhost:3001/events/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach((event, index) => {
            eachEvent(event.title, event.description, event.totalmembers, 0, false);
        })
    })
}

function eachEvent(name, description, totalMembersAllowed, totalMembersJoined, isJoined){

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
    joinButton.classList.add(isJoined ? 'btn-outline-success' : 'btn-outline-primary');
    joinButton.classList.add('joinButton');
    joinButton.setAttribute('data-isJoined', isJoined);
    joinButton.innerText = isJoined ? 'Open' : 'Join';

    joinButton.addEventListener('click', ()=>join(event, name, description, totalMembersAllowed, totalMembersJoined, isJoined));

    eventMainDiv.appendChild(eventTopRow);
    eventMainDiv.appendChild(eventDescription);
    eventMainDiv.appendChild(membersDiv);
    eventMainDiv.appendChild(joinButton);

    colDiv.appendChild(eventMainDiv);

    mainRow.appendChild(colDiv);
}

function join(event, name, description, totalMembersAllowed, totalMembersJoined, isJoined){
    let joinButton = event.target
    let joinDataAttribute = joinButton.getAttribute('data-isJoined')
    if(joinDataAttribute === 'false'){
        joinButton.setAttribute('data-isJoined', 'true')
        joinButton.innerHTML = 'Open'

        joinButton.classList.remove('btn-outline-primary')
        joinButton.classList.add('btn-outline-success')
    }

    let data = JSON.stringify({
        name: name,
        description: description,
        totalMembersAllowed: totalMembersAllowed,
        totalMembersJoined: totalMembersJoined,
        isJoined: true,
    })
    if(joinDataAttribute === 'true'){
        window.location.href = 'http://localhost:5500/EventRoom.html?data=' + encodeURIComponent(data);
    }
}

function createevent(event){
    let eventTitle = document.querySelector('#eventTitle').value;
    let eventDescription = document.querySelector('#eventDescription').value;
    let totalMembersAllowed = document.querySelector('#eventtotalMembers').value;

    eachEvent(eventTitle, eventDescription, totalMembersAllowed, 0, false);
    console.log('Create Event Clicked');
}

async function createEventButtonClicked(event){
    let eventTitle = document.querySelector('#eventTitle').value;
    let eventDescription = document.querySelector('#eventDescription').value;
    let totalMembersAllowed = document.querySelector('#eventtotalMembers').value;

    let data = JSON.stringify({
        title: eventTitle,
        description: eventDescription,
        totalMembers: totalMembersAllowed
    })

    await fetch('http://localhost:3001/events/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log('hello each data')
        console.log(data.data.title, data.data.description, data.data.totalmembers)
        eachEvent(data.data.title, data.data.description, data.data.totalmembers, 0, false);
    })
    .catch(error => console.error('Error while adding events:', error));
    
}