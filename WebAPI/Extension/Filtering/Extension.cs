using System;
using System.Linq;
using WebAPI.Models;

namespace WebAPI.Extension.Filtering
{
	public static class Extension
	{
		public static DateTime CalculateMinSeniority(this int seniority)
		{
			int minYear = DateTime.Now.Year - seniority;
			minYear = (minYear >= 1000) ? minYear : 1000;
			return new DateTime(minYear, 1, 1);
		}

		public static DateTime CalculateMaxSeniority(this int seniority)
		{
			int maxYear = DateTime.Now.Year + seniority;
			maxYear = (maxYear <= 9999) ? maxYear : 9999;
			return new DateTime(maxYear, 12, 31);
		}

		public static IQueryable<Employee> FilterSeniority(this IQueryable<Employee> list,
											int minSeniority, int maxSeniority)
		{
			if (minSeniority >= 0 && maxSeniority != int.MaxValue)
			{
				return list.Where(c =>
					c.DateOfJoining >= minSeniority.CalculateMinSeniority() &&
					c.DateOfJoining <= maxSeniority.CalculateMaxSeniority());
			}
			return list;
		}
	}
}