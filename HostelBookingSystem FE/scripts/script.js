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