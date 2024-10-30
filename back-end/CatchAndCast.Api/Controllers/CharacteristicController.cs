using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Characteristic;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.PortableExecutable;

namespace CatchAndCast.Api.Controllers
{
    [Route("api/characteristic")]
    [ApiController]
    public class CharacteristicController : ControllerBase
    {
        private readonly IProductCharacteristicService context;
        public CharacteristicController(IProductCharacteristicService _context)
        {
            context = _context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCharacteristic>>> Get()
        {
            var items = await context.GetAllAsync();
            return Ok(items);
        }
        [HttpGet("product/{id}")]
        public async Task<ActionResult<IEnumerable<ProductCharacteristic>>> Get(int id)
        {
            var items = await context.GetByProductIdAsync(id);
            return Ok(items);
        }
        [HttpPost]
        public async Task<ActionResult> Post(CreateCharacteristicDto dto)
        {
            await context.CreateCharacteristicAsync(dto);
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> Put(UpdateCharacteristicDto dto)
        {
            await context.UpdateDescription(dto);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await context.DeleteAsync(id);
            return Ok();
        }

    }
}
