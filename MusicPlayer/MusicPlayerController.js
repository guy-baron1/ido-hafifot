MusicApp.controller("MusicPlayerCont", function (
  $scope,
  $interval,
  serverService,
  musicService,
  songsService
) {
  $scope.service = musicService;
  $scope.ctime = 0;
  $scope.stopTime = false;
  let currBuffer;
  $scope.playing = musicService.getPlaying();
  $scope.playSong = function (songName, time) {
    if (musicService.getContext() !== undefined) {
      musicService.restartContext();
      if (musicService.getSource()) {
        musicService.getSource().stop();
      }
      let response = serverService.getSong(songName);
      response.then(function (response) {
        musicService
          .getContext()
          .decodeAudioData(response.data, function (buffer) {
            musicService.setSource(
              musicService.getContext().createBufferSource()
            );
            musicService.getSource().onended = function (event) {
              musicService.setPlaying(false);
              $scope.playNext(1);
            };
            currBuffer = buffer;
            musicService.getSource().buffer = buffer;
            musicService
              .getSource()
              .connect(musicService.getContext().destination);
            musicService.setCurrentSong(songName);
            musicService.getSource().start(0, time);
            $scope.ctime = time;
            songsService.setSongsAsPlaying();
            musicService.setPlaying(true);
          });
      });
    }
  };

  $interval(function () {
    if ($scope.isPlaying() && !$scope.stopTime) {
      $scope.ctime += 0.1;
    }
  }, 100);

  $scope.resumOrPauseSong = function () {
    if (musicService.getCurrentSong() != "") {
      if (musicService.getContext().state === "running") {
        musicService.getContext().suspend();
      } else if (musicService.getContext().state === "suspended") {
        musicService.getContext().resume();
      }
      musicService.updatePlaying();
    }
  };

  $scope.isPlaying = function () {
    return musicService.getPlaying();
  };

  $scope.duration = function (stringNeeded) {
    if (musicService.getSource()) {
      let duration = musicService.getDuration();
      if (stringNeeded) {
        return $scope.timeToTimeString(duration);
      } else {
        return duration;
      }
    } else {
      return "00:00";
    }
  };

  $scope.timeToTimeString = function (duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes.toString() + ":" + seconds.toString().substring(0, 2);
  };

  $scope.changeTime = function (newTime) {
    $scope.playSong(musicService.getCurrentSong(), $scope.ctime);
    $scope.stopTime = false;
  };

  $scope.playNext = function (movment) {
    if (musicService.getCurrentSong() != "") {
      let nextSongIndex =
        songsService
          .getPlayingSongs()
          .findIndex((song) => song.songName == musicService.getCurrentSong()) +
        movment;
      if (nextSongIndex >= songsService.getPlayingSongs().length) {
        nextSongIndex = 0;
      } else if (nextSongIndex < 0) {
        nextSongIndex = songsService.getPlayingSongs().length;
      }
      $scope.playSong(
        songsService.getPlayingSongs()[nextSongIndex].songName,
        0
      );
    }
  };
});
