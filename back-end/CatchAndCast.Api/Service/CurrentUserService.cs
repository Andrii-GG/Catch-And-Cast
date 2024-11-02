using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.User;
using CatchAndCast.Service.Exceptions;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CatchAndCast.Api.Service;

public class CurrentUserService : ICurrentUserService
{
    private readonly HttpContext _context;
    private readonly CatchAndCastContext context;
    public string UserId => _context!.User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    public CurrentUserService(IHttpContextAccessor accessor, CatchAndCastContext mainContext)
    {
        _context = accessor.HttpContext!;
        context = mainContext;
    }

    public async Task<List<User>> GetAsync()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<User> CreateAsync(RegisterUserDto model)
    {
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                SecondName = model.SecondName,
                PhoneNumber = model.PhoneNumber,
                CreatedAt = DateTime.Now
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
}


