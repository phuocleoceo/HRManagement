using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Models.DTO;

namespace WebAPI.Authentication
{
	public interface IAuthenticationManager
	{
		Task<bool> ValidateUser(UserForAuthenticationDTO userForAuth);
		Task<string> CreateAccessToken();

		string CreateRefreshToken();
		ClaimsPrincipal GetPrincipalFromExpiredToken(string token);

		Task<TokenAPI> GetToken();
	}
}