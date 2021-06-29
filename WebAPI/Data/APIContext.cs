using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Data.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WebAPI.Data
{
	public class APIContext : IdentityDbContext<User>
	{
		public APIContext(DbContextOptions<APIContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new EmployeeConfiguration());
			modelBuilder.ApplyConfiguration(new DepartmentConfiguration());
			base.OnModelCreating(modelBuilder);
			foreach (var entityType in modelBuilder.Model.GetEntityTypes())
			{
				var tableName = entityType.GetTableName();
				if (tableName.StartsWith("AspNet"))
				{
					entityType.SetTableName(tableName.Substring(6));
				}
			}
		}

		public DbSet<Employee> Employees { get; set; }

		public DbSet<Department> Departments { get; set; }
	}
}