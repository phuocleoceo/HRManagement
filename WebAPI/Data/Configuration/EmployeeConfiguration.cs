using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data.Configuration;

public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.HasData
        (
          new Employee
          {
              Id = 1,
              Name = "Truong Minh Phuoc",
              DepartmentId = 1,
              DateOfJoining = new DateTime(2001, 08, 10),
              PhotoURL = "phuoc.png"
          }
        );
    }
}
