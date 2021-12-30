using System.Globalization;
using WebAPI.Models.DTO;
using WebAPI.Models;
using AutoMapper;

namespace WebAPI.Mapper;

public class HRMMapping : Profile
{
    public HRMMapping()
    {
        CreateMap<UserForRegistrationDTO, User>();

        CreateMap<Department, DepartmentDTO>();

        CreateMap<DepartmentUpsertDTO, Department>();

        CreateMap<Employee, EmployeeDTO>()
            .ForMember(edto => edto.Department, prop => prop.MapFrom(e => e.Department.Name))
            .ForMember(edto => edto.DateOfJoining, prop =>
                            prop.MapFrom(e => e.DateOfJoining.Value.ToString("dd/MM/yyyy")));

        CreateMap<EmployeeUpsertDTO, Employee>()
            .ForMember(e => e.DateOfJoining, prop =>
                            prop.MapFrom(edto =>
                                    DateTime.ParseExact(edto.DateOfJoining, "dd/MM/yyyy", CultureInfo.InvariantCulture)));
    }
}
