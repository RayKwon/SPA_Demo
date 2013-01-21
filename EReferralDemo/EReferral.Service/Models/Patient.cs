using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EReferral.Service.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Cell { get; set; }
        public string Email { get; set; }
    }

    public class PatientMap : EntityTypeConfiguration<Patient>
    {
        public PatientMap()
        {
            this.ToTable("Patients");

            this.Property(p => p.Cell)
                .HasMaxLength(20);

            this.Property(p => p.Email)
                .HasMaxLength(30)
                .IsRequired();
        }
    }
}
