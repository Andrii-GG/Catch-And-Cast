namespace CatchAndCast.Service.Exceptions;

public class ItemAlreadyExist : BaseApplicationException
{
    public ItemAlreadyExist() : base("Item already exist!", System.Net.HttpStatusCode.Locked)
    {
    }
}
