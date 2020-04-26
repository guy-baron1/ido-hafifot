class config {
  constructor() {
    this.playSong = "https://localhost:44336/song/";
    this.getPlaylists = "http://localhost:44336/api/Latiumtify/playlists";
    this.getAllSongs =
      "https://localhost:44336/api/Latiumtify/playlists/00000000-0000-0000-0000-000000000000";

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
