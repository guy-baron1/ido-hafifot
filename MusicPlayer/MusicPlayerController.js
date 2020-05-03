MusicApp.controller("MusicPlayerCont", function (
  $rootScope,
  $scope,
  $interval,
  apiService,
  musicService,
  playlistService
) {
  $scope.Songs;
  $scope.service = musicService;
  $scope.ctime = 0;
  $scope.stopTime = false;
  $scope.duration = undefined;
  let currBuffer;
  $scope.playing = musicService.getPlaying();
  $scope.playSong = function (songName, time) {
    if (musicService.getContext() !== undefined) {
      musicService.restartContext();
      if (musicService.getSource()) {
        musicService.getSource().stop();
      }
      const response = apiService.getSong(songName);
      response.then(function (response) {
        musicService
          .getContext()
          .decodeAudioData(response.data, function (buffer) {
            musicService.setSource(
              musicService.getContext().createBufferSource()
            );
            musicService.getSource().onended = onSongEnded;
            currBuffer = buffer;
            musicService.getSource().buffer = buffer;
            musicService
              .getSource()
              .connect(musicService.getContext().destination);
            $scope.duration = musicService.getDuration();
            $rootScope.$broadcast("NewSongPlaying", {
              duration: $scope.duration,
            });
            musicService.setCurrentSong(songName);
            musicService.getSource().start(0, time);
            $scope.ctime = time;
            // playlistService.setSongsAsPlaying();
            musicService.setPlaying(true);
          });
      });
    }
  };

  function onSongEnded(event) {
    musicService.setPlaying(false);
    $scope.playNext(1);
  }

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

  $scope.songDuration = function (stringNeeded) {
    if (musicService.getSource()) {
      let duration = $scope.duration;
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
        $scope.Songs.findIndex(
          (song) => song.songName == musicService.getCurrentSong()
        ) + movment;
      if (nextSongIndex >= $scope.Songs.length) {
        nextSongIndex = 0;
      } else if (nextSongIndex < 0) {
        nextSongIndex = $scope.Songs.length - 1;
      }
      $scope.playSong($scope.Songs[nextSongIndex].songName, 0);
    }
  };

  $scope.$on("SwitchedPlaylist", function (events, args) {
    $scope.Songs = args.Songs;
  });
  $scope.$on("NewSongPlaying", function (events, args) {
    $scope.duration = args.duration;
  });
});
