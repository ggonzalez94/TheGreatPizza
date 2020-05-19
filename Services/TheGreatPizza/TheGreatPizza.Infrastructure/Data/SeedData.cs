using System.Collections.Generic;
using System.Linq;
using TheGreatPizza.Core.Pizzas;
using TheGreatPizza.Core.Toppings;

namespace TheGreatPizza.Infrastructure.Data
{
    // Class for seeding data for development purposes
    public static class SeedData
    {
        public static void Seed(ApplicationDbContext context)
        {
            SeedPizzasWithToppings(context);
        }

        private static void SeedPizzasWithToppings(ApplicationDbContext context)
        {
            // Toppings
            var basil = new Topping("Basil");
            var mozzarella = new Topping("Mozzarella");
            var tomato = new Topping("Tomato");
            var anchovies = new Topping("Anchovies");
            var garlic = new Topping("Garlic");
            var pineapple = new Topping("Pineapple");
            var mushrooms = new Topping("Mushrooms");
            var toppings = new List<Topping> {
                basil, mozzarella, tomato, anchovies, garlic, pineapple, mushrooms
            };

            if (!context.Toppings.Any())
                context.AddRange(toppings);

            // Pizzas
            var margherita = new Pizza("Margherita ", @"Usually this pizza is made with basil, 
                    mozzarella cheese and tomatoes in imitation of the colors of the Italian flag.");
            margherita.AddTopping(mozzarella);
            margherita.AddTopping(tomato);
            margherita.AddTopping(basil);
            var napoli = new Pizza("Napoli", "This pizza is created using anchovies, mozzarella and tomatoes.");
            napoli.AddTopping(anchovies);
            napoli.AddTopping(mozzarella);
            napoli.AddTopping(tomato);

            var pizzas = new List<Pizza> {
                margherita,napoli
            };

            if (!context.Pizzas.Any())
                context.AddRange(pizzas);
            
            context.SaveChanges();
        }
    }
}