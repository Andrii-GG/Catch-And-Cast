using CatchAndCast.Service.Dto.User;
using FluentValidation;

namespace CatchAndCast.Api.Validators
{
    public class RegisterUserValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserValidator()
        {
            RuleFor(x => x.FirstName).MaximumLength(50);
            RuleFor(x => x.SecondName).MaximumLength(100);
            RuleFor(x => x.PhoneNumber).MaximumLength(13);
        }
    }
}
