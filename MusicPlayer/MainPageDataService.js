MusicApp.service("songsService", function () {
  let Songs = [{}];
  let Playlists = [{}];
  let PlayingSongs = [{}];
  let currentPlaylist = "";

  this.getCurrentPlaylist = function () {
    return currentPlaylist;
  };

  this.setCurrentPlaylist = function (playlistId) {
    currentPlaylist = playlistId;
  };

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

  this.getPlaylists = function () {
    return Playlists;
  };

  this.setPlaylists = function (newPlaylists) {
    Playlists = newPlaylists;
  };
});
