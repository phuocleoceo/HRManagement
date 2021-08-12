using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Models.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Repository.Interface;
using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using WebAPI.Models.RequestModel;
using Newtonsoft.Json;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class EmployeeController : ControllerBase
	{
		private readonly IEmployeeRepository _db;
		private readonly IMapper _mapper;
		private readonly IWebHostEnvironment _env;

		public EmployeeController(IEmployeeRepository db, IMapper mapper, IWebHostEnvironment env)
		{
			_db = db;
			_mapper = mapper;
			_env = env;
		}

		// GET: api/Employee
		[HttpGet]
		[AllowAnonymous]
		public async Task<IEnumerable<EmployeeDTO>> GetEmployees([FromQuery] EmployeeParameters
																	employeeParameters = null)
		{
			var employees = await _db.GetAllEmployee(employeeParameters);
			Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(employees.MetaData));
			return employees.Select(c => _mapper.Map<EmployeeDTO>(c));
		}

		// GET: api/Employee/5
		[HttpGet("{id}")]
		public async Task<ActionResult<EmployeeDTO>> GetEmployee(int id)
		{
			var employee = await _db.GetEmployeeById(id);

			if (employee == null)
			{
				return NotFound();
			}

			return _mapper.Map<EmployeeDTO>(employee);
		}

		// PUT: api/Employee/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutEmployee(int id, EmployeeUpsertDTO euDTO)
		{
			bool employeeExist = await _db.EmployeeExists(id);
			if (!employeeExist)
			{
				return NotFound();
			}
			var employee = _mapper.Map<Employee>(euDTO);
			employee.Id = id;
			await _db.UpdateEmployee(employee);
			return NoContent();
		}

		// POST: api/Employee
		[HttpPost]
		public async Task<ActionResult<Employee>> PostEmployee(EmployeeUpsertDTO euDTO)
		{
			var employee = _mapper.Map<Employee>(euDTO);
			await _db.CreateEmployee(employee);

			return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
		}

		// DELETE: api/Employee/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteEmployee(int id)
		{
			bool employeeExist = await _db.EmployeeExists(id);
			if (!employeeExist)
			{
				return NotFound();
			}
			await _db.DeleteEmployee(id);
			return NoContent();
		}

		[Route("SaveFile")]
		[HttpPost]
		public async Task<IActionResult> SaveFile()
		{
			try
			{
				IFormCollection httpRequest = Request.Form;
				IFormFile postedFile = httpRequest.Files[0];
				string filename = postedFile.FileName;
				string physicalPath = _env.ContentRootPath + "/Photos/" + filename;

				using (var stream = new FileStream(physicalPath, FileMode.Create))
				{
					await postedFile.CopyToAsync(stream);
				}

				return Ok(filename);
			}
			catch (Exception)
			{
				return Ok("anonymous.png");
			}
		}
	}
}
