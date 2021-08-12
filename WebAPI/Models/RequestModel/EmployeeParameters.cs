namespace WebAPI.Models.RequestModel
{
	public class EmployeeParameters : RequestParameters
	{
		public int MinSeniority { get; set; } = 0;
		public int MaxSeniority { get; set; } = int.MaxValue;
		public bool ValidSeniority => MaxSeniority > MinSeniority;
	}
}