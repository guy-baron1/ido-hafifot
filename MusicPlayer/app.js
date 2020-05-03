var MusicApp = angular
  .module("musicApp", ["ngMaterial", "ngMessages"])
  .constant("UrlConfig", new config())
  .config(function ($mdThemingProvider) {
    $mdThemingProvider
      .theme("IdoTheme")
      .primaryPalette("purple", {
        default: "800",
      })
      .accentPalette("purple", {
        default: "600",
      })
      .warnPalette("amber")
      .dark();
  });

MusicApp.controller("MainPageCont", function (
  $rootScope,
  UrlConfig,
  $scope,
  apiService,
  playlistService,
  $mdDialog
) {
  $scope.Playlists = [{}];
  $scope.Songs = [{}];
  $scope.CurrentPlaylist = "";

  $scope.getAllSongsInit = function () {
    const response = apiService.getAllSongs();
    response.then(function (response) {
      $scope.updateSongs(angular.fromJson(response.data, undefined));
    });
  };

  $scope.getAllPlaylists = function () {
    const response = apiService.getPlaylists();
    response.then(function (response) {
      $scope.Playlists = angular.fromJson(response.data);
    });
  };

  $scope.updateSongs = function (playlistSongs, playlistId) {
    $scope.Songs = playlistSongs;
    $scope.CurrentPlaylist = playlistId;
    $rootScope.$broadcast("SwitchedPlaylist", {
      Songs: $scope.Songs,
      CurrentPlaylist: $scope.CurrentPlaylist,
    });
  };

  $scope.openMenu = function ($mdMenu, ev) {
    originatorEv = ev;
    $mdMenu.open(ev);
  };

  $scope.addSongToPlaylist = function (playlistId, songName) {
    $scope.Playlists.find((playlist) => playlist.id === playlistId).songs.push({
      songName,
    });
    $rootScope.$broadcast("PlaylistsChanged", {
      Playlists: $scope.Playlists,
    });
    apiService.addSongToPlaylist(playlistId, songName);
  };

  $scope.removeFromPlaylist = function (songName) {
    if ($scope.CurrentPlaylist) {
      let newSongList = $scope.Playlists.find(
        (playlist) => playlist.id === $scope.CurrentPlaylist
      ).songs.filter((song) => song.songName != songName);
      $scope.Playlists.find(
        (playlist) => playlist.id === $scope.CurrentPlaylist
      ).songs = newSongList;
      $scope.Songs = newSongList;
      $rootScope.$broadcast("CurrentPlaylistChanged", {
        Playlists: $scope.Playlists,
        Songs: $scope.Songs,
      });
      apiService.removeSongFromPlaylist($scope.CurrentPlaylist, songName);
    }
  };

  $scope.addNewPlaylist = function (playlistName) {
    const response = apiService.addPlaylist(playlistName);
    response.then(function (response) {
      $scope.Playlists.push(angular.fromJson(response.data));
      $rootScope.$broadcast("PlaylistsChanged", {
        Playlists: $scope.Playlists,
      });
    });
  };

  $scope.showNewPlaylistNameMenu = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog
      .prompt()
      .title("Create A New Playlist")
      .textContent("Enter A Name For The Playlist")
      .initialValue("")
      .targetEvent(ev)
      .required(true)
      .ok("Create")
      .cancel("Cancel");

    $mdDialog.show(confirm).then(function (result) {
      $scope.addNewPlaylist(result);
    });
  };

  $scope.$on("SwitchedPlaylist", function (events, args) {
    $scope.Songs = args.Songs;
    $scope.CurrentPlaylist = args.CurrentPlaylist;
  });

  $scope.$on("CurrentPlaylistChanged", function (events, args) {
    $scope.Songs = args.Songs;
    $scope.Playlists = args.Playlists;
  });

  $scope.$on("PlaylistsChanged", function (events, args) {
    $scope.Playlists = args.Playlists;
  });
});
