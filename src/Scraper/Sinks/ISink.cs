using System;
using Scaper.Specification;

namespace Scaper.Sinks
{
    public interface ISink
    {
        void Write(string message, ConsoleColor color = ConsoleColor.White);
        void WriteError(string errorMessage);
        void WriteModuleGapAnalysis(Module module);
        void WriteWarning(string s);
        void WriteModuleSummary(Module nvqModule);
        void WriteInfo(string s);
    }
}