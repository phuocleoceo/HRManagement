using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Authentication;
using WebAPI.Models;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TokenController : ControllerBase
	{
		private readonly UserManager<User> _userManager;
		private readonly IAuthenticationManager _authManager;
		public TokenController(UserManager<User> userManager, IAuthenticationManager authManager)
		{
			_userManager = userManager;
			_authManager = authManager;
		}

		[HttpPost("Refresh")]
		public async Task<IActionResult> Refresh(TokenAPI tokenAPI)
		{
			if (tokenAPI == null)
			{
				return BadRequest("Invalid client request");
			}
			string accessToken = tokenAPI.AccessToken;
			string refreshToken = tokenAPI.RefreshToken;
			ClaimsPrincipal principal = _authManager.GetPrincipalFromExpiredToken(accessToken);
			string username = principal.Identity.Name;

			User _user = await _userManager.FindByNameAsync(username);
			if (_user == null || _user.RefreshToken != refreshToken ||
				_user.RefreshTokenExpiryTime <= DateTime.Now)
			{
				return BadRequest("Invalid client request or refresh token expired");
			}

			string newAccessToken = _authManager.CreateAccessToken(principal.Claims);
			string newRefreshToken = _authManager.CreateRefreshToken();
			_user.RefreshToken = newRefreshToken; // Not change ExpireDay, it's only changed when Re-Login or Revoke
			await _userManager.UpdateAsync(_user);

			return Ok(new
			{
				Token = newAccessToken,
				RefreshToken = newRefreshToken
			});
		}

		[HttpPost("Revoke")]
		[Authorize]
		public async Task<IActionResult> Revoke()
		{
			string username = User.Identity.Name;
			User _user = await _userManager.FindByNameAsync(username);
			if (_user == null)
			{
				return BadRequest("Revoke refresh token");
			}
			_user.RefreshToken = null;
			_user.RefreshTokenExpiryTime = new DateTime();
			await _userManager.UpdateAsync(_user);
			return NoContent();
		}
	}
}