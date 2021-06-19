## Identity Razor

**1. Restore Package**
<br/>
dotnet restore

**2. Needed Tool**
<br/>
dotnet tool install --global dotnet-ef
<br/>
dotnet tool install -global dotnet-aspnet-codegenerator

**3. Migrate Database**
<br/>
dotnet ef migrations add Init
<br/>
dotnet ef database update

**3. Controller Generator**
<br/>
dotnet aspnet-codegenerator controller -name EmployeeController -api -async -m WebAPI.Models.Employee -dc WebAPI.Data.APIContext -outDir Controllers
<br/>
dotnet aspnet-codegenerator controller -name DepartmentController -api -async -m WebAPI.Models.Department -dc WebAPI.Data.APIContext -outDir Controllers