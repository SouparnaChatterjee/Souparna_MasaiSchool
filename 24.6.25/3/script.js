let slide = 1;
let lastClickTime = 0;
let clickCount = 0;

const image = document.getElementById('image');
const slideNumber = document.getElementById('slideNumber');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateImage() {
  image.src = `https://picsum.photos/600/400?random=${Date.now()}`;
  slideNumber.innerText = `Slide #${slide}`;
}

function handleClick(direction) {
  const now = Date.now();

  // Track clicks within 1 second
  if (now - lastClickTime < 1000) {
    clickCount++;
    if (clickCount > 3) {
      alert("Chill chill, loading it!!");
      return;
    }
    return; // prevent actual image update
  }

  // Reset counter and update time
  lastClickTime = now;
  clickCount = 1;

  // Update slide count
  if (direction === 'next') slide++;
  else if (direction === 'prev' && slide > 1) slide--;

  updateImage();
}

nextBtn.addEventListener('click', () => handleClick('next'));
prevBtn.addEventListener('click', () => handleClick('prev'));
