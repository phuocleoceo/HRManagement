using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Authentication;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class AuthenticationController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly UserManager<User> _userManager;
		private readonly IAuthenticationManager _authManager;
		public AuthenticationController(IMapper mapper, UserManager<User> userManager,
										IAuthenticationManager authManager)
		{
			_mapper = mapper;
			_userManager = userManager;
			_authManager = authManager;
		}

		[HttpPost("Register")]
		[AllowAnonymous]
		public async Task<IActionResult> Register([FromBody] UserForRegistrationDTO
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
			await _userManager.AddToRoleAsync(user, userForRegistration.Role); //Roles : many / Role : one
			return StatusCode(((int)HttpStatusCode.Created)); //201
		}

		[HttpPost("Login")]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody] UserForAuthenticationDTO user)
		{
			if (!await _authManager.ValidateUser(user))
			{
				return Unauthorized();  // 401 Unauthorized
			}

			var token = await _authManager.CreateToken();
			var userCurrent = await _userManager.FindByNameAsync(user.UserName);
			var userInfor = new
			{
				Name = userCurrent.FirstName + " " + userCurrent.LastName,
				UserName = userCurrent.UserName,
				Email = userCurrent.Email,
				PhoneNumber = userCurrent.PhoneNumber
			};
			return Ok(new
			{
				Token = token,
				User = userInfor
			});
		}
	}
}