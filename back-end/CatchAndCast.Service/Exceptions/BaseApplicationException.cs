using System.Net;

namespace CatchAndCast.Service.Exceptions;

public class BaseApplicationException : Exception
{
    public HttpStatusCode Status { get;}
    public BaseApplicationException(string message, HttpStatusCode statusCode) : base(message)
    {
        Status = statusCode;
    }
}
