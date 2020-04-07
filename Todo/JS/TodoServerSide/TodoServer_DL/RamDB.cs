using System;
using System.Collections.Generic;
using System.Text;
using TodoServer_Commons;
namespace TodoServer_DL
{
    public class RamDB : TodoServer_Commons.IDB
    {
        private List<TodoTask> _tasks;

        public RamDB()
        {
            _tasks = new List<TodoTask>();
        }
        public IEnumerable<TodoTask> GetTasks()
        {
            return _tasks;
        }

        public bool AddTask(TodoTask addedTask)
        {
            _tasks.Add(addedTask);
            return true;
        }

        public bool CheckTask(bool checkStatus,int id)
        {
            throw new NotImplementedException();
        }


        public bool RemoveTask(int id)
        {
            foreach(TodoTask task in _tasks)
            {
                if(task.Id == id)
                {
                    bool succes = _tasks.Remove(task);
                    return succes;
                }
            }
            return false;
        }
    }
}
