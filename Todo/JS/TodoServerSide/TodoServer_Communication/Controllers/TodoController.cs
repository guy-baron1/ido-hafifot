using System.Net.Http;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using TodoServer_Commons;
using System.Collections.Generic;
using TodoServer_DL;
namespace ServerCommunication.Controllers
{
    [ApiController]
    [Route("api/Todo")]
    public class TodoController : ControllerBase
    {
        private static IDB _currentDB = new RamDB();

        public ActionResult<IEnumerable<TodoTask>> GetAllTasks()
        {
            return Ok(_currentDB.GetTasks());
        }

        [HttpPut]
        public ActionResult AddTask(TodoTask task)
        {
            if (task != null)
            {
                _currentDB.AddTask(task);
                return Ok("Added Task");
            }
            else
            {
                return BadRequest();
            }
        }
        
        [HttpDelete("{id}")]
        public ActionResult RemoveTask(int id)
        {
            return Ok("Removed" + id);
        }
    }
}