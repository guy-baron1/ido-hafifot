using System;
using System.Collections.Generic;
using System.Text;

namespace LatiumtifyServer_Commons
{
    public class Playlist
    {
        public string playlistName { get; set; }
        public List<Song> songs { get; private set; }
        public Guid id { get; private set; }

        public Playlist(string playlistName, List<Song> songs)
        {
            id = Guid.NewGuid();
            this.playlistName = playlistName;
            this.songs = songs;
        }

        public Playlist(string playlistName, List<Song> songs,Guid id)
        {
            this.id = id;
            this.playlistName = playlistName;
            this.songs = songs;
        }

        public Playlist(string playlistName)
        {
            this.id = Guid.NewGuid();
            this.playlistName = playlistName;
            this.songs = new List<Song>();
        }
    }
}
