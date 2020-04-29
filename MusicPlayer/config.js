class config {
  constructor() {
    this.playSong = "https://localhost:44336/song/";
    this.getPlaylists = "https://localhost:44336/api/Latiumtify/Playlists";
    this.mainPlaylistId = "00000000-0000-0000-0000-000000000000";
    this.getAllSongs =
      "https://localhost:44336/api/Latiumtify/playlists/" + this.mainPlaylistId;

    this.addPlaylist = "http://localhost:44336/api/Latiumtify/add";
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
