using System;
using System.Collections.Generic;
using System.Text;

namespace TodoServer_Commons
{
    public interface IDB
    {
        IEnumerable<TodoTask> GetTasks();
        void RemoveTask(int id);
        void AddTask(TodoTask addedTask);
        void CheckTask(bool checkStatus, int id);
    }
}
