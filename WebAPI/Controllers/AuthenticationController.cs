using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
		private readonly IConfiguration _configuration;
		public AuthenticationController(IMapper mapper, UserManager<User> userManager,
										IAuthenticationManager authManager, IConfiguration configuration)
		{
			_mapper = mapper;
			_userManager = userManager;
			_authManager = authManager;
			_configuration = configuration;
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
			User _user = await _authManager.ValidateUser(user);
			if (_user == null)
			{
				return Unauthorized();  // 401 Unauthorized
			}
			// Create TOKEN
			IEnumerable<Claim> claims = await _authManager.GetClaims(_user);
			string accessToken = _authManager.CreateAccessToken(claims);
			string refreshToken = _authManager.CreateRefreshToken();
			// Save RefreshToken To DB
			_user.RefreshToken = refreshToken;
			string refreshTokenExpiryTime = _configuration.GetSection("JwtSettings:refreshTokenExpires").Value;
			_user.RefreshTokenExpiryTime = DateTime.Now.AddDays(Convert.ToDouble(refreshTokenExpiryTime));
			await _userManager.UpdateAsync(_user);

			var userInfor = new
			{
				Name = _user.FirstName + " " + _user.LastName,
				UserName = _user.UserName,
				Email = _user.Email,
				PhoneNumber = _user.PhoneNumber
			};
			return Ok(new
			{
				AccessToken = accessToken,
				RefreshToken = refreshToken,
				User = userInfor
			});
		}
	}
}