using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebAPI.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using WebAPI.Mapper;
using WebAPI.Extension;
using WebAPI.Authentication;
using WebAPI.Repository.Implement;
using WebAPI.Repository.Interface;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace WebAPI
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			// Cors
			services.AddCors(c =>
				c.AddPolicy("AllowOrigin", options =>
				{
					options.AllowAnyOrigin()
						   .AllowAnyMethod()
						   .AllowAnyHeader();
				})
			);

			// Database
			services.AddDbContext<APIContext>(options =>
			{
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
			});

			// DI
			services.AddScoped<IDepartmentRepository, DepartmentRepository>();
			services.AddScoped<IEmployeeRepository, EmployeeRepository>();
			services.AddAutoMapper(typeof(HRMMapping));

			//Controller and JSON
			services.AddControllersWithViews()
			.AddNewtonsoftJson(options =>
				options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore)
			.AddNewtonsoftJson(options =>
				options.SerializerSettings.ContractResolver = new DefaultContractResolver());

			services.AddControllers();
			//Swagger
			services.ConfigureSwaggerWithAuth();

			// Authentication
			services.AddAuthentication();

			services.ConfigureIdentity();

			services.ConfigureJWT(this.Configuration);

			services.AddScoped<IAuthenticationManager, AuthenticationManager>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.UseCors(options => options.AllowAnyOrigin()
										  .AllowAnyMethod()
										  .AllowAnyHeader());

			if (env.IsDevelopment())
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
		}
	}
}
