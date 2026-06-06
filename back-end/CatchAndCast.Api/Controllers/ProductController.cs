using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Product;
using CatchAndCast.Service.Dto.Product.Getters;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Reflection.PortableExecutable;

namespace CatchAndCast.Api.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;
        private readonly IProductCharacteristicService characteristicService;
        public ProductController(IProductService _productService, IProductCharacteristicService _characteristicService)
        {
            productService = _productService;
            characteristicService = _characteristicService;
        }

        [HttpGet]
        public async Task<ActionResult<Product>> Get()
        {
            var items = await productService.GetAllProductAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetProductWithCharacteristicDto>> Get(int id)
        {
            var dto = new GetById { Id = id };
            var items = await productService.GetProductWithCharacteristicAsync(dto);
            return Ok(items);
        }
        [HttpGet("category-id")]
        public async Task<ActionResult<IEnumerable<Product>>> Get([FromQuery] GetByCategory dto)
        {
            var items = await productService.GetProductsByCategoryAsync(dto);
            return Ok(items);
        }
        [HttpGet("filter")]
        public async Task<ActionResult<GetProductDto>> Get([FromQuery] FilterProduct dto)
        {
            var items = await productService.GetProduct(dto);
            return Ok(items);
        }

        [HttpPost]
        public async Task<ActionResult> Post(List<CreateProductWithCategoryIdDto> dto)
        {
            await productService.PostProductByIdAsync(dto);
            return Ok();
        }
        [HttpPut("category")]
        public async Task<ActionResult> Put(UpdateProductCategoryDto dto)
        {
            await productService.UpdateCategoryAsync(dto);
            return Ok();
        }

        [HttpPut("description")]
        public async Task<ActionResult> Put(UpdateDescriptionDto dto)
        {
            await productService.UpdateDescroptionAsync(dto);
            return Ok();
        }
        [HttpPut("name")]
        public async Task<ActionResult> Put(UpdateProductNameDto dto)
        {
            await productService.UpdateProductNameAsync(dto);
            return Ok();
        }
        [HttpPut("price")]
        public async Task<ActionResult> Put(UpdateProductPriceDto dto)
        {
            await productService.UpdateProductNameAsync(dto);
            return Ok();
        }
        [HttpPut("image")]
        public async Task<ActionResult> Put(UpdateImageDto dto)
        {
            await productService.UpdateImageAsync(dto);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id) {
            await productService.DeleteAsync(id);
            return Ok();
        }
    }
}
