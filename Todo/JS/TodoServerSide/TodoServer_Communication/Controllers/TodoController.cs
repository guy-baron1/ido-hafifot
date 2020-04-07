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
        
        [HttpDelete]
        public ActionResult RemoveTask(int Id)
        {
            bool status = _currentDB.RemoveTask(Id);
            if (status)
            {
                return Ok("Removed" + Id);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public ActionResult CheckTask(int id,bool isChecked)
        {
            bool status = _currentDB.CheckTask(isChecked,id);
            if (status)
            {
                return Ok(id + " Check Is Now: " + isChecked);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}