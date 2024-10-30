using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Review;
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
        product.Rating = (product.Rating * product.CountRate + dto.Rate) / (product.CountRate + 1);
        product.CountRate += 1; 
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

    public async Task<IEnumerable<Review>> GetAllReviewsAsync()
    {
        return await context.Reviews.ToListAsync();
    }

    public async Task<IEnumerable<GetReviewsByProductIdDto>> GetByProductId(int id)
    {
        var items = await context.Reviews.Where(x => x.ProductId == id).ToListAsync();
        var finishItems = items.Select(x => new GetReviewsByProductIdDto
        {
            Id = x.Id,
            Rate = x.Rate,
            Comment = x.Comment,
            UserId = x.UserId,
            AddDate = x.AddDate
        });
        return finishItems;
    }

    public async Task UpdateRate(UpdateRateDto dto)
    {
        var item = await context.Reviews.FindAsync(dto.Id);
        var product = await context.Products.FindAsync(dto.ProductId);
        product.Rating = ((product.Rating * product.CountRate) - item.Rate + dto.Rate) / product.CountRate;
        await context.SaveChangesAsync();
    }
}
