class config {
  constructor() {
    this.playSong = "https://localhost:44336/song/";
    this.getPlaylists = "https://localhost:44336/api/Playlists";
    this.addSong = "https://localhost:44336/api/Playlists/addSong";
    this.removeSong = "https://localhost:44336/api/Playlists/removeSong";
    this.mainPlaylistId = "00000000-0000-0000-0000-000000000000";
    this.getAllSongs = "https://localhost:44336/api/Playlists/allSongs";

    this.addPlaylist = "https://localhost:44336/api/Playlists/add";
    this.configHeader = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    this.songHeader = {
      responseType: "arraybuffer",
    };
  }
}
