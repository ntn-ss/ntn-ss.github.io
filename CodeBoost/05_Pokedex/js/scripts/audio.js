const playPauseButton = document.getElementById('playPauseButton');
const audio = document.getElementById('pokemonCry');

playPauseButton.addEventListener('click', function() {
  if (audio.paused) {
    audio.play();
    playPauseButton.classList.remove('play');
    playPauseButton.classList.add('pause');
  } else {
    audio.pause();
    playPauseButton.classList.remove('pause');
    playPauseButton.classList.add('play');
  }
});

audio.addEventListener('ended', function() {
  playPauseButton.classList.remove('pause');
  playPauseButton.classList.add('play');
});