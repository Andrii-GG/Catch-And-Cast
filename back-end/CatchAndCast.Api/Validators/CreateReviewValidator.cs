using CatchAndCast.Service.Dto.Review;
using FluentValidation;

namespace CatchAndCast.Api.Validators;

public class CreateReviewValidator : AbstractValidator<CreateReviewDto>
{
	public CreateReviewValidator()
	{
		RuleFor(x => x.Comment).MaximumLength(1000);
	}
}
