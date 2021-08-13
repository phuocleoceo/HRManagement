namespace WebAPI.Models.RequestModel
{
	public class EmployeeParameters : RequestParameters
	{
		public EmployeeParameters()
		{
			OrderBy = "Name";
		}

		public int MinSeniority { get; set; } = 0;
		public int MaxSeniority { get; set; } = int.MaxValue;
		public bool ValidSeniority => MaxSeniority > MinSeniority;

		public string SearchTerm { get; set; }
	}
}