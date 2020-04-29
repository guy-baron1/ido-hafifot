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
    [Route("api/Latiumtify")]
    public class LatiumtifyController : ControllerBase
    {
        IConfiguration Configuration;
        private static IDB _currentDB = new RamDB("C:\\secretFolder");

        public LatiumtifyController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet("Playlists")]
        public IEnumerable<Playlist> GetAllPlaylists()
        {
            return _currentDB.GetPlaylists();
        }

        [HttpGet("Playlists/{id}")]
        public IEnumerable<Song> GetAllPlaylists(Guid id)
        {
            return _currentDB.GetPlaylistSongs(id);
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

        [HttpPut("Playlists/{id}/add/{name}")]
        public ActionResult AddSongToPlaylist(Guid id,string name)
        {
            try
            {
                _currentDB.AddSongToPlaylist(id,name);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest("Failed To Add Song To Playlist - " + e);
            }

            return Ok("Added song Playlist");
        }

        [HttpDelete("Playlists/{id}/add/{name}")]
        public ActionResult RemoveSongToPlaylist(Guid id, string name)
        {
            try
            {
                _currentDB.RemoveSongFromPlaylist(id, name);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest("Failed To Remove From Playlist - " + e);
            }

            return Ok("Removed song Playlist");
        }
    }
}