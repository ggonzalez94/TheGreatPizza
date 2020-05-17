using System.Collections.Generic;

namespace TheGreatPizza.Api.Toppings
{
    public class GetAllToppingsDto
    {
        public List<ToppingSummaryDto> Toppings { get; set; }
    }

    public class ToppingSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}