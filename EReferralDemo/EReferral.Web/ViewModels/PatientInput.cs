using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EReferral.Web.ViewModels
{
    public class PatientInput
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        [StringLength(20, ErrorMessage="Cell number should be less than 20")]
        public string Cell { get; set; }
        
        [StringLength(30, ErrorMessage="Email should be less than 30")]
        [Required(ErrorMessage="Email is required")]
        public string Email { get; set; }
    }
}