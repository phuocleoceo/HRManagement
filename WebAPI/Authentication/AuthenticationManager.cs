using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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

		// ACCESS TOKEN
		public async Task<string> CreateAccessToken()
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

		// REFRESH TOKEN
		public string CreateRefreshToken()
		{
			byte[] randomNumber = new byte[32];
			using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
			{
				rng.GetBytes(randomNumber);
				return Convert.ToBase64String(randomNumber);
			}
		}

		public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
		{
			var _configKey = _configuration.GetSection("JwtSettings:secretKey").Value;
			var key = Encoding.UTF8.GetBytes(_configKey);
			var tokenValidationParameters = new TokenValidationParameters
			{
				ValidateAudience = false, //you might want to validate the audience and issuer depending on your use case
				ValidateIssuer = false,
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
			};
			var tokenHandler = new JwtSecurityTokenHandler();
			SecurityToken securityToken;
			var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
			var jwtSecurityToken = securityToken as JwtSecurityToken;
			if (jwtSecurityToken == null ||
				!jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
										StringComparison.InvariantCultureIgnoreCase))
				throw new SecurityTokenException("Invalid token");
			return principal;
		}

		// GET TOKEN
		public async Task<TokenAPI> GetToken()
		{
			string accessToken = await CreateAccessToken();
			string refreshToken = CreateRefreshToken();

			_user.RefreshToken = refreshToken;
			var refreshTokenExpires = Convert.ToDouble(_configuration.GetSection("JwtSettings:refreshTokenExpires").Value);
			_user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenExpires);
			await _userManager.UpdateAsync(_user);

			return new TokenAPI
			{
				AccessToken = accessToken,
				RefreshToken = refreshToken
			};
		}
	}
}