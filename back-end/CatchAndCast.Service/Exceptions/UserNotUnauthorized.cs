namespace CatchAndCast.Service.Exceptions;

public class UserNotUnauthorized : BaseApplicationException
{
    public UserNotUnauthorized() : base("User not unauthorized", System.Net.HttpStatusCode.Unauthorized)
    {
        
    }
}
