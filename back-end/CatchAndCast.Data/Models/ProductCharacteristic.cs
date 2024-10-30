using System.ComponentModel.DataAnnotations;

namespace CatchAndCast.Data.Models;

public class ProductCharacteristic
{
    [Key]
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string NameOfCharacteristic { get; set; }
    public string DescriptionOfCharacteristic { get; set; }
    public Product Product { get; set; }
}
