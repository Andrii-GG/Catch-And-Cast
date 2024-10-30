namespace CatchAndCast.Service.Dto.Review;

public class CreateReviewDto
{
    public int ProductId { get; set; }
    public double Rate { get; set; }
    public string Comment { get; set; }

}
