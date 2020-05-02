MusicApp.service("apiService", [
  "UrlConfig",
  "$http",
  function (UrlConfig, $http) {
    this.getPlaylists = getPlaylists;
    this.getAllSongs = getAllSongs;
    this.getSong = getSong;
    this.addPlaylist = addPlaylist;
    this.removeSongFromPlaylist = removeSongFromPlaylist;
    this.addSongToPlaylist = addSongToPlaylist;
    function getPlaylists() {
      return $http.get(UrlConfig.getPlaylists);
    }

    function getAllSongs() {
      return $http.get(UrlConfig.getAllSongs);
    }

    function getSong(songName) {
      return $http.get(UrlConfig.playSong + songName, UrlConfig.songHeader);
    }

    function addPlaylist(playlistName) {
      return $http.put(
        UrlConfig.addPlaylist + "?name=" + playlistName,
        UrlConfig.songHeader
      );
    }

    function addSongToPlaylist(playlistId, songName) {
      let data = { id: playlistId, songName };
      return $http.post(UrlConfig.addSong, data, UrlConfig.configHeader);
    }

    function removeSongFromPlaylist(playlistId, songName) {
      let sendData = { id: playlistId, songName };

      //Apperntly This Syntax wont Work Delete Because for some reason It Changes The Content Type
      // return $http.delete(
      //   UrlConfig.removeSong,
      //   sendData,
      //   UrlConfig.configHeader
      // );
      return $http({
        method: "DELETE",
        url: UrlConfig.removeSong,
        headers: {
          "Content-Type": "application/json",
        },
        data: sendData,
      });
    }
  },
]);
