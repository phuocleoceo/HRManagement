using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Data.Configuration;

namespace WebAPI.Data
{
	public class APIContext : DbContext
	{
		public APIContext(DbContextOptions<APIContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new EmployeeConfiguration());
			modelBuilder.ApplyConfiguration(new DepartmentConfiguration());
			base.OnModelCreating(modelBuilder);
		}

		public DbSet<Employee> Employees { get; set; }

		public DbSet<Department> Departments { get; set; }
	}
}