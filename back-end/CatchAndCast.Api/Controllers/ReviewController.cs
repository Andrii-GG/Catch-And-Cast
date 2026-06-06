using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Review;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CatchAndCast.Api.Controllers
{
    [Route("api/review")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService context;
        public ReviewController(IReviewService _context)
        {
            context = _context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> Get()
        {
            var items = await context.GetAllReviewsAsync();
            return Ok(items);
        }
        [HttpGet("product/{id}")]
        public async Task<ActionResult<IEnumerable<GetReviewsByProductIdDto>>> Get(int id)
        {
            var item = await context.GetByProductId(id);
            return Ok(item);

        }
        [HttpPost]
        public async Task<ActionResult> Post(CreateReviewDto dto)
        {
            await context.CreateReview(dto);
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> Put(UpdateReviewDto dto)
        {
            await context.UpdateRate(dto);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await context.DeleteReview(id);
            return Ok();
        }
    }
}
