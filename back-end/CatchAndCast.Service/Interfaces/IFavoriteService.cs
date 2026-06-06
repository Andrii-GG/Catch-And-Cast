using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Favorite;

namespace CatchAndCast.Service.Interfaces;

public interface IFavoriteService
{
    Task<IEnumerable<GetFavoritesProductDto>> Get();
    Task<IEnumerable<Product>> GetAsync();
    Task Post(CreateFavoriteDto dto);
    Task Delete(int id);
    Task Delete(DeleteFavoriteById dto);
}
