using System.ComponentModel.DataAnnotations;

namespace TheGreatPizza.Api.Toppings
{
    public class ToppingForCreationDto
    {
        [Required]
        public string Name { get; set; }
    }
}