using CatchAndCast.Data.Enums;
using Microsoft.AspNetCore.Identity;

namespace CatchAndCast.Data.Models;

public class User : IdentityUser
{
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? PhoneNumber { get; set; }
    public UserRoles Role { get; set; }
    public ICollection<Cart> Carts { get; set; }
    public ICollection<Favorite> Favorites { get; set; }
    public ICollection<Review> Reviews { get; set; }

}
