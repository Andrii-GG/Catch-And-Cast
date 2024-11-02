using System.Net;

namespace CatchAndCast.Service.Exceptions;

public class UserNotFound : BaseApplicationException
{
    public UserNotFound() : base("User not found!", HttpStatusCode.NotFound)
    {
        
    }
}
