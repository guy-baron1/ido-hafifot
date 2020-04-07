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

        public bool CheckTask(bool checkStatus, int id)
        {

            TodoTask task = GetTaskById(id);
            if (task != null)
            {
                task.IsChecked = checkStatus;
                return true;
            }
            return false;
        }

        public bool RemoveTask(int id)
        {
            TodoTask task = GetTaskById(id);
            if (task != null)
            {
                bool succes = _tasks.Remove(task);
                return succes;
            }
            return false;
        }

        public TodoTask GetTaskById(int id)
        {
            foreach (TodoTask task in _tasks)
            {
                if (task.Id == id)
                {
                    return task;
                }

            }
            return null;
        }
    }
}
