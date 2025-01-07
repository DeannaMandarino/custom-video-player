/* Get Our Elements */
const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__screen');
const progress = player.querySelector('.video-player__controls--progress-bar');
const progressBar = player.querySelector('.video-player__controls--progress-bar__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.skip');
const ranges = player.querySelectorAll('.video-player__controls--slider');

/* Build Our Functions */
// Function to toggle play/pause
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

// Update play/pause button
function updateButton() {
  const icon = video.paused
   ? `<i class="fa-solid fa-play"></i>`
   : `<i class="fa-solid fa-pause"></i>`;
  toggle.innerHTML = icon;
}

// Skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

/* Hook Up the Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));