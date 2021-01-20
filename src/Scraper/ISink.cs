using System;

namespace Scaper
{
    public interface ISink
    {
        void Write(string message, ConsoleColor color = ConsoleColor.White);
        void WriteError(string errorMessage);
    }
}