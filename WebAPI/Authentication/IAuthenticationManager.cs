using System.Security.Claims;
using WebAPI.Models.DTO;
using WebAPI.Models;

namespace WebAPI.Authentication;

public interface IAuthenticationManager
{
    Task<User> ValidateUser(UserForAuthenticationDTO userForAuth);

    Task<IEnumerable<Claim>> GetClaims(User _user);

    string CreateAccessToken(IEnumerable<Claim> claims);

    string CreateRefreshToken();

    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}
