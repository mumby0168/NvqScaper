using System.Xml.Serialization;

namespace Scaper.Specification
{
    public class SkillCriteria
    {
        [XmlAttribute]
        public int NumberToMeet { get; set; }
        [XmlAttribute]
        public bool Unique { get; set; }
    }
}