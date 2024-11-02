
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
    public CategoryService(CatchAndCastContext _context)
    {
        context = _context;
    }

    public async Task<List<Category>> GetAsync()
    {
        return await context.Categories.ToListAsync();
    }
    public async Task CreateAsync(CreateCategoryWithImageDto itemDto)
    {
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
        item.CategoryName = itemDto.ChangeName;
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(UpdateImageInCategoryDto itemDto)
    {
        var item = await context.Categories.FindAsync(itemDto.Id);
        if (item == null) {
            throw new ItemNotFound();
        }
        item.CategoryImageUrl = itemDto.NewImageUrl;
        await context.SaveChangesAsync();
    }

    public async Task DeleteByIdAsync(int id)
    {
        var item = await context.Categories.FindAsync(id);
        context.Categories.Remove(item);
        await context.SaveChangesAsync();
    }

    public async Task<Category> GetAsync(int id)
    {
        var item = await context.Categories.FindAsync(id);

        return item;
    }
}
