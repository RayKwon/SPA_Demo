using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using EReferral.Web.Controllers.Apis;
using EReferral.Service;
using Should;
using Moq;
using EReferral.Service.Models;
using System.Collections.Generic;
using System.Linq;

namespace EReferral.Web.Test.UnitTests
{
    [TestClass]
    public class ReferralsControllerTest
    {
        [TestMethod]
        public void Get_Should_Return_Patient()
        {
            // Arrange
            var mock = new Mock<IReferralService>();
            mock.Setup(s => s.GetAllPatients()).Returns(new List<Patient> { new Patient() });
            
            var controller = new ReferralsController(mock.Object);

            // Act
            var patients = controller.Get();

            // Assert
            patients.ShouldNotBeEmpty();
            patients.Count().ShouldEqual(1);
        }
    }
}
