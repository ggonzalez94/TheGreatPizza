using TheGreatPizza.Core.Toppings;

namespace TheGreatPizza.Core.Pizzas
{
    public class PizzaTopping
    {
        public int PizzaId { get; set; }
        public Pizza Pizza { get; set; }

        public int ToppingId { get; set; }
        public Topping Topping { get; set; }
        
        private PizzaTopping() { } //Private ctor for EF Core

        public PizzaTopping(Topping topping)
        {
            Topping = topping;
        }
    }
}