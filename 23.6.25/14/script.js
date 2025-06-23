const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

let currentPage = 1;
const limit = 10; // Number of images per fetch
let isLoading = false;

/**
 * Fetches images from JSONPlaceholder API using pagination
 */
async function fetchImages(page, limit) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    loader.textContent = 'Failed to load images.';
    return [];
  }
}

/**
 * Renders fetched images to the DOM
 */
async function loadImages() {
  if (isLoading) return;
  isLoading = true;
  loader.style.display = 'block';

  const images = await fetchImages(currentPage, limit);
  images.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.thumbnailUrl;
    img.alt = photo.title;
    gallery.appendChild(img);
  });

  currentPage++;
  isLoading = false;
  loader.style.display = 'none';
}

/**
 * Detects when the user scrolls near the bottom of the page to load more images
 */
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
    loadImages();
  }
});

// Initial load
loadImages();
