using System.Net;

namespace CatchAndCast.Service.Exceptions;

public class ClosedAction : BaseApplicationException
{
    public ClosedAction() : base("This action close for you!", HttpStatusCode.Locked)
    {
    }
}
