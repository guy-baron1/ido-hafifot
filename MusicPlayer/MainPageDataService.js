MusicApp.service("playlistService", function () {
  this.Songs = [{}];
  let Playlists = [{}];
  let PlayingSongs = [{}];
  let currentPlaylist = "";

  this.getCurrentPlaylist = getCurrentPlaylist;
  this.setCurrentPlaylist = setCurrentPlaylist;
  this.getSongs = getSongs;
  this.setSongs = setSongs;
  this.getPlayingSongs = getPlayingSongs;
  this.setSongsAsPlaying = setSongsAsPlaying;
  this.getPlaylists = getPlaylists;
  this.setPlaylists = setPlaylists;

  function getCurrentPlaylist() {
    return currentPlaylist;
  }

  function setCurrentPlaylist(playlistId) {
    currentPlaylist = playlistId;
  }

  function getSongs() {
    return this.Songs;
  }

  function setSongs(songList) {
    Songs = songList;
  }

  function getPlayingSongs() {
    return PlayingSongs;
  }

  function setSongsAsPlaying() {
    PlayingSongs = Songs;
  }

  function getPlaylists() {
    return Playlists;
  }

  function setPlaylists(newPlaylists) {
    Playlists = newPlaylists;
  }
});
