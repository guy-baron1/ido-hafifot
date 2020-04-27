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
  },
]);
