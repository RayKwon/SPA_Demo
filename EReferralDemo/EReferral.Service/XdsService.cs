using EReferral.Service.Models;
using EReferral.Service.XdsWebServiceAdapter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EReferral.Service
{
    public class XdsService : IXdsService
    {
        private IRetrieveDocumentSetAdapter _adapter;

        public XdsService(IRetrieveDocumentSetAdapter adapter)
        {
            _adapter = adapter;
        }

        public string GetAllDocuments()
        {
            return string.Format("this is {0}", _adapter.GetDocument());
        }
    }
}
