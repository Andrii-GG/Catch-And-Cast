using CatchAndCast.Data.Enums;

namespace CatchAndCast.Service.Dto.User;

public class RegisterUserDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string PhoneNumber { get; set; }
    public UserRoles Role { get; set; } = UserRoles.User;
}
