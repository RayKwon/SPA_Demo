using EReferral.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EReferral.Service
{
    public interface IReferralService
    {
        IList<Patient> GetAllPatients();
        Patient AddPatient(Patient patient);
    }
}
