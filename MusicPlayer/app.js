var MusicApp = angular
  .module("musicApp", ["ngMaterial", "ngMessages"])
  .constant("UrlConfig", new config())
  .config(function ($mdThemingProvider) {
    $mdThemingProvider
      .theme("IdoTheme")
      .primaryPalette("pink", {
        default: "900",
      })
      .accentPalette("light-blue", {
        default: "A700",
      })
      .warnPalette("amber")
      .dark();
  });

MusicApp.controller("MainPageCont", function (
  UrlConfig,
  $scope,
  serverService,
  songsService
) {
  $scope.Playlists = [{}];
  $scope.mainPlaylistId = UrlConfig.mainPlaylistId;
  console.log($scope.mainPlaylistId);
  $scope.getAllSongsInit = function () {
    let response = serverService.getAllSongs();
    response.then(function (response) {
      songsService.setSongs(angular.fromJson(response.data));
    });
    songsService.setCurrentPlaylist($scope.mainPlaylistId);
  };

  $scope.getAllPlaylists = function () {
    let response = serverService.getPlaylists();
    response.then(function (response) {
      songsService.setPlaylists(angular.fromJson(response.data));
    });
  };

  $scope.updateSongs = function (playlistSongs, playlistId) {
    songsService.setSongs(playlistSongs);
    songsService.setCurrentPlaylist(playlistId);
  };

  $scope.getSongs = function () {
    return songsService.getSongs();
  };

  $scope.getPlaylists = function () {
    return songsService.getPlaylists();
  };

  $scope.getCurrentPlaylist = function () {
    return songsService.getCurrentPlaylist();
  };

  $scope.openMenu = function ($mdMenu, ev) {
    originatorEv = ev;
    $mdMenu.open(ev);
  };

  $scope.addSongToPlaylist = function (playlistId, songName) {
    console.log({ songName: songName });
    $scope
      .getPlaylists()
      .find((playlist) => playlist.id === playlistId)
      .songs.push({ songName: songName });
    serverService.addSongToPlaylist(playlistId, songName);
  };

  $scope.removeFromPlaylist = function (songName) {
    let newSongList = $scope
      .getPlaylists()
      .find((playlist) => playlist.id === $scope.getCurrentPlaylist())
      .songs.filter((song) => song.songName != songName);
    $scope
      .getPlaylists()
      .find(
        (playlist) => playlist.id === $scope.getCurrentPlaylist()
      ).songs = newSongList;
    songsService.setSongs(newSongList);
    serverService.removeSongFromPlaylist($scope.getCurrentPlaylist(), songName);
  };
});
