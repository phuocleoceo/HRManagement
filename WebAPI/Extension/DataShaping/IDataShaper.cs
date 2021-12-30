using System.Dynamic;

namespace WebAPI.Extension.DataShaping;

public interface IDataShaper<T>
{
    // ExpandoObject like object javascript
    IEnumerable<ExpandoObject> ShapeData(IEnumerable<T> entities, string fieldsString);

    ExpandoObject ShapeData(T entity, string fieldsString);
}
