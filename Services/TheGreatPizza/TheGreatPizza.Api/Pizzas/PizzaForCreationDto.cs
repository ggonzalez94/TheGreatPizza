using System.ComponentModel.DataAnnotations;

namespace TheGreatPizza.Api.Pizzas
{
    public class PizzaForCreationDto
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}