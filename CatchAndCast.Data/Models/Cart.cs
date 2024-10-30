using CatchAndCast.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace CatchAndCast.Data.Models;

public class Cart
{
    [Key]
    public int Id { get; set; }
    public string UserId { get; set; }
    public int ProductId { get; set; }
    public int CounterProducts { get; set; }
    public User User { get; set; }
    public Product Product { get; set; }
}