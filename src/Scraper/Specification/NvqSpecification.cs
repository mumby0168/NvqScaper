using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Authentication.ExtendedProtection;
using System.Xml.Serialization;

namespace Scaper.Specification
{
    public class NvqSpecification
    {
        [XmlAttribute]
        public string Version { get; set; }
        [XmlArray]
        public List<Module> Modules { get; set; }

        public Module GetModule(string code)
        {
            foreach (var module in Modules)
            {
                if (module.Code == code)
                    return module;
            }

            return null;
        }

        public static NvqSpecification Load(string path)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(NvqSpecification));

            using Stream reader = new FileStream(path, FileMode.Open);
            return (NvqSpecification) xmlSerializer.Deserialize(reader);
        }
    }
}