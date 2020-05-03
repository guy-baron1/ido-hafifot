using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using LatiumtifyServer_Commons;

namespace LatiumtifyServer_DL
{
    public class RamDB : IDB
    {
        private List<Playlist> _playlists;
        private List<Song> _songs;
        private string _sourceUrl;
        private List<string> _files;
        public RamDB(string sourceUrl)
        {
            Console.WriteLine("hello " + sourceUrl);
            _sourceUrl = sourceUrl;
            _playlists = new List<Playlist>();
            _files = Directory.GetFiles(_sourceUrl).ToList();
            List<Song> allSongs = new List<Song>();
            _files.ForEach(file =>
            {
                Song song = new Song(Path.GetFileName(file).ToLower());
                allSongs.Add(song);
            });
            _songs = allSongs;
        }

        public Playlist AddPlaylist(string name)
        {
            Console.WriteLine("hello " + _sourceUrl);
            Playlist newPlaylist = new Playlist(name);
            _playlists.Add(newPlaylist);
            return newPlaylist;
        }

        public IEnumerable<Playlist> GetPlaylists()
        {
            return _playlists;
        }

        public IEnumerable<Song> GetAllSongs()
        {
            return _songs;
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
                    throw new ArgumentNullException("No Playlist With This Id Exists " + e);
                }
            }
            else
            {
                throw new ArgumentException("No Song With This Name In Folder");
            }
        }

        private bool songExistsInFolder(string name)
        {
            if(_files.Any(file => Path.GetFileName(file).ToLower() == name.ToLower()))
            {
                return true;
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
                    throw new ArgumentNullException("The Arguments You Entered Where Invalid " + e);
                }
            }
            else
            {
                throw new ArgumentException("No Song With This Name In The Folder");
            }
        }
    }
}
