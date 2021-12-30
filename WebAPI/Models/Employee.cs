using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models;

public class Employee
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public int DepartmentId { get; set; }
    [ForeignKey(nameof(DepartmentId))]
    public Department Department { get; set; }

    public DateTime? DateOfJoining { get; set; }

    public string PhotoURL { get; set; }
}
