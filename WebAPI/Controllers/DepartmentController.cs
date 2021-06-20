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

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DepartmentController : ControllerBase
	{
		private readonly APIContext _context;
		private readonly IMapper _mapper;

		public DepartmentController(APIContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		// GET: api/Department
		[HttpGet]
		public async Task<ActionResult<IEnumerable<DepartmentDTO>>> GetDepartments()
		{
			return await _context.Departments
							.Select(c => _mapper.Map<DepartmentDTO>(c))
							.ToListAsync();
		}

		// GET: api/Department/EmployeeList/5
		[HttpGet("employee-list/{id}")]
		public async Task<ActionResult<IEnumerable<EmployeeDTO>>> GetListEmployeeOfDepartment(int id)
		{
			var department = await _context.Departments.Include(c => c.Employees)
											.FirstOrDefaultAsync(c => c.Id == id);
			var employeeList = department.Employees;
			return employeeList.Select(c => _mapper.Map<EmployeeDTO>(c)).ToList();
		}

		// GET: api/Department/5
		[HttpGet("{id}")]
		public async Task<ActionResult<DepartmentDTO>> GetDepartment(int id)
		{
			var department = await _context.Departments.FirstOrDefaultAsync(c => c.Id == id);

			if (department == null)
			{
				return NotFound();
			}

			return _mapper.Map<DepartmentDTO>(department);
		}

		// PUT: api/Department/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutDepartment(int id, DepartmentUpsertDTO duDTO)
		{
			var department = _mapper.Map<Department>(duDTO);
			department.Id = id;

			_context.Entry(department).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!DepartmentExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/Department
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<Department>> PostDepartment(DepartmentUpsertDTO duDTO)
		{
			var department = _mapper.Map<Department>(duDTO);
			_context.Departments.Add(department);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetDepartment", new { id = department.Id }, department);
		}

		// DELETE: api/Department/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteDepartment(int id)
		{
			var department = await _context.Departments.FindAsync(id);
			if (department == null)
			{
				return NotFound();
			}

			_context.Departments.Remove(department);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool DepartmentExists(int id)
		{
			return _context.Departments.Any(e => e.Id == id);
		}
	}
}
