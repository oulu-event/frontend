window.onload = async function(){
    let session = JSON.parse(sessionStorage.getItem('user'));
    if(session == null){
        window.location.href = '../login.html';
    }

    // await fetch(`http://localhost:3001/events/${session.id}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(data =>{
    //     console.log('all events created by user')
    //     console.log(data)
    //     let allData = data.data;

    //     if(allData.length > 0){
    //         allData.forEach((event) => {
    //             console.log('each event is: ', event)

    //             let createdEventDiv = document.getElementById('createdEventsTableBody');

    //             let tr = document.createElement('tr');

    //             let th = document.createElement('th');
    //             th.setAttribute('scope', 'row');
    //             th.innerHTML = event.id;

    //             let td1 = document.createElement('td');
    //             td1.innerHTML = event.name;

    //             let td2 = document.createElement('td');

    //             let input = document.createElement('input');
    //             input.setAttribute('type', 'checkbox');
    //             input.classList.add('btn-check');
    //             input.setAttribute('autocomplete', 'off');
    //             input.setAttribute('id', `checkbox${event.id}`);

    //             let label = document.createElement('label');
    //             label.setAttribute('id', `label${event.id}`)
    //             label.classList.add('btn');
    //             label.classList.add('btn-outline-danger');
    //             label.setAttribute('for', `checkbox${event.id}`);
    //             label.innerHTML = 'Delete';

    //             let id = event.id;
    //             input.addEventListener('change', async (event) => {
    //                 await fetch(`http://localhost:3001/events/delete/${id}`, {
    //                     method: 'get',
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     }
    //                 })
    //                     .then(response => response.json())
    //                     .then(data => {
    //                         console.log('after deleting event')
    //                         console.log(data)
    //                         // window.location.reload();
    //                     })
    //             });

    //             td2.appendChild(input);
    //             td2.appendChild(label);

    //             tr.appendChild(th);
    //             tr.appendChild(td1);
    //             tr.appendChild(td2);

    //             createdEventDiv.appendChild(tr);
    //         })
    //     }
    // })




    await fetch(`http://localhost:3001/events/joined/${session.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('all events joined by user')
            console.log(data)
            let allData = data.data;
            console.log(allData)
            if(allData.length > 0){

                allData.forEach((event) => {
                    if(event.request_status == 1){
                        console.log('each event is: ', event)

                        let joinedEventDiv = document.getElementById('joinedEventsTableBody');

                        let tr = document.createElement('tr');

                        let th = document.createElement('th');
                        th.setAttribute('scope', 'row');
                        th.innerHTML = event.request_id;

                        let td1 = document.createElement('td');
                        td1.innerHTML = event.name;

                        let td2 = document.createElement('td');

                        let input = document.createElement('input');
                        input.setAttribute('type', 'checkbox');
                        input.classList.add('btn-check');
                        input.setAttribute('autocomplete', 'off');
                        input.setAttribute('id', `checkbox${event.request_id}`);

                        let label = document.createElement('label');
                        label.setAttribute('id', `label${event.request_id}`)
                        label.classList.add('btn');
                        label.classList.add('btn-outline-danger');
                        label.setAttribute('for', `checkbox${event.request_id}`);
                        label.innerHTML = event.request_status == 1 ? 'Leave' : 'Join';

                        input.checked = event.request_status == 1 ? false : true;

                        let eventId = event.event_id;
                        let userId = event.user_id;

                        input.addEventListener('change', async (event) => {
                            await fetch(`http://localhost:3001/events/leave/${eventId}/${userId}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log('after leaving event')
                                    console.log(data)
                                    window.location.reload();
                                })
                        });

                        td2.appendChild(input);
                        td2.appendChild(label);

                        tr.appendChild(th);
                        tr.appendChild(td1);
                        tr.appendChild(td2);

                        joinedEventDiv.appendChild(tr);

                    }
                })
            }
        })
}