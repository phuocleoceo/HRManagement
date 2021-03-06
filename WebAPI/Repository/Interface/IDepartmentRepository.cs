using WebAPI.Models.RequestModel;
using WebAPI.Extension.Paging;
using WebAPI.Models;

namespace WebAPI.Repository.Interface;

public interface IDepartmentRepository
{
    Task<PagedList<Department>> GetAllDepartment(DepartmentParameters departmentParameters);

    Task<Department> GetDepartmentById(int id);

    Task<IEnumerable<Employee>> GetListEmployee(int id);

    Task CreateDepartment(Department d);

    Task UpdateDepartment(Department d);

    Task DeleteDepartment(int id);

    Task<bool> DepartmentExists(int id);

    Task SaveAsync();
}
