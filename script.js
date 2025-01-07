/* Get Our Elements */
const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__screen');
const progress = player.querySelector('.video-player__controls--progress-bar');
const progressBar = player.querySelector('.video-player__controls--progress-bar__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.skip');
const ranges = player.querySelectorAll('.video-player__controls--slider');