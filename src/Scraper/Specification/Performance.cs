using System.Xml.Serialization;

namespace Scaper.Specification
{
    public class Performance
    {
        [XmlAttribute]
        public string Code { get; set; }
        public int NumberOfTimesMet { get; set; }

        public bool Evaluate()
        {
            return NumberOfTimesMet >= 3;
        }
    }
}