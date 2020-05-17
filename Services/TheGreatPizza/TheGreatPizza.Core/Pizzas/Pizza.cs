using System;
using System.Collections.Generic;
using System.Linq;
using TheGreatPizza.Core.Commons;
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

        public Pizza(string name, string description)
        {
            Name = name;
            Description = description;
        }

        public void AddTopping(Topping topping)
        {
            // If the topping is already part of the pizza just return
            if (_pizzaToppings.Any(pt => pt.Topping == topping))
                return;

            _pizzaToppings.Add(new PizzaTopping(topping));
        }

        public Result RemoveTopping(Topping topping)
        {
            var pizzaTopping = _pizzaToppings.FirstOrDefault(pt =>  pt.Topping == topping);
            if (pizzaTopping is null)
                return Result.Fail("The topping you are trying to remove is not part of this pizza. Thats odd...");
                       
            _pizzaToppings.Remove(pizzaTopping);
            return Result.Success();
        }
    }

    
}
