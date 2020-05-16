using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TheGreatPizza.Core.Toppings;

namespace TheGreatPizza.Infrastructure.Data.Configurations
{
    public class ToppingConfiguration : IEntityTypeConfiguration<Topping>
    {
        public void Configure(EntityTypeBuilder<Topping> builder)
        {
            builder.Property(t => t.Name).IsRequired();
        }
    }
}