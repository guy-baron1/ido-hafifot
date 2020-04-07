using System;
using System.Collections.Generic;
using System.Text;

namespace TodoServer_Commons
{
    public interface IDB
    {
        IEnumerable<TodoTask> GetTasks();
        bool RemoveTask(int id);
        bool AddTask(TodoTask addedTask);
        bool CheckTask(bool checkStatus, int id);
    }
}
