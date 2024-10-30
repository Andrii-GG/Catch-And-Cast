using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.User;

namespace CatchAndCast.Service.Interfaces;

public interface ICurrentUserService
{
    public string UserId { get; }
    Task<List<User>> GetAsync();
    Task UpdateAsync(UpdateUserDto dto);
    Task UpdateFirstNameAsync(UpdateFirstNameDto dto);
    Task UpdateSecondNameAsync(UpdateSecondNameDto dto);
    Task UpdatePhoneNumberAsync(UpdatePhoneNumberDto dto);
    Task<User> CreateAsync(RegisterUserDto model);
    Task DeleteAsync();
}
