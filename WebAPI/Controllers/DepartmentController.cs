using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;
using AutoMapper;
using WebAPI.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Repository.Interface;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	//[Authorize]
	public class DepartmentController : ControllerBase
	{
		private readonly IDepartmentRepository _db;
		private readonly IMapper _mapper;

		public DepartmentController(IDepartmentRepository db, IMapper mapper)
		{
			_db = db;
			_mapper = mapper;
		}

		// GET: api/Department
		[HttpGet]
		//[AllowAnonymous]
		public async Task<IEnumerable<DepartmentDTO>> GetDepartments()
		{
			var departments = await _db.GetAllDepartment();
			return departments.Select(c => _mapper.Map<DepartmentDTO>(c));
		}

		// GET: api/Department/EmployeeList/5
		[HttpGet("employee-list/{id}")]
		public async Task<IEnumerable<EmployeeDTO>> GetListEmployeeOfDepartment(int id)
		{
			var employeeList = await _db.GetListEmployee(id);
			return employeeList.Select(c => _mapper.Map<EmployeeDTO>(c));
		}

		// GET: api/Department/5
		[HttpGet("{id}")]
		public async Task<ActionResult<DepartmentDTO>> GetDepartment(int id)
		{
			var department = await _db.GetDepartmentById(id);

			if (department == null)
			{
				return NotFound();
			}

			return _mapper.Map<DepartmentDTO>(department);
		}

		// PUT: api/Department/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutDepartment(int id, DepartmentUpsertDTO duDTO)
		{
			bool departmentExist = await _db.DepartmentExists(id);
			if (!departmentExist)
			{
				return NotFound();
			}
			var department = _mapper.Map<Department>(duDTO);
			department.Id = id;
			await _db.UpdateDepartment(department);
			return NoContent();
		}

		// POST: api/Department
		[HttpPost]
		public async Task<ActionResult<Department>> PostDepartment(DepartmentUpsertDTO duDTO)
		{
			var department = _mapper.Map<Department>(duDTO);
			await _db.CreateDepartment(department);

			return CreatedAtAction("GetDepartment", new { id = department.Id }, department);
		}

		// DELETE: api/Department/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteDepartment(int id)
		{
			bool departmentExist = await _db.DepartmentExists(id);
			if (!departmentExist)
			{
				return NotFound();
			}
			await _db.DeleteDepartment(id);
			return NoContent();
		}
	}
}
