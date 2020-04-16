using System;
using System.Collections.Generic;
using System.Linq;
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

        public void AddTask(TodoTask addedTask)
        {
            _tasks.Add(addedTask);
        }

        public void CheckTask(bool checkStatus, int id)
        {
            TodoTask task = _tasks.FirstOrDefault<TodoTask>(obj => obj.Id == id);
            if (task != null)
            {
                task.IsChecked = checkStatus;
            }
            else
            {
                throw new ArgumentException("No Task With This Id");
            }
        }

        public void RemoveTask(int id)
        {
            TodoTask task = _tasks.FirstOrDefault<TodoTask>(obj => obj.Id == id);
            if (task != null)
            {
                bool succes = _tasks.Remove(task);
            }
            else
            {
                throw new ArgumentException("No Task With This Id");
            }
        }

    }
}
