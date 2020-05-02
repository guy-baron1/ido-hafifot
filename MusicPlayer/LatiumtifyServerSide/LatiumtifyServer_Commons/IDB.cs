using System;
using System.Collections.Generic;
using System.Text;

namespace LatiumtifyServer_Commons
{
    public interface IDB
    {
        IEnumerable<Playlist> GetPlaylists();
        IEnumerable<Song> GetAllSongs();
        Playlist AddPlaylist(string name);
        void AddSongToPlaylist(Guid id, string name);
        void RemoveSongFromPlaylist(Guid id, string name);
    }
}
