using AutoMapper;
using EReferral.Service;
using EReferral.Service.Models;
using EReferral.Web.Filters;
using EReferral.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EReferral.Web.Controllers.Apis
{
    public class ReferralsController : ApiController
    {
        private IReferralService _referralService;

        public ReferralsController(IReferralService referralService)
        {
            _referralService = referralService;
        }

        // GET api/<controller>
        public IEnumerable<PatientViewModel> Get()
        {
            var patients = _referralService.GetAllPatients();
            return Mapper.Map<List<PatientViewModel>>(patients);
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [ModelValidationFilter]
        public HttpResponseMessage Post(PatientInput patient)
        {
            var patientToSave = Mapper.Map<Patient>(patient);
            var result = _referralService.AddPatient(patientToSave);

            var response = Request.CreateResponse(HttpStatusCode.Created, result);
            if (result != null)
            {
                string uri = Url.Link(WebApiConfig.ControllerAndId, new { id = result.Id });
                response.Headers.Location = new Uri(uri);
                return response;
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
    }
}