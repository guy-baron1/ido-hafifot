using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using LatiumtifyServer_Commons;

namespace LatiumtifyServer_DL
{
    public class RamDB : IDB
    {
        private List<Playlist> _playlists;
        private string _sourceUrl;
        private static Guid _mainPlaylistId = new Guid();

        public RamDB(string sourceUrl)
        {
            _sourceUrl = sourceUrl;
            _playlists = new List<Playlist>();
            string[] files = Directory.GetFiles(_sourceUrl);
            List<Song> allSongs = new List<Song>();
            foreach (string file in files)
            {
                Song song = new Song(Path.GetFileName(file).ToLower());
                allSongs.Add(song);
            }
            Playlist mainPlaylist = new Playlist("All Songs", allSongs, _mainPlaylistId);
            _playlists.Add(mainPlaylist);
        }

        public void AddPlaylist(string name)
        {
            List<Song> songs = new List<Song>();
            Playlist newPlaylist = new Playlist(name, songs);
            _playlists.Add(newPlaylist);
        }

        public IEnumerable<Playlist> GetPlaylists()
        {
            return _playlists;
        }

        public IEnumerable<Song> GetPlaylistSongs(Guid id)
        {
            return _playlists.Find(playlist => playlist.id == id).songs;
        }

        public void AddSongToPlaylist(Guid id, string name)
        {
            if (songExistsInFolder(name))
            {
                Song newsong = new Song(name);
                try
                {
                    _playlists.Find(playlist => playlist.id == id).songs.Add(newsong);
                }
                catch (ArgumentNullException e)
                {
                    throw new ArgumentNullException("No Playlist With This Id Exists");
                }
            }
            else
            {
                throw new ArgumentNullException("No Song With This Name In Folder");
            }
        }

        private bool songExistsInFolder(string name)
        {
            string[] files = Directory.GetFiles(_sourceUrl);
            foreach (string file in files)
            {
                if (Path.GetFileName(file).ToLower() == name.ToLower())
                {
                    return true;
                }
            }
            return false;
        }

        public void RemoveSongFromPlaylist(Guid id, string name)
        {
            if (songExistsInFolder(name))
            {
                try
                {
                    _playlists.Find(playlist => playlist.id == id).songs.RemoveAll(song => song.songName == name);
                }
                catch (ArgumentNullException e)
                {
                    throw new ArgumentNullException("The Arguments You Entered Where Invalid");
                }
            }
            else
            {
                throw new ArgumentNullException("No Song With This Name In The Folder");
            }
        }
    }
}
