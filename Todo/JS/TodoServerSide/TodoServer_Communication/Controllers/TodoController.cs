using System.Net.Http;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using TodoServer_Commons;
using System.Collections.Generic;
using TodoServer_DL;
using System;

namespace ServerCommunication.Controllers
{
    [ApiController]
    [Route("api/Todo")]
    public class TodoController : ControllerBase
    {
        private static IDB _currentDB = new RamDB();

        public IEnumerable<TodoTask> GetAllTasks()
        {
            return _currentDB.GetTasks();
        }

        [HttpPut("Add")]
        public ActionResult AddTask(TodoTask task)
        {
            if (task != null)
            {
                _currentDB.AddTask(task);
                return Ok("Added Task");
            }
            return BadRequest();
        }

        [HttpDelete("Delete")]
        public ActionResult RemoveTask(int Id)
        {
            try
            {
                _currentDB.RemoveTask(Id);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.ToString());
            }
            return Ok("Removed" + Id);

        }

        [HttpPut("Check/{id}")]
        public ActionResult CheckTask(int id, bool isChecked)
        {
            try
            {
                _currentDB.CheckTask(isChecked, id);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e);
            }
            return Ok(id + " Check Is Now: " + isChecked);
        }
    }
}