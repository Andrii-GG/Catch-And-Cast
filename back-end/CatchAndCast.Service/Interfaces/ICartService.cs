using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Cart;

namespace CatchAndCast.Service.Interfaces;

public interface ICartService
{
    Task<IEnumerable<GetCartItemsDto>> Get();
    Task<IEnumerable<Cart>> GetAll();
    Task Post(CreateCartItemDto dto);
    Task Put(UpdateCartItemDto dto);
    Task Delete(int id);
    Task Delete(DeleteCartById dto);
}
