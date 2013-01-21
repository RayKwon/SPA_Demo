using EReferral.Service.RetrieveDocumentSet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EReferral.Service.XdsWebServiceAdapter
{
    public class RetrieveDocumentSetAdapter : IRetrieveDocumentSetAdapter
    {
        public string GetDocument()
        {
            var ws = new RetrieveDocumentSetWebService();
            return ws.GetDocument();
        }
    }
}
