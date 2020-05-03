using System;
using System.Collections.Generic;
using System.Text;

namespace LatiumtifyServer_Commons
{
    public class Song
    {
        public Song(string songName)
        {
            this.songName = songName;
        }

        public string songName { get; private set; }
    }
}
