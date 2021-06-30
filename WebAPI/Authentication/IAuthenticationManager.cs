using System.Threading.Tasks;
using WebAPI.Models.DTO;

namespace WebAPI.Authentication
{
	public interface IAuthenticationManager
	{
		Task<bool> ValidateUser(UserForAuthenticationDTO userForAuth);
		Task<string> CreateToken();
	}
}