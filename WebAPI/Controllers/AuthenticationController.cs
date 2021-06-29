using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthenticationController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly UserManager<User> _userManager;
		public AuthenticationController(IMapper mapper, UserManager<User> userManager)
		{
			_mapper = mapper;
			_userManager = userManager;
		}

		[HttpPost]
		public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDTO
																	userForRegistration)
		{
			var user = _mapper.Map<User>(userForRegistration);
			var result = await _userManager.CreateAsync(user, userForRegistration.Password);
			if (!result.Succeeded)
			{
				foreach (var error in result.Errors)
				{
					ModelState.TryAddModelError(error.Code, error.Description);
				}
				return BadRequest(ModelState);
			}
			await _userManager.AddToRolesAsync(user, userForRegistration.Roles); //Roles : many / Role : one
			return StatusCode(((int)HttpStatusCode.Created)); //201
		}
	}
}