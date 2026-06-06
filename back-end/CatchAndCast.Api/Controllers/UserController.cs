using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.User;
using CatchAndCast.Service.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CatchAndCast.Api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ICurrentUserService context;
        private readonly UserManager<User> _userManager;

        public UserController(ICurrentUserService _context, UserManager<User> userManager)
        {
            context = _context;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var items = await context.GetAsync();
            return Ok(items);
        }
        [HttpGet("all")]
        public async Task<ActionResult> GetAll()
        {
            var items = await context.GetAllAsync();
            return Ok(items);
        }
        [HttpPost("reset")]
        public async Task<ActionResult> Get(ResetPasswordDto dto)
        {
            await context.ResetPassword(dto);
            return Ok();
        }
        [HttpPost("register")]
        public async Task<ActionResult> Post(RegisterUserDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await context.CreateAsync(model);
            var result = await _userManager.CreateAsync(item, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok(new { message = "Registration successful!" });
        }

        [HttpPut]
        public async Task<ActionResult> Put(UpdateUserDto item)
        {
            await context.UpdateAsync(item);
            return Ok();
        }
        [HttpPut("first-name")]
        public async Task<ActionResult> Put(UpdateFirstNameDto item)
        {
            await context.UpdateFirstNameAsync(item);
            return Ok();
        }
        [HttpPut("second-name")]
        public async Task<ActionResult> Put(UpdateSecondNameDto item)
        {
            await context.UpdateSecondNameAsync(item);
            return Ok();
        }
        [HttpPut("phone-number")]
        public async Task<ActionResult> Put(UpdatePhoneNumberDto item)
        {
            await context.UpdatePhoneNumberAsync(item);
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> Delete()
        {
            await context.DeleteAsync();
            return Ok();
        }
        [HttpDelete("{UserId}")]
        public async Task<ActionResult> Delete(string UserId)
        {
            await context.DeleteUserAsync(UserId);
            return Ok();
        }
    }
}
