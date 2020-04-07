using System;
using System.Collections.Generic;
using System.Text;

namespace TodoServer_Commons
{
    public class TodoTask
    {
        public string Text { get; set; }
        public int Id { get; set; }
        public bool IsChecked { get; set; }
    }
}
