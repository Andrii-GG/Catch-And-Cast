namespace CatchAndCast.Service.Exceptions;

public class NotExactUser : BaseApplicationException
{
    public NotExactUser() : base("Not exact user!", System.Net.HttpStatusCode.Locked)
    {
    }
}
