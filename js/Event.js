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
