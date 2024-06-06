let userInputs = [];

function addUserInput() {
    const userName = document.getElementById('userName').value;
    const restaurantInput = document.getElementById('restaurantInput').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const distance = document.getElementById('distance').value;

    if (userName && (restaurantInput || minPrice || maxPrice || distance)) {
        userInputs.push({
            userName: userName,
            restaurantInput: restaurantInput,
            minPrice: minPrice,
            maxPrice: maxPrice,
            distance: distance
        });

        // Clear the input fields
        document.getElementById('userName').value = '';
        document.getElementById('restaurantInput').value = '';
        document.getElementById('minPrice').value = '$';
        document.getElementById('maxPrice').value = '$$$$';
        document.getElementById('distance').value = '';

        // Update the preferences count and user names list
        updatePreferencesCount();
        updateUserNames();

        alert('Preferences submitted!');
    } else {
        alert('Please enter your name and at least one preference.');
    }
}

function findBestRestaurant() {
    if (userInputs.length === 0) {
        alert('No preferences submitted yet.');
        return;
    }

    // For simplicity, let's pick a random input for now
    const randomIndex = Math.floor(Math.random() * userInputs.length);
    const selectedInput = userInputs[randomIndex];

    // Display the winner announcement
    const winnerAnnouncement = document.getElementById('winnerAnnouncement');
    const winnerNameSpan = document.getElementById('winnerName');
    winnerNameSpan.textContent = selectedInput.userName;
    winnerAnnouncement.style.visibility = 'visible';

    // Hide the announcement after a short delay and open Google Maps
    setTimeout(() => {
        winnerAnnouncement.style.visibility = 'hidden';
        openGoogleMaps(selectedInput);
    }, 3000);
}

function openGoogleMaps(selectedInput) {
    // Construct the Google Maps URL
    let googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=';
    if (selectedInput.restaurantInput) {
        googleMapsUrl += encodeURIComponent(selectedInput.restaurantInput);
    } else {
        googleMapsUrl += 'restaurant';
    }

    // Add price levels if specified
    if (selectedInput.minPrice || selectedInput.maxPrice) {
        googleMapsUrl += `&minprice=${getPriceLevel(selectedInput.minPrice)}&maxprice=${getPriceLevel(selectedInput.maxPrice)}`;
    }

    // Open the URL in a new tab
    window.open(googleMapsUrl, '_blank');
}

function getPriceLevel(price) {
    switch (price) {
        case '$':
            return 1;
        case '$$':
            return 2;
        case '$$$':
            return 3;
        case '$$$$':
            return 4;
        default:
            return '';
    }
}

function resetPreferences() {
    userInputs = [];
    updatePreferencesCount();
    updateUserNames();
    alert('Preferences reset!');
}

function updatePreferencesCount() {
    document.getElementById('preferencesCount').innerText = `Preferences Submitted: ${userInputs.length} by ${new Set(userInputs.map(input => input.userName)).size} users`;
}

function updateUserNames() {
    const userNames = [...new Set(userInputs.map(input => input.userName))];
    document.getElementById('userNames').innerText = `Users: ${userNames.join(', ')}`;
}
