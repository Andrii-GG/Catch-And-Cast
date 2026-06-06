using CatchAndCast.Service.Dto.Characteristic;
using FluentValidation;

namespace CatchAndCast.Api.Validators;

public class CreateCharacteristicValidator : AbstractValidator<CreateCharacteristicDto>
{
    public CreateCharacteristicValidator()
    {
        RuleFor(x => x.NameOfCharacteristic).NotEmpty();
        RuleFor(x => x.NameOfCharacteristic).MaximumLength(100);
        RuleFor(x => x.DescriptionOfCharacteristic).MaximumLength(2000);
    }
}
