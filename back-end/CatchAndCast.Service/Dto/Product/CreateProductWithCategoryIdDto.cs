namespace CatchAndCast.Service.Dto.Product;

public class CreateProductWithCategoryIdDto
{
    public string ProductName { get; set; }
    public double ProductPrice { get; set; }
    public int CategoryId { get; set; }
    public int AmountOfProduct { get; set; }
    public string? ProductDescription { get; set; }
    public string? ProductImageUrl { get; set; }
}
