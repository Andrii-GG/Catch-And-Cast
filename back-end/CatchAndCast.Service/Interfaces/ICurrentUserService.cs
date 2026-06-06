using CatchAndCast.Data.Enums;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.User;

namespace CatchAndCast.Service.Interfaces;

public interface ICurrentUserService
{
    string UserId { get; }
    UserRoles UserRole { get; }
    Task<User?> GetAsync();
    Task<List<User>> GetAllAsync();
    Task ResetPassword(ResetPasswordDto dto);
    Task UpdateAsync(UpdateUserDto dto);
    Task UpdateFirstNameAsync(UpdateFirstNameDto dto);
    Task UpdateSecondNameAsync(UpdateSecondNameDto dto);
    Task UpdatePhoneNumberAsync(UpdatePhoneNumberDto dto);
    Task<User> CreateAsync(RegisterUserDto model);
    Task DeleteAsync();
    Task DeleteUserAsync(string UserId);
}