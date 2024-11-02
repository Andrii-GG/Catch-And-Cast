using CatchAndCast.Service.Dto.Product;
using FluentValidation;

namespace CatchAndCast.Api.Validators
{
    public class CreateProductWithCategoryIdValidator : AbstractValidator<CreateProductWithCategoryIdDto>
    {
        public CreateProductWithCategoryIdValidator()
        {
            RuleFor(x => x.ProductName).MaximumLength(250);
            RuleFor(x => x.ProductDescription).MaximumLength(2500);
        }
    }
}
