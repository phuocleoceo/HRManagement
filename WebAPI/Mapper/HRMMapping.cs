using AutoMapper;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Mapper
{
	public class HRMMapping : Profile
	{
		public HRMMapping()
		{
			CreateMap<Department, DepartmentDTO>().ReverseMap();

			CreateMap<Department, DepartmentUpsertDTO>().ReverseMap();

			CreateMap<Employee, EmployeeDTO>()
			.ForMember(edto => edto.Department, prop => prop.MapFrom(e => e.Department.Name))
			.ForMember(edto => edto.DateOfJoining, prop =>
								prop.MapFrom(e => e.DateOfJoining.Value.ToString("dd/MM/yyyy")));
		}
	}
}