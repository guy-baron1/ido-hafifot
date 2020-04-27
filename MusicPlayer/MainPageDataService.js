MusicApp.service("songsService", function () {
  let Songs = [{}];
  let PlayingSongs = [{}];

  this.getSongs = function () {
    return Songs;
  };

  this.setSongs = function (songList) {
    Songs = songList;
  };

  this.getPlayingSongs = function () {
    return PlayingSongs;
  };

  this.setSongsAsPlaying = function () {
    PlayingSongs = Songs;
  };
});
