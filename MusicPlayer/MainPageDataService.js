MusicApp.service("songsService", function () {
  let Songs = [{}];

  this.getSongs = function () {
    return Songs;
  };

  this.setSongs = function (songList) {
    Songs = songList;
  };
});
