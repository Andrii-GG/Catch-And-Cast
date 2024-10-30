using CatchAndCast.Service.Dto.Category;
using CatchAndCast.Service.Dto.User;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update.Internal;

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

        [HttpPost]
        public async Task<ActionResult> Post(CreateCategoryDto item)
        {
            await categoryService.CreateAsync(item);
            return Ok();
        }
        [HttpPost("image")]
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
        [HttpDelete("id")]
        public async Task<ActionResult> Delete(DeleteUserByIdDto dto)
        {
            await categoryService.DeleteByIdAsync(dto);
            return Ok();
        }
        [HttpDelete("name")]
        public async Task<ActionResult> Delete(DeleteUserByNameDto dto)
        {
            await categoryService.DeleteByNameAsync(dto);
            return Ok();
        }
    }
}
