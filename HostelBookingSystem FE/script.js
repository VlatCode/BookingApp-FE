// #region LOGIN AREA
// LOGIN AREA

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageContainer = document.querySelector('.error-message-container');

    const loginInfo = {
        Username: username,
        Password: password
    };

    clearErrorMessage(errorMessageContainer);

    fetch('http://localhost:5261/api/User/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(token => {
        localStorage.setItem('jwtToken', token);

        updateUIForLoggedInState();
    })
    .catch(() => {
        console.error('Login failed: Invalid username or password');

        displayErrorMessage(errorMessageContainer, 'Invalid username or password. Please try again.');
    });
}

function displayErrorMessage(container, message) {
    // Create a new element for the error message
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '5px'; // Adjusted margin for better spacing
    errorMessage.textContent = message;

    // Append the error message to the error message container
    container.appendChild(errorMessage);
}

function clearErrorMessage(container) {
    // Remove any existing error messages
    const existingErrorMessages = container.querySelectorAll('.error-message');
    existingErrorMessages.forEach(message => {
        container.removeChild(message);
    });
}

function logout() {
    // Display the logout modal
    const logoutModal = document.getElementById('logoutModal');
    logoutModal.style.display = 'block';

    // Handle confirm logout button click
    const confirmLogoutButton = document.getElementById('confirmLogout');
    confirmLogoutButton.addEventListener('click', function () {
        // Close the modal
        logoutModal.style.display = 'none';

        // Reference to the error message container
        const errorMessageContainer = document.querySelector('.error-message-container');

        // Clear any existing error messages
        clearErrorMessage(errorMessageContainer);

        // Remove the token from localStorage
        localStorage.removeItem('jwtToken');

        // Update the UI for logged-out state
        updateUIForLoggedOutState();
    });

    // Handle cancel logout button click
    const cancelLogoutButton = document.getElementById('cancelLogout');
    cancelLogoutButton.addEventListener('click', function () {
        // Close the modal
        logoutModal.style.display = 'none';
    });
}

function updateUIForLoggedInState() {
    const mainAreaContainer = document.querySelector('.main_area_container');
    const loginContainer = document.querySelector('.login_container');
    const logoutButton = document.querySelector('.logout_button');

    if (loginContainer) {
        loginContainer.style.display = 'none';
    }
    if (logoutButton) {
        logoutButton.style.display = 'inline-block';
    }

    mainAreaContainer.style.display = 'block';
}

function updateUIForLoggedOutState() {
    const mainAreaContainer = document.querySelector('.main_area_container');
    const loginContainer = document.querySelector('.login_container');
    const logoutButton = document.querySelector('.logout_button');

    if (loginContainer) {
        loginContainer.style.display = ''; // Use the default display property
    }
    if (logoutButton) {
        logoutButton.style.display = 'none';
    }

    mainAreaContainer.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is already logged in
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
        // User is already logged in, update the UI
        updateUIForLoggedInState();
    } else {
        // User is not logged in, update the UI accordingly
        updateUIForLoggedOutState();
    }
});

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

const logoutButton = document.querySelector('.logout_button');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}

const loginButton = document.querySelector('.login_button');
if (loginButton) {
    loginButton.addEventListener('click', login);
}
// #endregion



// #region REGISTER AREA
function openRegistrationModal() {
    const registrationModal = document.getElementById('registrationModal');
    registrationModal.style.display = 'block';

    const confirmRegistrationButton = document.getElementById('confirmRegistration');
    confirmRegistrationButton.addEventListener('click', function () {
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            emailAddress: document.getElementById('emailAddress').value,
            username: document.getElementById('usernameRegister').value,
            password: document.getElementById('passwordRegister').value
        };

        fetch('http://localhost:5261/api/User/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            
            registrationModal.style.display = 'none';

            clearRegistrationFields();

            displaySuccessMessageModal();
        })
        .catch(error => console.error('Error registering user:', error));
    });

    const cancelRegistrationButton = document.getElementById('cancelRegistration');
    cancelRegistrationButton.addEventListener('click', function () {
        registrationModal.style.display = 'none';

        clearRegistrationFields();
    });
}

function clearRegistrationFields() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('dateOfBirth').value = '';
    document.getElementById('emailAddress').value = '';
    document.getElementById('usernameRegister').value = '';
    document.getElementById('passwordRegister').value = '';
}

function displaySuccessMessageModal() {
    const successMessageModal = document.getElementById('successMessageModal');
    successMessageModal.style.display = 'block';

    const dismissButton = document.getElementById('dismissButton');
    dismissButton.addEventListener('click', function () {
        successMessageModal.style.display = 'none';

        window.location.href = 'index.html'; // Change the URL accordingly
    });
}
// #endregion



// #region MAIN AREA
// MAIN AREA SECTION
// HOSTELS
// SHOW ALL HOSTELS
const hostelsContainer = document.querySelector(".hostel_container");

const showAllHostels = document.querySelector(".show_all_hostels");

function displayHotels(hostels) {
    // Append allHostels to hostelContainer
    let allHostels = '';

    hostels.forEach(hostel => {
        const hostelElement = `
        <div class="item">
            <h3>${hostel.name}</h3>
            <p>Number of rooms: ${hostel.numberOfRooms}</p>
        </div>
        `
        allHostels += hostelElement;
    })
    
    hostelsContainer.innerHTML = allHostels;
}

function getAllHostels() {
    fetch('http://localhost:5261/api/Hostel')
    .then(data => data.json())
    .then(response => displayHotels(response));
}

showAllHostels.addEventListener('click', function() {
    getAllHostels();
})

// SHOW HOSTEL BY ID
const showHostelButton = document.querySelector(".show_one_hostel");

function displayHostel(hostel) {

    hostelName.value = hostel.name;
    numberOfRooms.value = hostel.numberOfRooms;

    const hostelElement = `
        <div class="item">
            <h3>${hostel.name}</h3>
            <p>Number of rooms: ${hostel.numberOfRooms}</p>
        </div>
        `
    hostelsContainer.innerHTML = hostelElement;
}

function getHostelById(id) {
    fetch(`http://localhost:5261/api/Hostel/${id}`)
    .then(data => data.json())
    .then(response => displayHostel(response));
}

showHostelButton.addEventListener('click', function(id) {
    getHostelById(document.getElementById("hostel_id").value);
})

// ADD HOSTEL
const addHostelButton = document.querySelector(".add_hostel_button");
const hostelName = document.querySelector("#hostelName");
const numberOfRooms = document.querySelector("#numberOfRooms");

function addHostel(name, numberOfRooms) {
    const body = {
        name: name,
        numberOfRooms: numberOfRooms
    }
    fetch('http://localhost:5261/api/Hostel/addHostel', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(response => console.log(response));
    getAllHostels();
}

addHostelButton.addEventListener('click', function() {
    addHostel(hostelName.value, numberOfRooms.value);
})

// DELETE HOSTEL
const deleteHostelButton = document.querySelector(".delete_hostel_button");

function deleteHostel(id) {
    fetch(`http://localhost:5261/api/Hostel/deleteHostel/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
        console.log(response)
    });
}

deleteHostelButton.addEventListener('click', function() {
    var hostelId = document.getElementById("hostel_id_remove").value;
    deleteHostel(hostelId);
})

//////////
// ROOMS
// SHOW ALL ROOMS
const showAllRooms = document.querySelector(".show_all_rooms");
const roomContainer = document.querySelector(".room_container");

function displayRooms(rooms) {
    // Append allRooms to roomContainer
    let allRooms = '';

    rooms.forEach(room => {
        const roomElement = `
        <div class="item">
            <h3>Room ID: ${room.id}</h4>
            <p>Hostel: "${room.hostelName}"</p>
        </div>
        `
        allRooms += roomElement;
    })
    
    roomContainer.innerHTML = allRooms;
}

function getAllRooms() {
    fetch('http://localhost:5261/api/Room')
    .then(data => data.json())
    .then(response => displayRooms(response));
}

showAllRooms.addEventListener('click', function() {
    getAllRooms();
})

// SHOW ROOM BY ID
const showRoomButton = document.querySelector(".show_one_room");

function displayRoom(room) {

    room_id.value = room.id;

    const roomElement = `
        <div class="item">
            <h3>Room ID: ${room.id}</h3>
            <p>Location: ${room.hostelName}</p>
        </div>
        `
    roomContainer.innerHTML = roomElement;
}

function getRoomById(id) {
    fetch(`http://localhost:5261/api/Room/${id}`)
    .then(data => data.json())
    .then(response => displayRoom(response));
}

showRoomButton.addEventListener('click', function() {
    getRoomById(document.getElementById("room_id").value);
})

// ADD ROOM
const addRoomButton = document.querySelector(".add_room_button");
const roomHostelId = document.querySelector("#roomHostelId");

function addRoom(roomHostelId) {
    const body = {
        hostelId: roomHostelId
    }
    fetch('http://localhost:5261/api/Room/AddRoom', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(response => console.log(response));
}

addRoomButton.addEventListener('click', function() {
    addRoom(roomHostelId.value);
})

// DELETE ROOM
const deleteRoomButton = document.querySelector(".delete_room_button");

function deleteRoom(id) {
    fetch(`http://localhost:5261/api/Room/deleteRoom/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
        console.log(response)
    });
}

deleteRoomButton.addEventListener('click', function() {
    var roomId = document.getElementById("room_id_remove").value;
    deleteRoom(roomId);
})


//////////
// RESERVATIONS
// SHOW ALL RESERVATIONS
const showAllReservations = document.querySelector(".show_all_reservations");
const reservationContainer = document.querySelector(".reservation_container");

function displayReservations(reservations) {
    // Append AllReservations to reservationContainer
    let AllReservations = '';

    reservations.forEach(reservation => {

        // ADD THESE TO 'reservationElement' WHEN IMPLEMENTED
        // <h4>Name: ${reservation.resName}</h4>
        // <p>No. of guests: ${reservation.numOfGuests}</p>
        const reservationElement = `
        <div class="item">
            <h3>Room number: ${reservation.roomId}</h3>
            <p>From: ${reservation.startDate}</p>
            <p>To: ${reservation.endDate}</p>
        </div>
        `
        AllReservations += reservationElement;
    })
    
    reservationContainer.innerHTML = AllReservations;
}

function getAllReservations() {
    fetch('http://localhost:5261/api/Reservation')
    .then(data => data.json())
    .then(response => displayReservations(response));
}

showAllReservations.addEventListener('click', function() {
    getAllReservations();
})

// SHOW RESERVATION BY ID
const showReservationButton = document.querySelector(".show_one_reservation");

function displayReservation(reservation) {
    reservation_id.value = reservation.id;

        {   // ADD THESE IN 'reservationElement' WHEN IMPLEMENTED
            /* <h4>Name: ${reservation.resName}</h4>
            <p>No. of guests: ${reservation.numOfGuests}</p> */}

    const reservationElement = `
        <div class="item">
            <h3>Room number: ${reservation.roomId}</h3>
            <p>From: ${reservation.startDate}</p>
            <p>To: ${reservation.endDate}</p>
        </div>
        `
    reservationContainer.innerHTML = reservationElement;
}

function getReservationById(id) {
    fetch(`http://localhost:5261/api/Reservation/${id}`)
    .then(data => data.json())
    .then(response => displayReservation(response));
}

showReservationButton.addEventListener('click', function() {
    getReservationById(document.getElementById("reservation_id").value);
})

// ADD RESERVATION
const addReservationButton = document.querySelector(".add_reservation_button");
const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");
const reservationRoomId = document.querySelector("#reservationRoomId");

function addReservation(startDate, endDate, reservationRoomId) {
    const body = {
        startDate: startDate,
        endDate: endDate,
        roomId: reservationRoomId
    }
    fetch('http://localhost:5261/api/Reservation/AddReservation', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(response => console.log(response));
}

addReservationButton.addEventListener('click', function() {
    addReservation(startDate.value, endDate.value, reservationRoomId.value);
})

// DELETE RESERVATION
const deleteReservationBtn = document.querySelector(".delete_reservation_button");

function deleteReservation(id) {
    fetch(`http://localhost:5261/api/Reservation/deleteReservation/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
        console.log(response)
    });
}

deleteReservationBtn.addEventListener('click', function() {
    var reservationId = document.getElementById("reservation_id_remove").value;
    deleteReservation(reservationId);
})

function clearInput() {
    hostel_id.value = '';
    hostelName.value = '';
    numberOfRooms.value = '';
    hostel_id_remove.value = '';
}
//#endregion



// #region SHOW/HIDE ITEMS (FROM DB)
// SHOW/HIDE ITEMS FUNCTIONS
// Function to hide the container with the given ID
function hideContainer(containerId) {
    const container = document.querySelector(containerId);
    if (container) {
        container.style.display = 'none';
    }
}

// Function to show the container with the given ID
function showContainer(containerId) {
    const container = document.querySelector(containerId);
    if (container) {
        container.style.display = 'block';
    }
}

// Function to toggle the display of items
function toggleItemsVisibility(button, containerId) {
    const buttonText = button.textContent;

    if (buttonText.includes('Show')) {
        // Show items
        button.textContent = `Hide items`;
        button.setAttribute('data-original-text', buttonText); // Store the original text
        // Call the appropriate function to display items
        switch (containerId) {
            case 'hostel_container':
                getAllHostels();
                break;
            case 'room_container':
                getAllRooms();
                break;
            case 'reservation_container':
                getAllReservations();
                break;
            // Add more cases if needed
        }
    } else {
        // Hide items
        const originalText = button.getAttribute('data-original-text');
        button.textContent = originalText;
        hideContainer(`.${containerId}`);
    }
}

document.querySelector('.show_all_hostels').addEventListener('click', function () {
    const containerId = 'hostel_container';
    toggleItemsVisibility(this, containerId);
    if (this.textContent.includes('Hide')) {
        showContainer(`.${containerId}`);
    }
});

document.querySelector('.show_all_rooms').addEventListener('click', function () {
    const containerId = 'room_container';
    toggleItemsVisibility(this, containerId);
    if (this.textContent.includes('Hide')) {
        showContainer(`.${containerId}`);
    }
});

document.querySelector('.show_all_reservations').addEventListener('click', function () {
    const containerId = 'reservation_container';
    toggleItemsVisibility(this, containerId);
    if (this.textContent.includes('Hide')) {
        showContainer(`.${containerId}`);
    }
});
//#endregion