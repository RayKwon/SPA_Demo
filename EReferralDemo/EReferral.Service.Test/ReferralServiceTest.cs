using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Should;
using System.Data.Entity;
using EReferral.Service.Models;

namespace EReferral.Service.Test
{
    [TestClass]
    public class ReferralServiceTest
    {

        [ClassInitialize]
        public static void Setup(TestContext context)
        {
            Database.SetInitializer<EReferralContext>(new DropCreateDatabaseAlways<EReferralContext>());
        }

        [ClassCleanup]
        public static void Cleanup()
        {
        }

        [TestMethod]
        public void GetAllPatients_Should_Empty()
        {
            // Arrange
            var service = new ReferralService();

            // Act
            var patients = service.GetAllPatients();

            // Assert
            patients.ShouldBeEmpty();
        }

        [TestMethod]
        public void GetAllPatients_Should_Return_Patients()
        {
            // Arrange
            using (var context = new EReferralContext())
            {
                context.Patients.Add(new Patient { Email = "a@a.com" });
                context.Patients.Add(new Patient { Email = "b@b.com" });
                context.SaveChanges();
            }

            var service = new ReferralService();

            // Act
            var patients = service.GetAllPatients();

            // Assert
            patients.ShouldNotBeNull();
            patients.Count.ShouldEqual(2);
            
        }

        [TestMethod]
        public void AddPatient_Should_Save_Patient()
        {
            // Arrange
            var service = new ReferralService();

            // Act
            var patient = service.AddPatient(new Patient { Email = "a@a.com" });

            // Assert
            patient.ShouldNotBeNull();
            patient.Email.ShouldEqual("a@a.com");

        }

    }
}
