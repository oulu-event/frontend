const btnAdd = document.querySelector('#add-button');

btnAdd.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const eventName = document.querySelector('#event-name').value.trim();
    const location = document.querySelector('#location').value.trim();
    const description = document.querySelector('#description').value.trim();
    const dateTime = document.querySelector('#date-time').value;
    const photo = document.querySelector('#photo').files[0]; // Assuming only one file is selected

    // Validation
    if (eventName === '') {
        document.querySelector('#event-name-error').textContent = 'Event name is required';
        return;
    } else {
        document.querySelector('#event-name-error').textContent = '';
    }

    if (location === '') {
        document.querySelector('#location-error').textContent = 'location is required';
        return;
    } else {
        document.querySelector('#location-error').textContent = '';
    }
    if (description === '') {
        document.querySelector('#description-error').textContent = 'Description is required';
        return;
    } else {
        document.querySelector('#description-error').textContent = '';
    }

    if (dateTime === '') {
        document.querySelector('#date-time-error').textContent = 'Date & time is required';
        return;
    } else {
        document.querySelector('#date-time-error').textContent = '';
    }

    // Prepare JSON object
    const eventData = {
        eventName: eventName,
        location: location,
        description: description,
        dateTime: dateTime
    };

    // Convert photo to base64 string
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = function () {
        eventData.photo = reader.result;

        // Send JSON data to server
        fetch('/your-backend-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            // Handle response data if needed
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
    };
});

// Function to fetch event data from URL and generate event cards
function fetchAndGenerateEventCards() {
    // Replace 'your_url_here' with the actual URL of your events JSON data
    fetch('http://locahlost:3000/events/')
      .then(response => response.json())
      .then(data => {
        const eventCardsRow = document.getElementById('eventCardsRow');
        data.forEach(event => {
          const eventCard = `
            <div class="col-md-4">
              <div class="card">
                <img src="${event.image}" class="card-img-top" alt="${event.title}">
                <div class="card-body">
                  <h5 class="card-title">${event.title}</h5>
                  <p class="card-text">Date: ${event.date}</p>
                  <p class="card-text">Location: ${event.location}</p>
                  <p class="card-text">${event.description.substring(0, 160)}</p>
                  <a href="#" class="btn btn-primary">Join Event</a>
                </div>
              </div>
            </div>
          `;
          eventCardsRow.innerHTML += eventCard;
        });
      })
      .catch(error => console.error('Error fetching events:', error));
  }

// Function to fetch event detail data and display it
function fetchAndShowEventDetail(eventId) {
    // Replace 'event_detail_url_here' with the actual URL to fetch event detail data
    fetch(`https://localhost:3000/events/${eventId}/`)
      .then(response => response.json())
      .then(event => {
        // Update HTML to display event detail
        const eventDetailCard = document.getElementById('eventDetailCard');
        eventDetailCard.innerHTML = `
        <img src="${event.image}" class="card-img-top" alt="${event.title}">
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text">Date: ${event.date}</p>
          <p class="card-text">Location: ${event.location}</p>
          <p class="card-text">${event.description}</p>
          <a href="#" class="btn btn-primary">Join Event</a>
        </div>
        `;
      })
      .catch(error => console.error('Error fetching event detail:', error));
  }
  
  
// Call the function to fetch and generate event cards when the page load
//  window.onload = fetchAndGenerateEventCards;
  