window.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.viewer');
  const progress = document.querySelector('.progress');
  const progressFilled = document.querySelector('.progress__filled');
  const toggle = document.querySelector('.player__button.toggle');
  const volumeSlider = document.querySelector('input[name="volume"]');
  const rateSlider = document.querySelector('input[name="playbackRate"]');
  const skipButtons = document.querySelectorAll('[data-skip]');
  const errorMsg = document.querySelector('.error-message');

  // Replace local src with cloud video URL
  video.src = "https://www.w3schools.com/html/mov_bbb.mp4";

  function togglePlay() {
    video.paused ? video.play() : video.pause();
  }

  function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  function handleVolumeChange() {
    video.volume = volumeSlider.value;
  }

  function handleSpeedChange() {
    video.playbackRate = rateSlider.value;
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleError() {
    errorMsg.style.display = 'block';
  }

  // Event listeners
  video.addEventListener('click', togglePlay);
  toggle.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);
  video.addEventListener('error', handleError);

  volumeSlider.addEventListener('input', handleVolumeChange);
  rateSlider.addEventListener('input', handleSpeedChange);
  skipButtons.forEach(btn => btn.addEventListener('click', skip));

  let isMouseDown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => isMouseDown && scrub(e));
  progress.addEventListener('mousedown', () => isMouseDown = true);
  progress.addEventListener('mouseup', () => isMouseDown = false);
});
