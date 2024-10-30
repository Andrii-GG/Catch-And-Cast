using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Review;

namespace CatchAndCast.Service.Interfaces;
public interface IReviewService
{
    Task<IEnumerable<Review>> GetAllReviewsAsync();
    Task<IEnumerable<GetReviewsByProductIdDto>> GetByProductId(int id);
    Task CreateReview(CreateReviewDto dto);
    Task UpdateRate(UpdateReviewDto dto);
    Task DeleteReview(int id);
}
