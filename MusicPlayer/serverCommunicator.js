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
  },
]);
