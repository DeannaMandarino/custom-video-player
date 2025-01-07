/* Get Our Elements */
const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__screen');
const progress = player.querySelector('.video-player__controls--progress-bar');
const progressBar = player.querySelector('.video-player__controls--progress-bar__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.skip');
const ranges = player.querySelectorAll('.video-player__controls--slider');
const mute = player.querySelector('.mute');

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

// Handle range input changes (volume/speed)
function handleRangeUpdate() {
  video[this.name] = this.value;

  if (this.name === 'volume' && this.value == 0) {
    video.muted = true;
    mute.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  } 
  else {
    video.muted = false;
    mute.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  }
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub video when clicking/dragging on progress bar
function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Function to toggle mute/unmute
function toggleMute() {
  video.muted = !video.muted;

  const icon = video.muted
    ? `<i class="fa-solid fa-volume-xmark"></i>`
    : `<i class="fa-solid fa-volume-high"></i>`;
  mute.innerHTML = icon;

  if (video.muted) {
    // If muted, set volume slider to 0
    ranges.forEach(range => {
      if (range.name === 'volume') {
        range.value = 0;
      }
    });
  } 
  else {
    // If unmuted, restore volume from previous state
    ranges.forEach(range => {
      if (range.name === 'volume') {
        range.value = video.volume;
      }
    });
  }
}

/* Hook Up the Event Listeners */
// Event listeners for play/pause
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

// Event listeners for skip (forwards & backwards) buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Event listeners for range input changes (volume & speed)
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

// Event listener for video time changing
video.addEventListener('timeupdate', handleProgress);

// Event listeners for clicking & dragging progress bar
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Event listener for mute/unmute
mute.addEventListener('click', toggleMute);