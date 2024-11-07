namespace CatchAndCast.Service.Dto.Product;

public class GetProductDto
{
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
}
