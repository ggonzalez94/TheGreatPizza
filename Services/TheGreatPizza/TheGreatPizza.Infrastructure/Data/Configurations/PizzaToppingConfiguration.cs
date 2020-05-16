using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TheGreatPizza.Core.Pizzas;

namespace TheGreatPizza.Infrastructure.Data.Configurations
{
    public class PizzaToppingConfiguration : IEntityTypeConfiguration<PizzaTopping>
    {
        public void Configure(EntityTypeBuilder<PizzaTopping> builder)
        {
            builder.HasKey(pt => new {pt.PizzaId, pt.ToppingId});

            builder.HasOne(pt => pt.Pizza)
                .WithMany(p => p.PizzaToppings)
                .HasForeignKey(pt => pt.PizzaId);

            builder.HasOne(pt => pt.Topping)
                .WithMany()
                .HasForeignKey(pt => pt.ToppingId);
        }
    }
}