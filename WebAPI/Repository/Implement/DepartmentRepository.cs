using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Repository.Interface;
using WebAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Repository.Implement
{
	public class DepartmentRepository : IDepartmentRepository
	{
		private readonly APIContext _db;
		public DepartmentRepository(APIContext db)
		{
			_db = db;
		}
		public async Task<IEnumerable<Department>> GetAllDepartment()
		{
			return await _db.Departments.ToListAsync();
		}

		public async Task<Department> GetDepartmentById(int id)
		{
			return await _db.Departments.FirstOrDefaultAsync(c => c.Id == id);
		}

		public async Task<IEnumerable<Employee>> GetListEmployee(int id)
		{
			Department department = await _db.Departments.Include(c => c.Employees)
											.FirstOrDefaultAsync(c => c.Id == id);
			return department.Employees;
		}

		public async Task CreateDepartment(Department d)
		{
			_db.Departments.Add(d);
			await SaveAsync();
		}

		public async Task DeleteDepartment(int id)
		{
			Department d = await GetDepartmentById(id);
			_db.Departments.Remove(d);
			await SaveAsync();
		}

		public async Task UpdateDepartment(Department d)
		{
			_db.Departments.Update(d);
			await SaveAsync();
		}

		public async Task<bool> DepartmentExists(int id)
		{
			return await _db.Departments.AnyAsync(c => c.Id == id);
		}
		public async Task SaveAsync()
		{
			await _db.SaveChangesAsync();
		}
	}
}