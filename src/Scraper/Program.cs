using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Serialization;
using HtmlAgilityPack;
using Scaper.Specification;

namespace Scaper
{
    public class Program
    {
        public enum AvailableSinks
        {
            Console=1
        }
        
        private static ISink _sink = null;
        private static NvqSpecification _nvq = null;

        /// <param name="gapAnalysis">A path to the course (html) of your gap analysis</param>
        /// <param name="showGaps">Whether to only show gaps defaults to true</param>
        /// <param name="nvqSpecification">The path to the nvq specification file</param>
        /// <param name="lookAt">A module to print out i.e. EAMD4-114</param>
        /// /// <param name="sinkType">The type of sink to use to write output</param>
        static void Main(FileInfo gapAnalysis, FileInfo nvqSpecification=null, string lookAt = null, bool showGaps = true, AvailableSinks sinkType = AvailableSinks.Console)
        {
            switch (sinkType)
            {
                default:
                    throw new ArgumentException("Invalid sink type value.");
                
                case AvailableSinks.Console:
                    _sink = new ConsoleSink();
                    break;
            }
            
            
            if (nvqSpecification == null)
            {
                nvqSpecification = new FileInfo("nvq_specification.xml");
            }
            _nvq = NvqSpecification.Load(nvqSpecification.FullName);

            _sink.Write($"Loaded NVQ Specification, version {_nvq.Version}.");

            
            if (gapAnalysis is null)
            {
                _sink.WriteError($@"Please provide a file to process or use the -h option to see the help menu.");
                return;
            }
            
            if (!gapAnalysis.Exists)
            {
                _sink.WriteError($@"{gapAnalysis} cannot be found to process");
                return;
            }

            var html = new HtmlDocument();  
            html.Load(gapAnalysis.FullName);
            
            var root = html.DocumentNode;
            var courseFolder = root.Descendants().Where(d => d.HasClass("course-folder")).ToList();
            var folder = courseFolder.FirstOrDefault();
            if (folder is null)
            {
                _sink.WriteError("Cannot find a node with the class course-folder");
                return;
            }

            var chapterBlocks = folder.Descendants().Where(d => d.HasClass("chapter-block")).ToList();
            _sink.Write($"Found {chapterBlocks.Count} modules");
            
            foreach (var block in chapterBlocks)
            {
                var title = block.Descendants().First(d => d.HasClass("hr-text"));
                _sink.Write($"Processing {title.InnerText}");

                var table = block.Descendants().First(d => d.HasClass("table"));
                var body = table.Descendants().First(d => d.Name == "tbody");
                var row = body.Descendants().First(d => d.Name == "tr");
                var cols = body.Descendants().Where(d => d.Name == "td").ToList();
                var contentCol = cols[1];

                var module = _nvq.GetModule(title.ChildNodes.First().InnerText);

                if (module == null)
                {
                    _sink.WriteWarning($"Module with the name {title.ChildNodes.First().InnerText} cannot be found!");
                    continue;
                }
                
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
                        
                        if (code[0] == 'p' || code[0] == 'P')
                        {
                            var performance = module.GetPerformance(code);
                            if (performance == null)
                            {
                                _sink.WriteWarning($"Performance point with the code {code} cannot be found!");
                                continue;
                            }
                            
                            performance.NumberOfTimesMet = int.Parse(badge.InnerText);
                        }
                        else
                        {
                            var skill = module.GetSkill(code.Split('.')[0]);
                            if (skill == null)
                            {
                                _sink.WriteWarning($"Skill with the start of the code as {code.Split('.')[0]} cannot be found!");
                                continue;
                            }
                            
                            var skillPoint = skill.GetPoint(code);
                            if (skillPoint == null)
                            {
                                _sink.WriteWarning($"Skill point with the code as {code} cannot be found!");
                                continue;
                            }
                            
                            skillPoint.NumberOfTimesMet = int.Parse(badge.InnerText);
                        }
                    }
                }
            }
            
            _sink.Write($"Outputting .......", ConsoleColor.Green);

            if (lookAt is not null)
            {
                var module = _nvq.GetModule(lookAt);
                
                if (showGaps)
                {
                    foreach (var nvqModule in _nvq.Modules)
                    {
                        _sink.WriteModuleGapAnalysis(nvqModule);
                    }
                }
                else
                {
                    foreach (var nvqModule in _nvq.Modules)
                    {
                        _sink.WriteModuleSummary(nvqModule);
                    }
                }
            }
            else
            {
                if (showGaps)
                {
                    foreach (var nvqModule in _nvq.Modules)
                    {
                        _sink.WriteModuleGapAnalysis(nvqModule);
                    }
                }
                else
                {
                    foreach (var nvqModule in _nvq.Modules)
                    {
                        _sink.WriteModuleSummary(nvqModule);
                    }
                }
            }
        }
    }
}
