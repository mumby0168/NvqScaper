using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using HtmlAgilityPack;

namespace Scaper
{
    record Criteria(int Count, string Code);

    record Module(string Name, IEnumerable<Criteria> Criteria);
    
    
    public class Program
    {
        /// <param name="gapAnalysis">A path to the course (html) of your gap analysis</param>
        /// <param name="showGaps">Whether to only show gaps defaults to true</param>
        /// <param name="lookAt">A module to print out i.e. EAMD4-114</param>
        static void Main(FileInfo gapAnalysis, string lookAt = null, bool showGaps = true)
        {
            if (gapAnalysis is null)
            {
                Fail($@"Please provide a file to process or use the -h option to see the help menu.");
                return;
            }
            
            if (!gapAnalysis.Exists)
            {
                Fail($@"{gapAnalysis} cannot be found to process");
                return;
            }

            var html = new HtmlDocument();  
            html.Load(gapAnalysis.FullName);
            
            var root = html.DocumentNode;
            var courseFolder = root.Descendants().Where(d => d.HasClass("course-folder")).ToList();
            var folder = courseFolder.FirstOrDefault();
            if (folder is null)
            {
                Fail("Cannot find a node with the class course-folder");
                return;
            }

            var chapterBlocks = folder.Descendants().Where(d => d.HasClass("chapter-block")).ToList();

            var modules = new List<Module>();
            
            
            foreach (var block in chapterBlocks)
            {
                Console.WriteLine($"Found {chapterBlocks.Count} modules");
                var title = block.Descendants().First(d => d.HasClass("hr-text"));
                Console.WriteLine($"{title.InnerText} processing");

                var table = block.Descendants().First(d => d.HasClass("table"));
                var body = table.Descendants().First(d => d.Name == "tbody");
                var row = body.Descendants().First(d => d.Name == "tr");
                var cols = body.Descendants().Where(d => d.Name == "td").ToList();
                var contentCol = cols[1];

                var criteria = new List<Criteria>();

                var pTags = contentCol.Descendants().Where(d => d.Name == "p").ToList();
                foreach (var tag in pTags)
                {
                    var badge = tag.Descendants().FirstOrDefault(d => d.HasClass("badge"));
                    var strong = tag.Descendants().FirstOrDefault(d => d.Name == "strong");
                    if (badge is { } && strong is { })
                    {
                        var code = strong.InnerText;
                        if (code.Last() == '.')
                        {
                            code = code.Remove(code.Length - 1, 1);
                        }
                        criteria.Add(new Criteria(int.Parse(badge.InnerText), code));
                    }
                }
                
                modules.Add(new Module(title.ChildNodes.First().InnerText, criteria));
            }
            
            WriteColor($"Outputting .......", ConsoleColor.Green);

            if (lookAt is not null)
            {
                var module = modules.FirstOrDefault(m => m.Name == lookAt);
                if (module is null)
                {
                    Fail($"{lookAt} cannot be found");
                }
                else
                {
                    WriteColor(module.Name, ConsoleColor.Cyan);
                    WriteCriteria(showGaps, module);
                }
            }
            else
            {
                foreach (var module in modules)
                {
                    WriteColor(module.Name, ConsoleColor.Cyan);
                    WriteCriteria(showGaps, module);
                }
            }



        }

        private static void WriteCriteria(bool showGaps, Module module)
        {
            foreach (var criteria in module.Criteria)
            {
                if (showGaps)
                {
                    if (criteria.Count < 3)
                    {
                        WriteColor($"\t[{criteria.Count}] {criteria.Code}", ConsoleColor.Magenta);
                    }
                }
                else
                {
                    WriteColor($"\t[{criteria.Count}] {criteria.Code}", ConsoleColor.Magenta);
                }
            }
        }


        private static void WriteColor(string text, ConsoleColor color)
        {
            Console.ForegroundColor = color;
            Console.WriteLine(text);
            Console.ResetColor();
        }


        private static void Fail(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(message);
            Console.ResetColor();
        }
    }
}
