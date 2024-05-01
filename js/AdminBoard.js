window.onload = async function (){

    let allEventsCreatedByThisUser = [];
    let allRequestData = [];

    let session = JSON.parse(sessionStorage.getItem('user'));
    if(session == null){
        window.location.href = '../login.html';
    }

    await fetch(`http://localhost:3001/events/${session.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data=>{
        console.log('all events created by user')
        console.log(data)
        let allEventData = data.data;
        allEventData.forEach(async(event) => {
            allEventsCreatedByThisUser.push(event)
        })
    })

    console.log('all events created by this user')
    console.log(allEventsCreatedByThisUser)

    allEventsCreatedByThisUser.forEach(async(event) => {
        console.log('each event id is: ', event.id)
        await fetch(`http://localhost:3001/request/${event.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(reqData => {
            console.log('request data for this user is: ')
            console.log(reqData)
            if(reqData.length > 0){
                reqData.forEach((request) => {
                    let count = 1;
                    let eventName = request.name;
                    let nameOfUser = `${request.firstname} ${request.lastname}`;
                    let statusOfRequest = request.status;
                    createTable({
                        count: count,
                        eventName: eventName,
                        nameOfUser: nameOfUser,
                        statusOfRequest: statusOfRequest,
                        event_id: request.event_id,
                        user_id: request.user_id,
                        id: request.id
                    });
                })
            }
        })
    })
}


// table for all events created by this user
function createTable({count, eventName, nameOfUser, statusOfRequest, event_id, user_id, id}){
    let tableBody = document.getElementById('requestTableBody');

    let tr = document.createElement('tr');

    let th = document.createElement('th');
    th.setAttribute('scope','row');
    th.innerHTML = count;

    let td1 = document.createElement('td');
    td1.innerHTML = eventName;

    let td2 = document.createElement('td');
    td2.innerHTML = nameOfUser;

    let td3 = document.createElement('td');

    // let div = document.createElement('div');
    // div.classList.add('btn-group');
    // div.setAttribute('role','group');
    // div.setAttribute('aria-label','Basic checkbox toggle button group');

    let input = document.createElement('input');
    input.setAttribute('type','checkbox');
    input.classList.add('btn-check');
    input.setAttribute('autocomplete','off');
    input.setAttribute('id',`checkbox${id}`);
    // input.setAttribute('checked', statusOfRequest === 1 ? true : false);
    
    let label = document.createElement('label');
    label.setAttribute('id',`label${id}`)
    label.classList.add('btn');
    label.classList.add('btn-outline-primary');
    label.setAttribute('for', `checkbox${id}`);
    label.innerHTML = statusOfRequest == 1 ? 'Accepted' : 'Pending';

    input.checked = statusOfRequest == 1 ? true : false;


    input.addEventListener('change', async(event) => {
        let status = event.target.checked ? 1 : 0;
        console.log('reqStatus is: ', status)

        await fetch(`http://localhost:3001/request/${id}/${status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            let returnStatusData = data.data[0];
            console.log('return status data is: ', returnStatusData)

            let label = document.getElementById(`label${id}`);
            let input = document.getElementById(`checkbox${id}`);
            if(returnStatusData.status == 1){
                
                label.innerHTML = 'Accepted';
                input.checked = true;
            }
            else{
                label.innerHTML = 'Pending';
                input.checked = false;
            }
        })
        .catch(error => {
            console.log('error while updating status')
            console.log(error)
        })
    })

    // div.appendChild(input);
    // div.appendChild(label);
    // td3.appendChild(div);
    td3.appendChild(input);
    td3.appendChild(label);

    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tableBody.appendChild(tr);
}