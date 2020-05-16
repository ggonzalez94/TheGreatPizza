using System;
using System.Collections.Generic;
using System.Linq;
using TheGreatPizza.Core.Toppings;

namespace TheGreatPizza.Core.Pizzas
{
    public class Pizza
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        private readonly List<PizzaTopping> _pizzaToppings = new List<PizzaTopping>();
        public IReadOnlyList<PizzaTopping> PizzaToppings => _pizzaToppings.ToList();
    }
}
