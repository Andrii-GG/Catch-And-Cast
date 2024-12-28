using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Product;
using CatchAndCast.Service.Dto.Product.Getters;

namespace CatchAndCast.Service.Interfaces;

public interface IProductService
{
    Task UpdateImageAsync(UpdateImageDto dto);
    Task<IEnumerable<Product>> GetAllProductAsync();
    Task<GetProductWithCharacteristicDto> GetProductWithCharacteristicAsync(GetById dto);
    Task<IEnumerable<Product>> GetProductsByCategoryAsync(GetByCategory dto);
    Task<IEnumerable<GetProductDto>> GetProduct(FilterProduct dto);
    Task PostProductByIdAsync(List<CreateProductWithCategoryIdDto> dto);
    Task UpdateDescroptionAsync(UpdateDescriptionDto dto);
    Task UpdateProductNameAsync(UpdateProductNameDto dto);
    Task UpdateProductNameAsync(UpdateProductPriceDto dto);
    Task UpdateCategoryAsync(UpdateProductCategoryDto dto);
    Task DeleteAsync(int id);
    
}
