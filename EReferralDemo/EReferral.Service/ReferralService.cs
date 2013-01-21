using EReferral.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EReferral.Service
{
    public class ReferralService : IReferralService
    {
        public IList<Models.Patient> GetAllPatients()
        {
            using (var db = new EReferralContext())
            {
                return db.Patients.ToList();
            }
        }

        public Patient AddPatient(Patient patient)
        {
            using (var db = new EReferralContext())
            {
                var returnedPatient = db.Patients.Add(patient);
                db.SaveChanges();
                return returnedPatient;
            }
        }
    }
}
