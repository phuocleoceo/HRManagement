namespace WebAPI.Models.DTO;

public class EmployeeUpsertDTO
{
    public string Name { get; set; }

    public int DepartmentId { get; set; }

    public string DateOfJoining { get; set; }

    public string PhotoURL { get; set; }
}
