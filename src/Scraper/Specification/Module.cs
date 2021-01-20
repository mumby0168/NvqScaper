using System.Collections.Generic;
using System.Xml.Serialization;

namespace Scaper.Specification
{
    public class Module
    {
        [XmlAttribute]
        public string Code { get; set; }
        [XmlArray]
        public List<Skill> SkillRequirements { get; set; }
        [XmlArray]
        public List<Performance> PerformanceRequirements { get; set; }
        
        public Performance GetPerformance(string code)
        {
            foreach (var performance in PerformanceRequirements)
            {
                if (performance.Code == code)
                    return performance;
            }

            return null;
        }
        
        public Skill GetSkill(string code)
        {
            foreach (var skill in SkillRequirements)
            {
                if (skill.Code == code)
                    return skill;
            }

            return null;
        }
    }
}