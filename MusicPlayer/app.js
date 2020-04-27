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
  $scope,
  serverService,
  songsService
) {
  $scope.Songs = [{}];
  $scope.Playlists = [{}];

  $scope.getAllSongsInit = function () {
    let response = serverService.getAllSongs();
    response.then(function (response) {
      songsService.setSongs(angular.fromJson(response.data));
    });
  };

  $scope.getAllPlaylists = function () {
    let response = serverService.getPlaylists();
    response.then(function (response) {
      $scope.Playlists = angular.fromJson(response.data);
      console.log($scope.Playlists);
    });
    console.log("Hello");
  };

  $scope.updateSongs = function (playlistSongs) {
    console.log("Here");
    songsService.setSongs(playlistSongs);
    console.log($scope.Songs);
  };

  $scope.getSongs = function () {
    return songsService.getSongs();
  };
});
