using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data.Configuration
{
	public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
	{
		public void Configure(EntityTypeBuilder<Department> builder)
		{
			builder.HasData
			(
			  new Department { Id = 1, Name = "IT" },
			  new Department { Id = 2, Name = "Finance" },
			  new Department { Id = 3, Name = "Production" },
			  new Department { Id = 4, Name = "Sale" }
			);
		}
	}
}