﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EReferral.Web.ViewModels
{
    public class PatientViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Cell { get; set; }
        public string Email { get; set; }
    }
}