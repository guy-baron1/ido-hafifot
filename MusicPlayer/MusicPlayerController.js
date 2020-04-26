MusicApp.controller("MusicPlayerCont", function (
  $scope,
  serverService,
  musicService
) {
  $scope.service = musicService;
  $scope.playing = musicService.getPlaying();
  $scope.playSong = function (songName) {
    if (musicService.getContext() !== undefined) {
      musicService.restartContext();
      let response = serverService.getSong(songName);
      response.then(function (response) {
        musicService
          .getContext()
          .decodeAudioData(response.data, function (buffer) {
            musicService.setSource(
              musicService.getContext().createBufferSource()
            );
            musicService.getSource().buffer = buffer;
            musicService
              .getSource()
              .connect(musicService.getContext().destination);
            musicService.setCurrentSong(songName);
            musicService.setPlaying(true);
            musicService.getSource().start();
          });
      });
      // $scope.playing = musicService.updatePlaying();
    }
  };

  $scope.resumOrPauseSong = function () {
    if (musicService.getCurrentSong() != "") {
      if (musicService.getContext().state === "running") {
        musicService.getContext().suspend();
      } else if (musicService.getContext().state === "suspended") {
        musicService.getContext().resume();
      }
      /* $scope.playing = */ musicService.updatePlaying();
    }
  };

  $scope.getValue = function () {
    return musicService.getPlaying();
  };

  $scope.duration = function () {
    if (musicService.getSource()) {
      return musicService.getDuration();
    } else {
      return "0.0";
    }
  };
});
