using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace EReferral.Web
{
    public static class XmlFormatterConfig
    {
        public static void RemoveXmlFormatter(HttpConfiguration config)
        {
            config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}