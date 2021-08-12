using System;
using System.Collections.Generic;

namespace WebAPI.Feature.Paging
{
	public class PagedList<T> : List<T>
	{
		public MetaData MetaData { get; set; }

		public PagedList(List<T> items, int count, int pageNumber, int pageSize)
		{
			MetaData = new MetaData
			{
				TotalCount = count,
				PageSize = pageSize,
				CurrentPage = pageNumber,
				TotalPages = (int)Math.Ceiling((double)count / pageSize)
			};
			AddRange(items);
		}
	}
}