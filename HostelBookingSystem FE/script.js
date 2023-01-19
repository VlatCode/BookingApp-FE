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
    // console.log(document.getElementById("hostel_id").value);
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
    // console.log(document.getElementById("room_id").value);
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
    // console.log(document.getElementById("reservation_id").value);
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