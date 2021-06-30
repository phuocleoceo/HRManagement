using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repository.Interface
{
	public interface IEmployeeRepository
	{
		Task<IEnumerable<Employee>> GetAllEmployee();

		Task<Employee> GetEmployeeById(int id);

		Task CreateEmployee(Employee e);

		Task UpdateEmployee(Employee e);

		Task DeleteEmployee(int id);

		Task<bool> EmployeeExists(int id);

		Task SaveAsync();
	}
}