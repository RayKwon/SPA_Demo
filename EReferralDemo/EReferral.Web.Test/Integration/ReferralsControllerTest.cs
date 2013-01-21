/*
 * What to Test? 
 *  : Routing, Authentication, HttpResponseMessage details
 **/

using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Http;
using System.Net.Http;
using Should;
using System.Net;
using EReferral.Service.Models;
using Microsoft.Practices.Unity;
using EReferral.Service;
using Moq;
using System.Collections.Generic;
using EReferral.Web.ViewModels;
using AutoMapper;

namespace EReferral.Web.Test.Integration
{
    [TestClass]    
    public class ReferralsControllerTest
    {
        private static string baseAddress = "http://localhost:1859/";
        private static HttpConfiguration config;
        private static HttpServer server;
        private static HttpClient client;
        private static Mock<IReferralService> mock;


        [ClassInitialize]
        public static void Setup(TestContext context)
        {
            // Arrange 
            config = new HttpConfiguration();
            WebApiConfig.Register(config);
            AutoMapperConfig.CreateMap();

            // define mock and assign to the unity container
            mock = new Mock<IReferralService>();
            IUnityContainer container = new UnityContainer();
            container.RegisterInstance<IReferralService>(mock.Object);
            UnityBootstrapper.Initialise(config, container);

            // in-memory httpserver and client
            server = new HttpServer(config);
            client = new HttpClient(server);
        }

        [TestMethod]
        public void Get_Should_Route_Correctly()
        {
            // Act
            var response = client.GetAsync(baseAddress + "api/referrals").Result;

            // Assert
            response.StatusCode.ShouldEqual(HttpStatusCode.OK);
            response.Content.Headers.ContentType.MediaType.ShouldEqual("application/json");
        }

        [TestMethod]
        public void Get_Should_Return_Patients()
        {
            // Arrange
            var patient = new Patient { Id = 0, Cell = "000-111-2222", Email = "a@a.com", FirstName = "hj", LastName = "kwon" };
            mock.Setup(s => s.GetAllPatients()).Returns(new List<Patient> { patient });

            // Act
            var response = client.GetAsync(baseAddress + "api/referrals").Result;
            
            // Assert
            var result = response.Content.ReadAsStringAsync().Result;
            result.ShouldContain("Id");
            result.ShouldContain("0");
            result.ShouldContain("Cell");
            result.ShouldContain("000-111-2222");
            result.ShouldContain("Email");
            result.ShouldContain("a@a.com");
            result.ShouldContain("FullName");
            result.ShouldContain("kwon hj");
        }

        [TestMethod]
        public void Post_Should_Save_Successfully()
        {
            // Arrange
            var patient = new Patient { Id=0, LastName = "", FirstName = "", Email = "a@a.com", Cell = "" };
            var patientInput = new PatientInput { LastName = "", FirstName = "", Email = "a@a.com", Cell = "" };
            mock.Setup<Patient>(s => s.AddPatient(It.IsAny<Patient>())).Returns(patient);

            // Act
            var response = client.PostAsJsonAsync<PatientInput>(baseAddress + "api/referrals", patientInput).Result; 
            
            // Assert
            response.StatusCode.ShouldEqual(HttpStatusCode.Created);
            var result = response.Content.ReadAsStringAsync().Result;
            result.ShouldContain("Email");
            result.ShouldContain("a@a.com");
        }

        [TestMethod]
        public void Post_Should_Validae_Model()
        {
            // Arrange
            var patient = new PatientInput { LastName = "", FirstName = "", Email = "", Cell = "" };

            // Act
            var response = client.PostAsJsonAsync<PatientInput>(baseAddress + "api/referrals", patient).Result;

            // Assert
            response.StatusCode.ShouldEqual(HttpStatusCode.BadRequest);
            var result = response.Content.ReadAsStringAsync().Result;
            result.ShouldContain("Email is required");
        }
    }
}
