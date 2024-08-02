// Task 1: Obtaining API Key and Configuration
const publicKey = 'YOUR_PUBLIC_API_KEY'; // Replace with your actual public API key
const privateKey = 'YOUR_PRIVATE_API_KEY'; // Replace with your actual private API key
const ts = Date.now(); // Timestamp for the request
const hash = md5(ts + privateKey + publicKey); // Hash parameter for authentication

// Task 2: Fetching Characters Using Fetch API
async function fetchMarvelCharacters() {
  const ts = Date.now(); // Timestamp for the request
  const hash = md5(ts + privateKey + publicKey); // Hash parameter for authentication
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`; // API endpoint URL

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

// Task 3: Updating User Interface Dynamically
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
