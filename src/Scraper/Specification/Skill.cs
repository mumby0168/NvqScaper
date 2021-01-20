using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace Scaper.Specification
{
    public class Skill
    {
        [XmlAttribute]
        public string Code { get; set; }
        [XmlElement]
        public SkillCriteria Criteria { get; set; }
        [XmlArray]
        public List<SkillPoint> Points { get; set; }
        
        public bool Evaluate()
        {
            var numberMet = 0;
            foreach (var point in Points)
            {
                if (point.NumberOfTimesMet > 0)
                {
                    if (Criteria.Unique)
                    {
                        numberMet++;
                    }
                    else
                    {
                        numberMet += point.NumberOfTimesMet;
                    }
                }
            }

            if (numberMet >= Criteria.NumberToMeet)
                return true;

            return false;
        }
        
        public SkillPoint GetPoint(string code)
        {
            foreach (var point in Points)
            {
                if (point.Code == code)
                    return point;
            }

            return null;
        }
    }
}