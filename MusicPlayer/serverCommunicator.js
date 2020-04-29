MusicApp.service("serverService", [
  "UrlConfig",
  "$http",
  function (UrlConfig, $http) {
    this.getPlaylists = function () {
      return $http.get(UrlConfig.getPlaylists);
    };

    this.getAllSongs = function () {
      return $http.get(UrlConfig.getAllSongs);
    };

    this.getSong = function (songName) {
      return $http.get(UrlConfig.playSong + songName, UrlConfig.songHeader);
    };

    this.addPlaylist = function (playlistName) {
      console.log(UrlConfig.addPlaylist + "?name=" + playlistName);
      return $http.put(
        UrlConfig.addPlaylist + "?name=" + playlistName,
        UrlConfig.songHeader
      );
    };

    this.addSongToPlaylist = function (playlistId, songName) {
      return $http.put(
        UrlConfig.getPlaylists + "/" + playlistId + "/add/" + songName,
        UrlConfig.configHeader
      );
    };

    this.removeSongFromPlaylist = function (playlistId, songName) {
      return $http.delete(
        UrlConfig.getPlaylists + "/" + playlistId + "/add/" + songName,
        UrlConfig.configHeader
      );
    };
  },
]);
