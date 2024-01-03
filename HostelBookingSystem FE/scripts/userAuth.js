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


// #region PROFILE AREA
function setDynamicProfileInfo() {
    // Set the dynamic username and image source in the profile.html
    const profileUsername = document.querySelector('.profile-username');
    const profilePicture = document.querySelector('.profile-picture');
    const username = localStorage.getItem('username');

    if (profileUsername && profilePicture && username) {
        profileUsername.textContent = username;

        // Set dynamic image source based on the logged-in user
        if (username === 'vnikolovski97') {
            profilePicture.src = './Visa_2023.jpg'; // Set the actual path for the image
        } else {
            profilePicture.src = './default-profile-picture.jpg'; // Set a default image path
        }
    }
}
// #endregion


// #region LOGIN AREA
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
        localStorage.setItem('username', username);
        clearWelcomeMessages();
        appendWelcomeMessage(username);
        updateUIForLoggedInState();
        setDynamicProfileInfo();
        console.log('Login successful. Setting dynamic profile info for user:', username);
    })
    .catch(() => {
        console.error('Login failed: Invalid username or password');
        displayErrorMessage(errorMessageContainer, 'Invalid username or password. Please try again.');
    });
}

function clearWelcomeMessages() {
    const existingWelcomeMessages = document.querySelectorAll('.welcome-message');
    existingWelcomeMessages.forEach(message => {
        message.parentNode.removeChild(message);
    });
}

function appendWelcomeMessage(username) {
    const welcomeMessage = document.createElement('p');
    welcomeMessage.classList.add('welcome-message');

    // Create a clickable link with target="_blank" around the username
    const profileLink = document.createElement('a');
    profileLink.href = 'profile.html';  // Set the actual URL for the profile page
    profileLink.textContent = username;
    profileLink.target = '_blank';  // Open link in a new tab

    welcomeMessage.appendChild(document.createTextNode('User: '));
    welcomeMessage.appendChild(profileLink);

    const loggedInContainer = document.querySelector('.logged_in_container');
    const logoutButton = document.getElementById('logoutButton');
    if (loggedInContainer) {
        loggedInContainer.insertBefore(welcomeMessage, logoutButton);
    }
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
    const logoutModal = document.getElementById('logoutModal');
    logoutModal.style.display = 'block';

    const confirmLogoutButton = document.getElementById('confirmLogout');
    confirmLogoutButton.addEventListener('click', function () {
        logoutModal.style.display = 'none';

        const errorMessageContainer = document.querySelector('.error-message-container');
        clearErrorMessage(errorMessageContainer);
        clearWelcomeMessages();

        // Reset input fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        localStorage.removeItem('jwtToken');
        updateUIForLoggedOutState();
    });

    const cancelLogoutButton = document.getElementById('cancelLogout');
    cancelLogoutButton.addEventListener('click', function () {
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

    if (mainAreaContainer) {
        mainAreaContainer.style.display = 'block';
    }
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

    if (mainAreaContainer) {
        mainAreaContainer.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is already logged in
    const jwtToken = localStorage.getItem('jwtToken');
    const username = localStorage.getItem('username');

    if (jwtToken && username) {
        // User is already logged in, update the UI
        appendWelcomeMessage(username);
        updateUIForLoggedInState();
        setDynamicProfileInfo();
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



