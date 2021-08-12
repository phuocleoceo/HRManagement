using System.Linq;
using WebAPI.Models;

namespace WebAPI.Feature.Searching
{
	public static class Extension
	{
		public static IQueryable<Employee> Search(this IQueryable<Employee> employees, string searchTerm)
		{
			if (string.IsNullOrWhiteSpace(searchTerm))
			{
				return employees;
			}
			var lowerCaseTerm = searchTerm.Trim().ToLower();
			return employees.Where(c => c.Name.ToLower().Contains(lowerCaseTerm));
		}
	}
}