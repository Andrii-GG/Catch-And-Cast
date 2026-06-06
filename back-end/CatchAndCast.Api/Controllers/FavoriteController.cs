using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Favorite;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CatchAndCast.Api.Controllers
{
    [Route("api/favorite")]
    [ApiController]
    [Authorize]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService context;
        private readonly ICurrentUserService currentUserService;
        public FavoriteController(IFavoriteService _context, ICurrentUserService _currentUserService)
        {
            context = _context;
            currentUserService = _currentUserService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetFavoritesProductDto>>> Get()
        {
            var items = await context.Get();
            return Ok(items);
        }
        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAsync()
        {
            var items = await context.GetAsync();
            return Ok(items);
        }
        [HttpPost]
        public async Task<ActionResult> Post(CreateFavoriteDto dto)
        {
            await context.Post(dto);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await context.Delete(id);
            return Ok();
        }
        [HttpDelete("product-id")]
        public async Task<ActionResult> Delete(DeleteFavoriteById dto)
        {
            await context.Delete(dto);
            return Ok();
        }
    }
}
