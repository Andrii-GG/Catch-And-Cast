namespace CatchAndCast.Data.Models;

public class Review
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int ProductId { get; set; }
    public double Rate { get; set; }
    public string Comment { get; set; }
    public DateTime AddDate { get; set; }
    public Product Product { get; set; }
    public User User { get; set; }
}
