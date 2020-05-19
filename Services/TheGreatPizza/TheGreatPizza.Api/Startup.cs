using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using TheGreatPizza.Api.Utils;
using TheGreatPizza.Infrastructure.Data;

namespace TheGreatPizza.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<ApplicationDbContext>(options => {
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection"),
                    assembly => assembly.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name));
            });
            services.AddCors();
            services.AddCustomSwagger();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext context)
        {
            if (env.IsDevelopment())
            {
                SeedData.Seed(context);
            }
            app.UseMiddleware<ExceptionHandler>();

            app.UseRouting();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "The Great Pizza Api V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    static class CustomExtensionMethods
    {
        public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "The Great Pizza Api",
                    Version = "v1",
                });

                //var xmlFile = Path.ChangeExtension(typeof(Startup).Assembly.Location, ".xml");
                //c.IncludeXmlComments(xmlFile);
            });
            return services;
        }
    }
}
