using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Authentication
{
	public class AuthenticationManager : IAuthenticationManager
	{
		private readonly UserManager<User> _userManager;
		private readonly IConfiguration _configuration;
		private User _user;

		public AuthenticationManager(UserManager<User> userManager,
									IConfiguration configuration)
		{
			_userManager = userManager;
			_configuration = configuration;
		}
		public async Task<bool> ValidateUser(UserForAuthenticationDTO userForAuth)
		{
			_user = await _userManager.FindByNameAsync(userForAuth.UserName);
			if (_user != null)
			{
				return await _userManager.CheckPasswordAsync(_user, userForAuth.Password);
			}
			else
			{
				return false;
			}
		}

		public async Task<string> CreateToken()
		{
			var signingCredentials = GetSigningCredentials();
			var claims = await GetClaims();
			var tokenOptions = GenerateTokenOptions(signingCredentials, claims);
			return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
		}

		private SigningCredentials GetSigningCredentials()
		{
			var _configKey = _configuration.GetSection("JwtSettings:secretKey").Value;
			var key = Encoding.UTF8.GetBytes(_configKey);
			var secret = new SymmetricSecurityKey(key);
			return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
		}
		private async Task<List<Claim>> GetClaims()
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.Name, _user.UserName)
			};
			var roles = await _userManager.GetRolesAsync(_user);
			foreach (var role in roles)
			{
				claims.Add(new Claim(ClaimTypes.Role, role));
			}
			return claims;
		}

		private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials,
														List<Claim> claims)
		{
			var jwtSettings = _configuration.GetSection("JwtSettings");
			var tokenOptions = new JwtSecurityToken
			(
				issuer: jwtSettings.GetSection("validIssuer").Value,
				audience: jwtSettings.GetSection("validAudience").Value,
				claims: claims,
				expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expires").Value)),
				signingCredentials: signingCredentials
			);
			return tokenOptions;
		}
	}
}