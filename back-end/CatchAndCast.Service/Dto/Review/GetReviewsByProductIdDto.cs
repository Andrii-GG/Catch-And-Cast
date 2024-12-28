namespace CatchAndCast.Service.Dto.Review;
public class GetReviewsByProductIdDto
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public double Rate { get; set; }
    public string Comment { get; set; }
    public DateTime AddDate { get; set; }
}
