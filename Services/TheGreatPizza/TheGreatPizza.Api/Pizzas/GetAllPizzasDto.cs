using System.Collections.Generic;

namespace TheGreatPizza.Api.Pizzas
{
    public class GetAllPizzasDto
    {
        public List<PizzaSummaryDto> Pizzas { get; set; }
    }

    public class PizzaSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}