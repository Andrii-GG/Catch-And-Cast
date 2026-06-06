using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Review;
using CatchAndCast.Service.Exceptions;
using CatchAndCast.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CatchAndCast.Service.Services;

public class ReviewService : IReviewService
{
    private readonly CatchAndCastContext context;
    private readonly ICurrentUserService currentUserService;
    public ReviewService(CatchAndCastContext _context, ICurrentUserService currentUser)
    {
        context = _context;
        currentUserService = currentUser;
    }

    public async Task CreateReview(CreateReviewDto dto)
    {
        var product = await context.Products.FindAsync(dto.ProductId);
        if (product is null)
        {
            throw new ItemNotFound();
        }
        if (context.Reviews.Where(x => x.ProductId == dto.ProductId).ToList().FirstOrDefault(x => x.UserId == currentUserService.UserId) is not null)
        {
            throw new ItemAlreadyExist();
        }
        if (currentUserService.UserId is null)
        {
            throw new UserNotUnauthorized();
        }
        int operatingAmount = 1;
        product.Rating = (product.Rating * product.CountRate + dto.Rate) / (product.CountRate + operatingAmount);
        product.CountRate += operatingAmount; 
        var item = new Review
        {
            ProductId = dto.ProductId,
            Rate = dto.Rate,
            Comment = dto.Comment,
            UserId = currentUserService.UserId
        };
        await context.Reviews.AddAsync(item);
        await context.SaveChangesAsync();
    }

    public async Task DeleteReview(int id)
    {
        var item = await context.Reviews.FindAsync(id);
        if (item is null)
        {
            throw new ItemNotFound();
        }
        if(item.UserId != currentUserService.UserId)
        {
            throw new NotExactUser();
        }
        var product = await context.Products.FindAsync(item.ProductId);
        if (product is null)
        {
            throw new ItemNotFound();
        }
        int operatingAmount = 1;
        var counter = product.CountRate - operatingAmount;
        if (counter > 0)
        {
            product.Rating = ((product.Rating * product.CountRate) - item.Rate) / counter;
            product.CountRate = counter;
        }
        else
        {
            product.Rating = 0;
            product.CountRate = counter;
        }
        context.Reviews.Remove(item);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Review>> GetAllReviewsAsync()
    {
        return await context.Reviews.ToListAsync();
    }

    public async Task<IEnumerable<GetReviewsByProductIdDto>> GetByProductId(int id)
    {
        if (await context.Products.FindAsync(id) is null)
        {
            throw new ItemNotFound();
        }
        var items = await context.Reviews.Where(x => x.ProductId == id).ToListAsync();
        var finishItems = items.Select(x => new GetReviewsByProductIdDto
        {
            Id = x.Id,
            Rate = x.Rate,
            Comment = x.Comment,
            UserId = x.UserId,
            UserName = context.Users.FirstOrDefault(u => u.Id == x.UserId)?.FirstName + " " + context.Users.FirstOrDefault(u => u.Id == x.UserId)?.SecondName,
            AddDate = x.AddDate
        });
        return finishItems;
    }

    public async Task UpdateRate(UpdateReviewDto dto)
    {
        var item = await context.Reviews.FindAsync(dto.Id);
        if(item is null)
        {
            throw new ItemNotFound();
        }
        var product = await context.Products.FindAsync(item.ProductId);
        if (product is null)
        {
            throw new ItemNotFound();
        }
        product.Rating = ((product.Rating * product.CountRate) - item.Rate + dto.Rate) / product.CountRate;
        item.Rate = dto.Rate;
        item.Comment = dto.Comment;
        await context.SaveChangesAsync();
    }
}
