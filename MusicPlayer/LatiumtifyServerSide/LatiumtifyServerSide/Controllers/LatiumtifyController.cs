using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LatiumtifyServer_Commons;
using LatiumtifyServer_DL;
using Microsoft.Extensions.Configuration;

namespace LatiumtifyServerSide.Controllers
{
    [ApiController]
    [Route("api/Playlists")]
    public class LatiumtifyController : ControllerBase
    {
        IConfiguration Configuration { get;set;}
        private readonly IDB _currentDB;

        public LatiumtifyController(IDB db)
        {
            _currentDB = db;
        }

        public IEnumerable<Playlist> GetAllPlaylists()
        {
            return _currentDB.GetPlaylists();
        }

        [HttpGet("allSongs")]
        public IEnumerable<Song> GetAllSongs()
        {
            return _currentDB.GetAllSongs();
        }

        [HttpPut("add")]
        public ActionResult AddPlaylist(string name)
        {
            Playlist retPlaylist;
            try
            {
                retPlaylist = _currentDB.AddPlaylist(name);
            }
            catch(Exception e)
            {
                return BadRequest("Failed To Add Playlist - " + e);
            }

            return Ok(retPlaylist);
        }

        [HttpPost("addSong")]
        public ActionResult AddSongToPlaylist(PlaylistEditModel model)
        {
            try
            {
                _currentDB.AddSongToPlaylist(model.id,model.songName);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest("Failed To Add Song To Playlist - " + e);
            }

            return Ok("Added song Playlist");
        }

        [HttpDelete("removeSong")]
        public ActionResult RemoveSongToPlaylist(PlaylistEditModel model)
        {
            try
            {
                _currentDB.RemoveSongFromPlaylist(model.id, model.songName);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest("Failed To Remove From Playlist - " + e);
            }

            return Ok("Removed song Playlist");
        }
    }
}