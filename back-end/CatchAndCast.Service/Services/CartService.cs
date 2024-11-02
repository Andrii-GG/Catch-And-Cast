using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Cart;
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
        return items;
    }

    public async Task Post(CreateCartItemDto dto)
    {
        var items = context.Carts.FirstOrDefault(x => x.ProductId == dto.ProductId && x.UserId == currentUserService.UserId);
        if (items is not null)
        {
            items.CounterProducts += 1;
            await context.SaveChangesAsync();
        }
        else
        {
            var item = new Cart
            {
                ProductId = dto.ProductId,
                UserId = currentUserService.UserId
            };
            await context.Carts.AddAsync(item);
        }
        await context.SaveChangesAsync();
    }

    public async Task Put(UpdateCartItemDto dto)
    {
        var item = await context.Carts.FindAsync(dto.CartId);
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
