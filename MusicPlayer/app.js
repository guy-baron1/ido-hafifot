var MusicApp = angular
  .module("musicApp", ["ngMaterial", "ngMessages"])
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

MusicApp.controller("MainPageCont", function ($scope, $http) {
  $scope.Songs = [
    { Name: "hello", Artist: "Unknown" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
    { Name: "hello" },
    { Name: "world" },
  ];
  console.log("hello controller");
});
