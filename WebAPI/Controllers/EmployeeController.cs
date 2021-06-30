using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Models.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Repository.Interface;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class EmployeeController : ControllerBase
	{
		private readonly IEmployeeRepository _db;
		private readonly IMapper _mapper;

		public EmployeeController(IEmployeeRepository db, IMapper mapper)
		{
			_db = db;
			_mapper = mapper;
		}

		// GET: api/Employee
		[HttpGet]
		[AllowAnonymous]
		public async Task<IEnumerable<EmployeeDTO>> GetEmployees()
		{
			var employees = await _db.GetAllEmployee();
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
	}
}
