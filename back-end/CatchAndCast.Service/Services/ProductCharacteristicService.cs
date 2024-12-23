using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Characteristic;
using CatchAndCast.Service.Exceptions;
using CatchAndCast.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CatchAndCast.Service.Services;

public class ProductCharacteristicService : IProductCharacteristicService
{
    private readonly CatchAndCastContext context;
    private readonly ICurrentUserService currentUserService;
    public ProductCharacteristicService(CatchAndCastContext _context, ICurrentUserService _currentUserService)
    {
        context = _context;
        currentUserService = _currentUserService;
    }

    public async Task<List<ProductCharacteristic>> GetByProductIdAsync(int id)
    {
        return await context.Characteristics.Where(x => x.ProductId == id).ToListAsync();
    } 

    public async Task<IEnumerable<ProductCharacteristic>> GetAllAsync()
    {
        return await context.Characteristics.ToListAsync();
    }

    public async Task CreateCharacteristicAsync(CreateCharacteristicDto dto)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var item = new ProductCharacteristic
        {
            ProductId = dto.ProductId,
            NameOfCharacteristic = dto.NameOfCharacteristic,
            DescriptionOfCharacteristic = dto.DescriptionOfCharacteristic
        };
        context.Characteristics.Add(item);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var item = await context.Characteristics.FindAsync(id);
        if (item is null)
        {
            throw new ItemNotFound();
        }
        context.Characteristics.Remove(item);
        await context.SaveChangesAsync();
    }

    public async Task UpdateDescription(UpdateCharacteristicDto dto)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var item = await context.Characteristics.FindAsync(dto.Id);
        if (item is null)
        {
            throw new ItemNotFound();
        }
        item.DescriptionOfCharacteristic = dto.Description;
        await context.SaveChangesAsync();
    }
}
