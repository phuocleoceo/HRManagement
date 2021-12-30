using System.Reflection;
using System.Dynamic;

namespace WebAPI.Extension.DataShaping;

public class DataShaper<T> : IDataShaper<T> where T : class
{
    public PropertyInfo[] Properties { get; set; }

    public DataShaper()
    {
        Properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
    }

    public IEnumerable<ExpandoObject> ShapeData(IEnumerable<T> entities, string fieldsString)
    {
        IEnumerable<PropertyInfo> requiredProperties = GetRequiredProperties(fieldsString);
        return FetchData(entities, requiredProperties);
    }

    public ExpandoObject ShapeData(T entity, string fieldsString)
    {
        IEnumerable<PropertyInfo> requiredProperties = GetRequiredProperties(fieldsString);
        return FetchData(entity, requiredProperties);
    }

    private IEnumerable<PropertyInfo> GetRequiredProperties(string fieldsString)
    {
        List<PropertyInfo> requiredProperties = new List<PropertyInfo>();
        if (!string.IsNullOrWhiteSpace(fieldsString))
        {
            string[] fields = fieldsString.Split(',', StringSplitOptions.RemoveEmptyEntries);

            foreach (string field in fields)
            {
                PropertyInfo property = Properties.FirstOrDefault(pi =>
                    pi.Name.Equals(field.Trim(), StringComparison.InvariantCultureIgnoreCase));

                if (property == null) continue;
                requiredProperties.Add(property);
            }
        }
        else
        {
            requiredProperties = Properties.ToList();
        }
        return requiredProperties;
    }

    private IEnumerable<ExpandoObject> FetchData(IEnumerable<T> entities,
                            IEnumerable<PropertyInfo> requiredProperties)
    {
        List<ExpandoObject> shapedData = new List<ExpandoObject>();
        foreach (T entity in entities)
        {
            ExpandoObject shapedObject = FetchData(entity, requiredProperties);
            shapedData.Add(shapedObject);
        }
        return shapedData;
    }

    private ExpandoObject FetchData(T entity, IEnumerable<PropertyInfo>
                                                        requiredProperties)
    {
        ExpandoObject shapedObject = new ExpandoObject();
        foreach (PropertyInfo property in requiredProperties)
        {
            object objectPropertyValue = property.GetValue(entity);
            shapedObject.TryAdd(property.Name, objectPropertyValue);
        }
        return shapedObject;
    }

}
