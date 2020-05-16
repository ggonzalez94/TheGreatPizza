using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TheGreatPizza.Core.Pizzas;

namespace TheGreatPizza.Infrastructure.Data.Configurations
{
    public class PizzaConfiguration : IEntityTypeConfiguration<Pizza>
    {
        public void Configure(EntityTypeBuilder<Pizza> builder)
        {
            builder.Property(p => p.Name).IsRequired();
        }
    }
}