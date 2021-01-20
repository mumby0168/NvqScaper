using System.Xml.Serialization;

namespace Scaper.Specification
{
    public class SkillPoint
    {
        [XmlAttribute]
        public string Code { get; set; }
        public int NumberOfTimesMet { get; set; }
    }
}