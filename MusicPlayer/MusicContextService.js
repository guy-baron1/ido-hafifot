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
  this.getSource = function () {
    return source;
  };
  this.getPlaying = function () {
    return playing;
  };
  this.getContext = function () {
    return context;
  };
  this.getCurrentSong = function () {
    return currentSong;
  };

  this.getDuration = function () {
    duration = source.buffer.duration;
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;
    return minutes.toString() + ":" + (seconds * 10).toString().substring(0, 2);
  };

  this.restartContext = function () {
    context.close();
    try {
      context = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      window.alert(
        "Sorry, but your browser doesn't support the Web Audio API!"
      );
    }
  };
  this.setSource = function (newSource) {
    source = newSource;
  };
  this.setPlaying = function (newPlaying) {
    playing = newPlaying;
  };
  this.setCurrentSong = function (newSong) {
    currentSong = newSong;
  };

  this.updatePlaying = function () {
    playing = !playing;
    return playing;
  };
});
