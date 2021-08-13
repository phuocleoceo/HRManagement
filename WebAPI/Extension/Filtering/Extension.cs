using System;
using System.Linq;
using WebAPI.Models;

namespace WebAPI.Extension.Filtering
{
	public static class Extension
	{
		// Linq to Entities cannot handle complex c.DateOfJoining.CalculateSeniority() 
		// so we take it to minSeniority and  maxSeniority
		public static DateTime CalculateMinSeniority(this int seniority)
		{
			int Year = DateTime.Now.Year - seniority;
			Year = (Year >= 1000) ? Year : 1000;
			return new DateTime(Year, 12, 31);
		}
		public static DateTime CalculateMaxSeniority(this int seniority)
		{
			int Year = DateTime.Now.Year - seniority;
			Year = (Year >= 1000) ? Year : 1000;
			return new DateTime(Year, 1, 1);
		}

		// Exp : minSeniority = 1 ; maxSeniority = 20 ; YearNow = 2021
		// 1/1/2001 <= X <= 31/12/2020
		public static IQueryable<Employee> FilterSeniority(this IQueryable<Employee> list,
											int minSeniority, int maxSeniority)
		{
			if (minSeniority >= 0 && maxSeniority != int.MaxValue)
			{
				DateTime minS = minSeniority.CalculateMinSeniority();
				DateTime maxS = maxSeniority.CalculateMaxSeniority();
				return list.Where(c =>
					c.DateOfJoining >= maxS && c.DateOfJoining <= minS);
			}
			return list;
		}
	}
}