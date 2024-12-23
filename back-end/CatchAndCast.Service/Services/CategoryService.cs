
using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Category;
using CatchAndCast.Service.Dto.User;
using CatchAndCast.Service.Exceptions;
using CatchAndCast.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CatchAndCast.Service.Services;

public class CategoryService : ICategoryService
{
    private readonly CatchAndCastContext context;
    private readonly ICurrentUserService currentUserService;

    public CategoryService(CatchAndCastContext _context, ICurrentUserService _currentUserService)
    {
        context = _context;
        currentUserService = _currentUserService;
    }

    public async Task<List<Category>> GetAsync()
    {
        return await context.Categories.ToListAsync();
    }
    public async Task CreateAsync(CreateCategoryWithImageDto itemDto)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var category = new Category
        {
            CategoryName = itemDto.CategoryName,
            CategoryImageUrl = itemDto.CategoryImageUrl
        };
        context.Categories.Add(category);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(UpdateCategoryDto itemDto)
    {
        var item = await context.Categories.FindAsync(itemDto.Id);
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        if (item is null)
        {
            throw new ItemNotFound();
        }
        item.CategoryName = itemDto.ChangeName;
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(UpdateImageInCategoryDto itemDto)
    {
        var item = await context.Categories.FindAsync(itemDto.Id);
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        if (item is null) {
            throw new ItemNotFound();
        }
        item.CategoryImageUrl = itemDto.NewImageUrl;
        await context.SaveChangesAsync();
    }

    public async Task DeleteByIdAsync(int id)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var item = await context.Categories.FindAsync(id);
        if (item is null)
        {
            throw new ItemNotFound();
        }
        context.Categories.Remove(item);
        await context.SaveChangesAsync();
    }

    public async Task<Category> GetAsync(int id)
    {
        var item = await context.Categories.FindAsync(id);
        if (item is null)
        {
            throw new ItemNotFound();
        }
        return item;
    }
}
