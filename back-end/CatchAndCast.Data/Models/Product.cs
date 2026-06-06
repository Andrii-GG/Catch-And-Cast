using System.ComponentModel.DataAnnotations;

namespace CatchAndCast.Data.Models;
public class Product
{
    [Key]
    public int Id { get; set; }
    public string ProductName { get; set; }
    public double ProductPrice { get; set; }
    public DateTime CreatedAt { get; set; }
    public int CategoryId { get; set; }
    public string? ProductDescription { get; set; }
    public double? Rating { get; set; }
    public int AmountOfProduct { get; set; }
    public int? CountRate { get; set; }
    public string? ProductImageUrl { get; set; }
    public Category Category { get; set; }
    public ICollection<Cart> Carts { get; set; }
    public ICollection<Favorite> Favorites { get; set; }
    public ICollection<Review> Reviews { get; set; }
    public ICollection<ProductCharacteristic> Characteristics { get; set; }
}
