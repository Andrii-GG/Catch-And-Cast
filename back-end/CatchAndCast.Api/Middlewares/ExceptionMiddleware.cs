using CatchAndCast.Service.Exceptions;
using System.Net;
using System.Text.Json;

namespace CatchAndCast.Api.Middlewares;


public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (BaseApplicationException ourEx)
        {
            context.Response.StatusCode = (int)ourEx.Status;
            var response = new { message = ourEx.Message };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = new { message = "Something went wrong" };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));

        }
    }
}
