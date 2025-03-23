// index.js

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// DOM Elements
const imageContainer = document.getElementById('dog-image-container');
const breedList = document.getElementById('dog-breeds');
const breedDropdown = document.getElementById('breed-dropdown');

// Store breeds for filtering
let allBreeds = [];

document.addEventListener('DOMContentLoaded', () => {
  // Challenge 1: Fetch and render dog images
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Dog';
        imageContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching images:', error));

  // Challenge 2: Fetch and render dog breeds
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = Object.keys(data.message); // Extract breed names
      renderBreeds(allBreeds);
    })
    .catch(error => console.error('Error fetching breeds:', error));
});

// Challenge 3: Change color on click
breedList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.style.color = 'purple'; // Or any color
  }
});

// Challenge 4: Filter breeds by dropdown
breedDropdown.addEventListener('change', (event) => {
  const selectedLetter = event.target.value;
  if (selectedLetter === 'all') {
    renderBreeds(allBreeds);
  } else {
    const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
    renderBreeds(filteredBreeds);
  }
});

// Helper function to render breeds
function renderBreeds(breeds) {
  breedList.innerHTML = ''; // Clear existing list
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.textContent = breed;
    breedList.appendChild(li);
  });
}