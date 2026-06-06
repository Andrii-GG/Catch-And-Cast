using CatchAndCast.Service.Dto.Category;
using FluentValidation;

namespace CatchAndCast.Api.Validators
{
    public class CreateCategoryWithImageValidator : AbstractValidator<CreateCategoryWithImageDto>
    {
        public CreateCategoryWithImageValidator()
        {
            RuleFor(x=>x.CategoryName).NotEmpty();
            RuleFor(x=>x.CategoryName).MaximumLength(50);
        }
    }
}
