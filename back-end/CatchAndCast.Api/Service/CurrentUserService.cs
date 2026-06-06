using CatchAndCast.Data.Context;
using CatchAndCast.Data.Enums;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.User;
using CatchAndCast.Service.Exceptions;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CatchAndCast.Api.Service;

public class CurrentUserService : ICurrentUserService
{
    private readonly HttpContext _context;
    private readonly CatchAndCastContext context;
    private readonly UserManager<User> _userManager;

    public string UserId => _context!.User.FindFirstValue(ClaimTypes.NameIdentifier)!;
    public UserRoles UserRole => context.Users.Find(UserId)?.Role ?? throw new UserNotFound();

    public CurrentUserService(IHttpContextAccessor accessor, CatchAndCastContext mainContext, UserManager<User> userManager)
    {
        _context = accessor.HttpContext!;
        context = mainContext;
        _userManager = userManager;
    }

    public async Task<User?> GetAsync()
    {
        return await context.Users.FindAsync(UserId);
    }

    public async Task<User> CreateAsync(RegisterUserDto model)
    {
        if(UserId is not null)
        {
            throw new ClosedAction();
        }
        var user = new User
        {
            UserName = model.Email,
            Email = model.Email,
            FirstName = model.FirstName,
            SecondName = model.SecondName,
            PhoneNumber = model.PhoneNumber,
            CreatedAt = DateTime.Now,
            Role = model.Role
        };

        return user;
    }
    public async Task UpdateAsync(UpdateUserDto item)
    {
        var user = await context.Users.FindAsync(UserId);
        if (user is null)
        {
            throw new UserNotFound();
        }
        user.FirstName = item.FirstName;
        user.SecondName = item.SecondName;
        user.PhoneNumber = item.PhoneNumber;
        await context.SaveChangesAsync();
    }

    public async Task UpdateFirstNameAsync(UpdateFirstNameDto dto)
    {
        var user = await context.Users.FindAsync(UserId);
        if (user is null)
        {
            throw new UserNotFound();
        }
        user.FirstName = dto.FirstName;
        await context.SaveChangesAsync();
    }
    public async Task UpdateSecondNameAsync(UpdateSecondNameDto dto)
    {
        var user = await context.Users.FindAsync(UserId);
        if (user is null)
        {
            throw new UserNotFound();
        }
        user.SecondName = dto.SecondName;
        await context.SaveChangesAsync();
    }
    public async Task UpdatePhoneNumberAsync(UpdatePhoneNumberDto dto)
    {
        var user = await context.Users.FindAsync(UserId);
        if (user is null)
        {
            throw new UserNotFound();
        }
        user.PhoneNumber = dto.PhoneNumber;
        await context.SaveChangesAsync();
    }
    public async Task DeleteAsync()
    {
        var user = await context.Users.FindAsync(UserId);
        if (user is null)
        {
            throw new UserNotFound();
        }
        context.Users.Remove(user);
        await context.SaveChangesAsync();
    }

    public async Task ResetPassword(ResetPasswordDto dto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Email == dto.Email);
        if (user is null)
        {
            throw new UserNotFound();
        }

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var passwordValidator = new PasswordValidator<User>();
        var validationResult = await passwordValidator.ValidateAsync(_userManager, user, dto.NewPassword);

        if (!validationResult.Succeeded)
        {
            var errors = string.Join(", ", validationResult.Errors.Select(e => e.Description));
            throw new Exception($"Password validation failed: {errors}");
        }

        var result = await _userManager.ResetPasswordAsync(user, token, dto.NewPassword);

        if (!result.Succeeded)
        {
            throw new Exception("Password reset failed");
        }
    }

    public async Task DeleteUserAsync(string Id)
    {
        if(UserId is null)
        {
            throw new UserNotUnauthorized();
        }
        if(UserRole != UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var item = await context.Users.FindAsync(Id);
        if (item is null)
        {
            throw new UserNotFound();
        }
        context.Users.Remove(item);
        await context.SaveChangesAsync();
    }

    public async Task<List<User>> GetAllAsync()
    {
        if (UserId is null)
        {
            throw new UserNotUnauthorized();
        }
        if (UserRole != UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var items = await context.Users.ToListAsync();
        return items;
    }
}


