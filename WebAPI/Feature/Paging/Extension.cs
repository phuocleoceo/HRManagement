using System.Collections.Generic;
using System.Linq;

namespace WebAPI.Feature.Paging
{
	public static class Extension
	{
		public static PagedList<T> ToPagedList<T>(this IEnumerable<T> source, int pageNumber, int pageSize)
		{
			int count = source.Count();
			var items = source
			.Skip((pageNumber - 1) * pageSize)
			.Take(pageSize).ToList();

			return new PagedList<T>(items, count, pageNumber, pageSize);
		}
	}
}