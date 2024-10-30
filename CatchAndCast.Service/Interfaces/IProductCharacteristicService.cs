using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Characteristic;
using CatchAndCast.Service.Dto.Product;

namespace CatchAndCast.Service.Interfaces;

public interface IProductCharacteristicService
{
    Task<IEnumerable<ProductCharacteristic>> GetAllAsync();
    Task<List<ProductCharacteristic>> GetByProductIdAsync(int id);
    Task CreateCharacteristicAsync(CreateCharacteristicDto dto);
    Task UpdateDescription(UpdateCharacteristicDto dto);
    Task DeleteAsync(int id);

}
