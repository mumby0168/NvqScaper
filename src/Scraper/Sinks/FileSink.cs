using System;
using System.IO;
using System.Runtime.CompilerServices;
using Scaper.Specification;

namespace Scaper.Sinks
{
    public class FileSink : ISink
    {
        private const string _filepath = "gap_analysis.txt";
        public FileSink()
        {
            if (File.Exists(_filepath))
            {
                File.Delete(_filepath);
            }
        }
        
        public void Write(string message, ConsoleColor color = ConsoleColor.White)
        {
            File.AppendAllText(_filepath, message + "\n");
        }

        public void WriteError(string errorMessage)
        {
            Write("Error: " + errorMessage, ConsoleColor.Red);
        }

        public void WriteModuleGapAnalysis(Module module)
        {
            Write($"Module ({module.Code}) Gap Analysis", ConsoleColor.Green);
            Write("Performance Gaps");
            foreach (var performanceRequirement in module.PerformanceRequirements)
            {
                if (!performanceRequirement.Evaluate())
                {
                    Write($"\t[{performanceRequirement.NumberOfTimesMet}] {performanceRequirement.Code}", ConsoleColor.Magenta);
                }
            }
            
            Write("Skill Gaps");
            foreach (var skillRequirement in module.SkillRequirements)
            {
                if (!skillRequirement.Evaluate())
                {
                    foreach (var skillPoint in skillRequirement.Points)
                    {
                        Write($"\t[{skillPoint.NumberOfTimesMet}] {skillPoint.Code}", ConsoleColor.Magenta);
                    }
                }
            }
        }

        public void WriteModuleSummary(Module module)
        {
            Write($"Module ({module.Code}) Gap Analysis", ConsoleColor.Blue);
            Write("Performance Summary");
            foreach (var performanceRequirement in module.PerformanceRequirements)
            {
                if (!performanceRequirement.Evaluate())
                {
                    Write($"\t[{performanceRequirement.NumberOfTimesMet}] {performanceRequirement.Code}", ConsoleColor.Magenta);
                }
                else
                {
                    Write($"\t[{performanceRequirement.NumberOfTimesMet}] {performanceRequirement.Code}", ConsoleColor.Green);
                }
            }
            
            Write("Skill Summary");
            foreach (var skillRequirement in module.SkillRequirements)
            {
                if (!skillRequirement.Evaluate())
                {
                    foreach (var skillPoint in skillRequirement.Points)
                    {
                        Write($"\t[{skillPoint.NumberOfTimesMet}] {skillPoint.Code}", ConsoleColor.Magenta);
                    }
                }
                else
                {
                    foreach (var skillPoint in skillRequirement.Points)
                    {
                        Write($"\t[{skillPoint.NumberOfTimesMet}] {skillPoint.Code}", ConsoleColor.Green);
                    }
                }
            }
        }

        public void WriteInfo(string message)
        {
            Write("Info: " + message, ConsoleColor.Gray);
        }

        public void WriteWarning(string warningMessage)
        {
            Write("Warning: " + warningMessage, ConsoleColor.Yellow);
        }
    }
}