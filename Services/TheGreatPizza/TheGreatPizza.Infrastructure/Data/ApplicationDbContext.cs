using Microsoft.EntityFrameworkCore;
using System.Reflection;
using TheGreatPizza.Core.Pizzas;
using TheGreatPizza.Core.Toppings;

namespace TheGreatPizza.Infrastructure.Data
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Topping> Toppings { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
