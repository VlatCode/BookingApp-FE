// HOSTELS
// SHOW ALL HOSTELS
const hostelsContainer = document.querySelector(".hostel_container");

const showAllHostels = document.querySelector(".show_all_hostels");

function displayHostels(hostels) {
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
    .then(response => displayHostels(response));
}

showAllHostels.addEventListener('click', function() {
    getAllHostels();
})

// SHOW HOSTEL BY ID
const showHostelButton = document.querySelector(".show_one_hostel");

function displayHostel(hostel) {
    if (hostel) {
        hostelName.value = hostel.name;
        numberOfRooms.value = hostel.numberOfRooms;

        const hostelElement = `
            <div class="item">
                <h3>${hostel.name}</h3>
                <p>Number of rooms: ${hostel.numberOfRooms}</p>
            </div>
        `;
        hostelsContainer.innerHTML = hostelElement;
    } else {
        hostelsContainer.innerHTML = "Hostel not found";
    }
}

function getHostelById(id) {
    fetch(`http://localhost:5261/api/Hostel/${id}`)
        .then(data => data.json())
        .then(response => displayHostel(response))
        .catch(error => {
            console.error("Error fetching hostel:", error);
            hostelsContainer.innerHTML = "Error fetching hostel. Please try again.";
        });
}

showHostelButton.addEventListener('click', function () {
    const hostelId = document.getElementById("hostel_id").value;
    
    if (hostelId.trim() !== "") {
        getHostelById(hostelId);
    } else {
        hostelsContainer.innerHTML = "Please enter a valid hostel ID.";
    }
});

// ADD HOSTEL
const addHostelButton = document.querySelector(".add_hostel_button");
const addHostelName = document.querySelector("#addHostelName");
const addNumberOfRooms = document.querySelector("#addNumberOfRooms");

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
    addHostel(addHostelName.value, addNumberOfRooms.value);
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