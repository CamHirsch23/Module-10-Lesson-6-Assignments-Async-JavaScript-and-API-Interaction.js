// Import the md5 hashing function, if you're using this in a Node.js environment
// you would use require instead of import.
// const md5 = require('md5');

// Marvel API credentials
const publicKey = 'YOUR_PUBLIC_API_KEY'; // Replace with your actual public API key
const privateKey = 'YOUR_PRIVATE_API_KEY'; // Replace with your actual private API key
const apiBaseURL = "https://gateway.marvel.com/v1/public"; // Base URL for Marvel API

// Function to create the URL for API requests
function createURL() {
    const ts = Date.now(); // Timestamp for the request
    const hash = md5(ts + privateKey + publicKey); // Hash parameter for authentication
    const params = new URLSearchParams({
        ts: ts,
        apikey: publicKey,
        hash: hash
    });
    const endpoint = `${apiBaseURL}/characters?`; // Endpoint for fetching characters
    const url = endpoint + params.toString(); // Complete URL with parameters
    return url; // Return the complete URL
}

// Function to fetch Marvel characters
async function fetchMarvelCharacters() {
    const url = createURL(); // Create the URL for the API request
    try {
        const response = await fetch(url); // Fetch data from the API
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        return data.data.results; // Return the character data
    } catch (error) {
        console.error('Fetching Marvel characters failed:', error); // Log any errors
        return null;
    }
}

// Function to create a div element for each character
function createCharacterDiv(character) {
    const characterDiv = document.createElement('div');
    characterDiv.textContent = character.name; // Set the text content to the character's name
    return characterDiv;
}

// Function to update the UI with Marvel characters
async function updateUIWithMarvelCharacters() {
    const characters = await fetchMarvelCharacters(); // Fetch characters
    const charactersDiv = document.getElementById('characters'); // Get the characters div
    charactersDiv.innerHTML = ''; // Clear the div before adding new content

    if (characters) {
        characters.forEach(character => {
            const characterElement = createCharacterDiv(character); // Create a div for each character
            charactersDiv.appendChild(characterElement); // Append the character div to the characters div
        });
    } else {
        charactersDiv.textContent = 'Failed to fetch characters.'; // Display an error message if characters could not be fetched
    }
}

// Call updateUIWithMarvelCharacters immediately, then every 5 seconds
updateUIWithMarvelCharacters();
setInterval(updateUIWithMarvelCharacters, 5000);
