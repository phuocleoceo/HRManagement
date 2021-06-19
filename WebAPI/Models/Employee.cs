using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
	public class Employee
	{
		[Key]
		public int Id { get; set; }

		public string Name { get; set; }

		public int DepartmentId { get; set; }
		[ForeignKey(nameof(DepartmentId))]
		public Department Department { get; set; }

		public DateTime? DateOfJoining { get; set; }

		public string PhotoFileName { get; set; }
	}
}