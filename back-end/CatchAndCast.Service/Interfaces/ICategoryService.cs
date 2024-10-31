using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Category;
using CatchAndCast.Service.Dto.User;

namespace CatchAndCast.Service.Interfaces;

public interface ICategoryService
{
    Task<List<Category>> GetAsync();
    Task<Category> GetAsync(int id);
    Task CreateAsync(CreateCategoryDto itemDto);
    Task CreateAsync(CreateCategoryWithImageDto itemDto);
    Task UpdateAsync(UpdateCategoryDto itemDto);
    Task UpdateAsync(UpdateImageInCategoryDto itemDto);
    Task DeleteByIdAsync(DeleteUserByIdDto dto);
    Task DeleteByNameAsync(DeleteUserByNameDto dto);
}
