using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using WebAPI.Extension.DataShaping;
using WebAPI.Repository.Implement;
using WebAPI.Repository.Interface;
using WebAPI.Authentication;
using WebAPI.Models.DTO;
using WebAPI.Extension;
using Newtonsoft.Json;
using WebAPI.Mapper;
using WebAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Cors
builder.Services.AddCors(c =>
    c.AddPolicy("AllowOrigin", options =>
    {
        options.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    })
);

// Database
builder.Services.AddDbContext<APIContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// DI
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IDataShaper<EmployeeDTO>, DataShaper<EmployeeDTO>>();
builder.Services.AddAutoMapper(typeof(HRMMapping));

//Controller and JSON
builder.Services.AddControllersWithViews()
                .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

builder.Services.AddControllers();
//Swagger
builder.Services.ConfigureSwaggerWithAuth();

// Authentication
builder.Services.AddAuthentication();

builder.Services.ConfigureIdentity();

builder.Services.ConfigureJWT(builder.Configuration);

builder.Services.AddScoped<IAuthenticationManager, AuthenticationManager>();

/*---------------------------------------------------------------------------*/

var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader());

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1");
        c.RoutePrefix = "";
    });
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Photos")),
    RequestPath = "/Photos"
});

app.Run();