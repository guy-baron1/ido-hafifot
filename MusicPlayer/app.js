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

MusicApp.controller("MainPageCont", function ($scope, $http, serverService) {
  $scope.Songs = [];

  $scope.getAllSongsInit = function () {
    let response = serverService.getAllSongs();
    response.then(function (response) {
      $scope.Songs = angular.fromJson(response.data);
      console.log($scope.Songs);
    });
  };
  console.log("hello controller");
});
