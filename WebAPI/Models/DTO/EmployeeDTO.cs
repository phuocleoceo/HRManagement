namespace WebAPI.Models.DTO
{
	public class EmployeeDTO
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public int DepartmentId { get; set; }

		public string Department { get; set; }

		public string DateOfJoining { get; set; }

		public string PhotoURL { get; set; }
	}
}