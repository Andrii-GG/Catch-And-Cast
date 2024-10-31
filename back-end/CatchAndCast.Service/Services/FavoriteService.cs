﻿using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Favorite;
using CatchAndCast.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CatchAndCast.Service.Services;

public class FavoriteService : IFavoriteService
{
    private readonly CatchAndCastContext context;
    private readonly ICurrentUserService currentUser;
    public FavoriteService(CatchAndCastContext _context, ICurrentUserService _currentUser)
    {
        context = _context;
        currentUser = _currentUser;
    }

    public async Task Delete(int id)
    {
        var item = await context.Favorites.FindAsync(id);
        context.Favorites.Remove(item);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<GetFavoritesProductDto>> Get()
    {
        var items = await context.Favorites.ToListAsync();
        var finishItems = items.Where(x => x.UserId == currentUser.UserId).Select(x => new GetFavoritesProductDto
        {
            Id = x.Id,
            ProductId = x.ProductId
        });
        return finishItems;
    }

    public async Task Post(CreateFavoriteDto dto)
    {
        var items = await context.Favorites.Where(x=> x.ProductId == dto.ProductId).FirstOrDefaultAsync(x=> x.UserId == currentUser.UserId);
        if (items is not null) {
            throw new Exception("Nono");
        }
        var item = new Favorite
        {
            ProductId = dto.ProductId,
            UserId = currentUser.UserId
        };
        await context.AddAsync(item);
        await context.SaveChangesAsync();
    }
    
}