using System.Net;

namespace CatchAndCast.Service.Exceptions;

public class ItemNotFound : BaseApplicationException
{
    public ItemNotFound():base("Item not found!", HttpStatusCode.NotFound)
    {
        
    }
}
