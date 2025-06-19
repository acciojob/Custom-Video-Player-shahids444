window.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('.player');
  const video = player.querySelector('.viewer');
  const progress = player.querySelector('.progress');
  const progressBar = player.querySelector('.progress__filled');
  const toggle = player.querySelector('.player__button.toggle');
  const volumeSlider = player.querySelector('input[name="volume"]');
  const playbackRateSlider = player.querySelector('input[name="playbackRate"]');
  const skipButtons = player.querySelectorAll('button[data-skip]');
  const errorMessage = player.querySelector('.error-message');

  // Play/Pause toggle
  function togglePlay() {
    if (video.paused) video.play();
    else video.pause();
  }

  // Update Play/Pause button icon
  function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  // Update progress bar as video plays
  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // Scrub through video when clicking progress bar
  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  // Volume control
  function handleVolumeUpdate() {
    video.volume = volumeSlider.value;
  }

  // Playback speed control
  function handlePlaybackRateUpdate() {
    video.playbackRate = playbackRateSlider.value;
  }

  // Skip buttons
  function skip() {
    const skipTime = parseFloat(this.dataset.skip);
    video.currentTime = Math.min(Math.max(0, video.currentTime + skipTime), video.duration);
  }

  // Video error handling
  function handleError() {
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Error loading video.';
  }

  // Event listeners
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);
  video.addEventListener('error', handleError);

  toggle.addEventListener('click', togglePlay);

  volumeSlider.addEventListener('input', handleVolumeUpdate);
  playbackRateSlider.addEventListener('input', handlePlaybackRateUpdate);

  skipButtons.forEach(button => button.addEventListener('click', skip));

  // Scrubbing
  let mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);

  // Set initial volume and playback rate values on load
  video.volume = volumeSlider.value;
  video.playbackRate = playbackRateSlider.value;
});
