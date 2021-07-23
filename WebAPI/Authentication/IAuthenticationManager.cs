using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Authentication
{
	public interface IAuthenticationManager
	{
		Task<User> ValidateUser(UserForAuthenticationDTO userForAuth);

		Task<IEnumerable<Claim>> GetClaims(User _user);

		string CreateAccessToken(IEnumerable<Claim> claims);

		string CreateRefreshToken();

		ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
	}
}