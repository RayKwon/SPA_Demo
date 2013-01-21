using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using EReferral.Service.XdsWebServiceAdapter;
using Should;

namespace EReferral.Service.Test
{
    [TestClass]
    public class XdsServiceTest
    {
        [TestMethod]
        public void GetDocument_Test()
        {
            // Arrange
            var mock = new Mock<IRetrieveDocumentSetAdapter>();
            mock.Setup(a => a.GetDocument()).Returns("document");
            var service = new XdsService(mock.Object);
            
            // Act
            var documents = service.GetAllDocuments();

            // Assert
            documents.ShouldEqual("this is document");
        }
    }
}
