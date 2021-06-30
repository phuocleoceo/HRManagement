using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Repository.Interface;
using WebAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Repository.Implement
{
	public class EmployeeRepository : IEmployeeRepository
	{
		private readonly APIContext _db;
		public EmployeeRepository(APIContext db)
		{
			_db = db;
		}

		public async Task<IEnumerable<Employee>> GetAllEmployee()
		{
			return await _db.Employees.Include(c => c.Department).ToListAsync();
		}

		public async Task<Employee> GetEmployeeById(int id)
		{
			return await _db.Employees.Include(c => c.Department)
							.FirstOrDefaultAsync(c => c.Id == id);
		}

		public async Task CreateEmployee(Employee e)
		{
			_db.Employees.Add(e);
			await SaveAsync();
		}

		public async Task DeleteEmployee(int id)
		{
			Employee e = await GetEmployeeById(id);
			_db.Employees.Remove(e);
			await SaveAsync();
		}

		public async Task UpdateEmployee(Employee e)
		{
			_db.Employees.Update(e);
			await SaveAsync();
		}

		public async Task<bool> EmployeeExists(int id)
		{
			return await _db.Employees.AnyAsync(c => c.Id == id);
		}

		public async Task SaveAsync()
		{
			await _db.SaveChangesAsync();
		}
	}
}