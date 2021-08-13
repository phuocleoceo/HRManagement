using System;
using System.Linq;
using System.Reflection;
using System.Text;
using WebAPI.Models;
using System.Linq.Dynamic.Core;

namespace WebAPI.Extension.Sorting
{
	public static class Extension
	{
		public static IQueryable<Employee> Sort(this IQueryable<Employee> employees,
												string orderByQueryString)
		{
			if (string.IsNullOrWhiteSpace(orderByQueryString))
			{
				return employees;
			}

			string orderQuery = orderByQueryString.CreateOrderQuery<Employee>();

			if (string.IsNullOrWhiteSpace(orderQuery))
			{
				return employees;
			}
			return employees.OrderBy(orderQuery);
		}

		private static string CreateOrderQuery<T>(this string orderByQueryString)
		{
			string[] orderParams = orderByQueryString.Trim().Split(',');
			PropertyInfo[] propertyInfos = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
			StringBuilder orderQueryBuilder = new StringBuilder();

			foreach (string param in orderParams)
			{
				if (string.IsNullOrWhiteSpace(param)) continue;

				string propertyFromQueryName = param.Split(" ")[0];
				PropertyInfo objectProperty = propertyInfos.FirstOrDefault(pi =>
			   		pi.Name.Equals(propertyFromQueryName, StringComparison.InvariantCultureIgnoreCase));

				if (objectProperty == null) continue;

				string direction = param.EndsWith(" desc") ? "descending" : "ascending";
				orderQueryBuilder.Append($"{objectProperty.Name.ToString()} {direction},");
			}

			string orderQuery = orderQueryBuilder.ToString().TrimEnd(',', ' ');
			return orderQuery;
		}
	}
}