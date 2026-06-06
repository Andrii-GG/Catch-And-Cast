using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Category;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace CatchAndCast.Api.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;
        public CategoryController(ICategoryService _categoryService)
        {
            categoryService = _categoryService;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var items = await categoryService.GetAsync();
            return Ok(items);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> Get(int id)
        {
            var item = await categoryService.GetAsync(id);
            return Ok(item);
        }
        [HttpPost]
        public async Task<ActionResult> Post(CreateCategoryWithImageDto item)
        {
            await categoryService.CreateAsync(item);
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> Put(UpdateCategoryDto item)
        {
            await categoryService.UpdateAsync(item);
            return Ok();
        }
        [HttpPut("image")]
        public async Task<ActionResult> Put(UpdateImageInCategoryDto item)
        {
            await categoryService.UpdateAsync(item);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await categoryService.DeleteByIdAsync(id);
            return Ok();
        }
    }
}
