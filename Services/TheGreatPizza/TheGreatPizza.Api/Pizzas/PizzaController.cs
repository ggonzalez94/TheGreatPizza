using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheGreatPizza.Infrastructure.Data;
using TheGreatPizza.Core.Pizzas;
using TheGreatPizza.Core.Toppings;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TheGreatPizza.Api.Pizzas
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PizzaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PizzaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create(PizzaForCreationDto dto)
        {
            var pizza = new Pizza(dto.Name, dto.Description);

            await _context.AddAsync(pizza);
            await _context.SaveChangesAsync();

            return StatusCode(201, pizza.Id);
        }

        [HttpGet]
        [ProducesResponseType(typeof(GetAllPizzasDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var pizzas = await _context.Pizzas
                .Select(p => new PizzaSummaryDto {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description
                })
                .ToListAsync();

            return Ok(new GetAllPizzasDto { Pizzas = pizzas});
        }

        [HttpGet ("{id}")]
        [ProducesResponseType(typeof(GetPizzaDetailDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(int id) 
        {
            var pizza = await _context.Pizzas
                .Select(p => new GetPizzaDetailDto {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Toppings = p.PizzaToppings.Select(pt => new ToppingDetailDto {
                        Id = pt.Topping.Id,
                        Name = pt.Topping.Name
                    }).ToList()
                })
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pizza is null)
                return NotFound("Your pizza could not be found. Sorry!");

            return Ok(pizza);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var pizza = await _context.Pizzas
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pizza is null)
                return NotFound("There is not such pizza. Sorry!");

             _context.Remove(pizza);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost ("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> AddTopping(int id, AddToppingDto dto)
        {
            var pizza = await _context.Pizzas
                .Include(p => p.PizzaToppings).ThenInclude(pt => pt.Topping)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (pizza is null)
                return NotFound("Your pizza could not be found. Sorry!");

            var topping = await _context.Toppings
                .FirstOrDefaultAsync(t => t.Id == dto.ToppingId);
            //Instead of returning a 404 we return a 400 so that we display the message instead of redirecting to a NotFound page
            if (topping is null) 
                return BadRequest("The topping you are trying to add does not exist yet. You could try creating it!"); 

            pizza.AddTopping(topping);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost ("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> RemoveTopping(int id, RemoveToppingDto dto)
        {
            var pizza = await _context.Pizzas
                .Include(p => p.PizzaToppings).ThenInclude(pt => pt.Topping)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (pizza is null)
                return NotFound("Your pizza could not be found. Sorry!");

            var topping = await _context.Toppings
                .FirstOrDefaultAsync(t => t.Id == dto.ToppingId);
            if (topping is null) 
                return BadRequest("The topping you are trying to remove does not exist yet.");

            var result = pizza.RemoveTopping(topping);
            if (result.Failure)
                return BadRequest(result.Error);

            await _context.SaveChangesAsync();
            return Ok();
        }


    }
}