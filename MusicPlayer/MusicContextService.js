MusicApp.service("musicService", function () {
  let source;
  let currentSong = "";
  let playing = false;
  let context;
  try {
    context = new (window.AudioContext || window.webkitAudioContext)();
  } catch (error) {
    window.alert("Sorry, but your browser doesn't support the Web Audio API!");
  }

  this.getSource = getSource;
  this.getPlaying = getPlaying;
  this.getContext = getContext;
  this.getCurrentSong = getCurrentSong;
  this.getDuration = getDuration;
  this.restartContext = restartContext;
  this.setSource = setSource;
  this.setPlaying = setPlaying;
  this.setCurrentSong = setCurrentSong;
  this.updatePlaying = updatePlaying;

  function getSource() {
    return source;
  }
  function getPlaying() {
    return playing;
  }
  function getContext() {
    return context;
  }
  function getCurrentSong() {
    return currentSong;
  }

  function getDuration() {
    return source.buffer.duration;
  }

  function restartContext() {
    context.close();
    try {
      context = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      window.alert(
        "Sorry, but your browser doesn't support the Web Audio API!"
      );
    }
  }
  function setSource(newSource) {
    source = newSource;
  }
  function setPlaying(newPlaying) {
    playing = newPlaying;
  }
  function setCurrentSong(newSong) {
    currentSong = newSong;
  }

  function updatePlaying() {
    playing = !playing;
    return playing;
  }
});
