using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Cart;
using CatchAndCast.Service.Exceptions;
using CatchAndCast.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CatchAndCast.Service.Services;

public class CartService : ICartService
{
    private readonly CatchAndCastContext context;
    private readonly ICurrentUserService currentUserService;
    public CartService(CatchAndCastContext _context, ICurrentUserService _currentUserService)
    {
        context = _context;
        currentUserService = _currentUserService;
    }

    public async Task Delete(int id)
    {
        var item = await context.Carts.FindAsync(id);
        if (item is null)
        {
            throw new ItemNotFound();
        }
        if (item.UserId != currentUserService.UserId)
        {
            throw new NotExactUser();
        }
        context.Carts.Remove(item);
        await context.SaveChangesAsync();
    }

    public async Task Delete(DeleteCartById dto)
    {
        var item = await context.Carts.FirstOrDefaultAsync(x => x.ProductId == dto.ProductId && x.UserId == currentUserService.UserId);
        if (item is null)
        {
            throw new ItemNotFound();
        }
        context.Carts.Remove(item);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<GetCartItemsDto>> Get()
    {
        var items = await context.Carts.Where(x=>x.UserId == currentUserService.UserId).ToListAsync();
        var finishItem = items.Select(x => new GetCartItemsDto { 
        Id = x.Id,
        ProductId = x.ProductId,
        CounterProducts = x.CounterProducts
        });
        return finishItem;
    }

    public async Task<IEnumerable<Cart>> GetAll()
    {
        var items = await context.Carts.ToListAsync();
        if(currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        return items;
    }

    public async Task Post(CreateCartItemDto dto)
    {
        var product = await context.Products.FindAsync(dto.ProductId);
        if (product is null)
        {
            throw new ItemNotFound();
        }

        var existingCartItem = await context.Carts
            .FirstOrDefaultAsync(x => x.ProductId == dto.ProductId && x.UserId == currentUserService.UserId);

        if (existingCartItem is not null)
        {
            existingCartItem.CounterProducts += 1;
        }
        else
        {
            var newCartItem = new Cart
            {
                ProductId = dto.ProductId,
                UserId = currentUserService.UserId,
                CounterProducts = 1
            };
            await context.Carts.AddAsync(newCartItem);
        }

        await context.SaveChangesAsync();
    }


    public async Task Put(UpdateCartItemDto dto)
    {
        if(currentUserService.UserId is null)
        {
            throw new UserNotUnauthorized();
        }
        var item = await context.Carts.FirstOrDefaultAsync(x=>x.ProductId == dto.ProductId && x.UserId == currentUserService.UserId);
        if (item is null)
        {
            throw new ItemNotFound();
        }
        if (dto.Increment)
        {
            item.CounterProducts += 1;
        }
        else
        {
            item.CounterProducts -= 1;
        }
        if (item.CounterProducts == 0)
        {
            context.Carts.Remove(item);
        }
        await context.SaveChangesAsync();
    }
}
