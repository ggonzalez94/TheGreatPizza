using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheGreatPizza.Core.Toppings;
using TheGreatPizza.Infrastructure.Data;

namespace TheGreatPizza.Api.Toppings
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ToppingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ToppingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create(ToppingForCreationDto dto)
        {
            var toppingExists = await _context.Toppings.AnyAsync(t => t.Name == dto.Name);
            if (toppingExists)
                return BadRequest("There is already a topping with the same name. Seems like someone already added it");
            
            var topping = new Topping(dto.Name);

            await _context.AddAsync(topping);
            await _context.SaveChangesAsync();
            return StatusCode(201, topping.Id);
        }

        [HttpGet]
        [ProducesResponseType(typeof(GetAllToppingsDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll() 
        {
            var toppings = await _context.Toppings
                .Select(t => new ToppingSummaryDto {
                    Id = t.Id,
                    Name = t.Name
                })
                .ToListAsync();

            return Ok(new GetAllToppingsDto {Toppings = toppings});
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var topping = await _context.Toppings
                .FirstOrDefaultAsync(t => t.Id == id);

            if (topping is null)
                return NotFound("There is not such topping. Sorry!");
            
            _context.Remove(topping);
            await _context.SaveChangesAsync();

            return Ok();
        }


    }
}