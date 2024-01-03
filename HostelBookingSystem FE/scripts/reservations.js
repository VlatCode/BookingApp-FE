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

    const reservationElement = `
        <div class="item">
            <h3>Room number: ${reservation.roomId}</h3>
            <p>From: ${reservation.startDate}</p>
            <p>To: ${reservation.endDate}</p>
        </div>
    `;
    reservationContainer.innerHTML = reservationElement;
}

function getReservationById(id) {
    fetch(`http://localhost:5261/api/Reservation/${id}`)
        .then(data => data.json())
        .then(response => displayReservation(response))
        .catch(error => {
            console.error("Error fetching reservation:", error);
            reservationContainer.innerHTML = "Error fetching reservation. Please try again.";
        });
}

showReservationButton.addEventListener('click', function() {
    const reservationId = document.getElementById("reservation_id").value;

    if (reservationId.trim() !== "") {
        getReservationById(reservationId);
    } else {
        reservationContainer.innerHTML = "Please enter a valid reservation ID.";
    }
});


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