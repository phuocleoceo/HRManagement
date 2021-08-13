using System.Threading.Tasks;
using WebAPI.Models.RequestModel;
using WebAPI.Models;
using WebAPI.Repository.Interface;
using WebAPI.Data;
using WebAPI.Extension.Paging;
using WebAPI.Extension.Filtering;
using Microsoft.EntityFrameworkCore;
using WebAPI.Extension.Searching;

namespace WebAPI.Repository.Implement
{
	public class EmployeeRepository : IEmployeeRepository
	{
		private readonly APIContext _db;
		public EmployeeRepository(APIContext db)
		{
			_db = db;
		}

		public async Task<PagedList<Employee>> GetAllEmployee(EmployeeParameters employeeParameters)
		{
			var emps = await _db.Employees
							.FilterSeniority(employeeParameters.MinSeniority, employeeParameters.MaxSeniority)
							.Search(employeeParameters.SearchTerm)
							.Include(c => c.Department).ToListAsync();
			return emps.ToPagedList(employeeParameters.PageNumber, employeeParameters.PageSize);
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