using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EmployeeController : ControllerBase
	{
		private readonly APIContext _context;

		public EmployeeController(APIContext context)
		{
			_context = context;
		}

		// GET: api/Employee
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
		{
			return await _context.Employees.Include(c => c.Department).ToListAsync();
		}

		// GET: api/Employee/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Employee>> GetEmployee(int id)
		{
			var employee = await _context.Employees.Include(c => c.Department)
											.FirstOrDefaultAsync(c => c.Id == id);

			if (employee == null)
			{
				return NotFound();
			}

			return employee;
		}

		// PUT: api/Employee/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutEmployee(int id, Employee employee)
		{
			if (id != employee.Id)
			{
				return BadRequest();
			}

			_context.Entry(employee).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!EmployeeExists(id))
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

		// POST: api/Employee
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
		{
			_context.Employees.Add(employee);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
		}

		// DELETE: api/Employee/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteEmployee(int id)
		{
			var employee = await _context.Employees.FindAsync(id);
			if (employee == null)
			{
				return NotFound();
			}

			_context.Employees.Remove(employee);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool EmployeeExists(int id)
		{
			return _context.Employees.Any(e => e.Id == id);
		}

		// GET: api/Employee
		[HttpGet("get-all-department-name")]
		public async Task<ActionResult<IEnumerable<string>>> GetAllDepartmentName()
		{
			return await _context.Departments.Select(c => c.Name).ToListAsync();
		}
	}
}
