// #region SHOW ALL ROOMS
const showAllRooms = document.querySelector(".show_all_rooms");
const roomContainer = document.querySelector(".room_container");

function displayRooms(rooms) {
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
// #endregion


// #region SHOW ROOM BY ID
const showRoomButton = document.querySelector(".show_one_room");

function displayRoom(room) {
    if (room && room.id !== undefined) {
        room_id.value = room.id;

        const roomElement = `
            <div class="item">
                <h3>Room ID: ${room.id}</h3>
                <p>Location: ${room.hostelName}</p>
            </div>
        `;
        roomContainer.innerHTML = roomElement;
    } else {
        roomContainer.innerHTML = "Room not found";
    }
}

function getRoomById(id) {
    fetch(`http://localhost:5261/api/Room/${id}`)
        .then(data => data.json())
        .then(response => displayRoom(response))
        .catch(error => {
            console.error("Error fetching room:", error);
            roomContainer.innerHTML = "Error fetching room. Please try again.";
        });
}

showRoomButton.addEventListener('click', function() {
    const roomId = document.getElementById("room_id").value;

    if (roomId.trim() !== "") {
        getRoomById(roomId);
    } else {
        roomContainer.innerHTML = "Please enter a valid room ID.";
    }
});
// #endregion


// #region ADD ROOM
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
// #endregion


// #region DELETE ROOM
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
// #endregion