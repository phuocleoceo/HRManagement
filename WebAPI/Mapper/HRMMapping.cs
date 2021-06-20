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
		}
	}
}