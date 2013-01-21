using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EReferral.Service.Models
{
    public class EReferralContextInitialization : DropCreateDatabaseAlways<EReferralContext>
    {
        protected override void Seed(EReferralContext context)
        {
            base.Seed(context);

            // add constraints
            context.Database.ExecuteSqlCommand("ALTER TABLE Patients ADD CONSTRAINT uc_Paticents_Email UNIQUE NONCLUSTERED(Email)");


            // init data
            //context.Patients.Add(new Patient { Cell = "000-111-2222", Email = "a@a.com", FirstName = "hyojung", LastName = "Kwon" });
            //context.SaveChanges();
            
        }
    }
}
