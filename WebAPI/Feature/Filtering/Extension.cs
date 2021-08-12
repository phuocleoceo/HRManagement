using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Models;

namespace WebAPI.Feature.Filtering
{
	public static class Extension
	{
		public static int CalculateSeniority(this DateTime seniority)
		{
			return DateTime.Now.Year - seniority.Year;
		}

		public static IEnumerable<Employee> FilterSeniority(this List<Employee> list,
											int minSeniority, int maxSeniority)
		{
			return list.Where(c =>
				c.DateOfJoining.Value.CalculateSeniority() >= minSeniority &&
				c.DateOfJoining.Value.CalculateSeniority() <= maxSeniority);
		}
	}
}