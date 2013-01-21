using AutoMapper;
using EReferral.Service.Models;
using EReferral.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EReferral.Web
{
    public class AutoMapperConfig
    {
        public static void CreateMap()
        {
            Mapper.CreateMap<Patient, PatientInput>();
            Mapper.CreateMap<PatientInput, Patient>();
            Mapper.CreateMap<Patient, PatientViewModel>()
                    .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => string.Format("{0} {1}", src.LastName, src.FirstName)));
        }
    }
}