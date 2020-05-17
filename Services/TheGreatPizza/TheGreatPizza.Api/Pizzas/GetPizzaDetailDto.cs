using System.Collections.Generic;

namespace TheGreatPizza.Api.Pizzas
{
    public class GetPizzaDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ToppingDetailDto> Toppings { get; set; }
    }

    public class ToppingDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}