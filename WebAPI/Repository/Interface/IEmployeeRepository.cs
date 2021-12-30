using WebAPI.Models.RequestModel;
using WebAPI.Extension.Paging;
using WebAPI.Models;

namespace WebAPI.Repository.Interface;

public interface IEmployeeRepository
{
    Task<PagedList<Employee>> GetAllEmployee(EmployeeParameters employeeParameters);

    Task<Employee> GetEmployeeById(int id);

    Task CreateEmployee(Employee e);

    Task UpdateEmployee(Employee e);

    Task DeleteEmployee(int id);

    Task<bool> EmployeeExists(int id);

    Task SaveAsync();
}
