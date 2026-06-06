using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Cart;
using CatchAndCast.Service.Exceptions;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CatchAndCast.Api.Controllers
{
    [Route("api/cart")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartService context;
        public CartController(ICartService _context)
        {
            context = _context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetCartItemsDto>>> Get() {
            var items = await context.Get();
            return Ok(items); 
        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetAll()
        {
                var items = await context.GetAll();
                return Ok(items);
        }
        [HttpPost]
        public async Task<ActionResult> Post(CreateCartItemDto dto)
        {
            await context.Post(dto);
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> Put(UpdateCartItemDto dto)
        {
            await context.Put(dto);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await context.Delete(id);
            return Ok();
        } 
        [HttpDelete("product-id")]
        public async Task<ActionResult> Delete(DeleteCartById dto)
        {
            await context.Delete(dto);
            return Ok();
        }
    }
}
