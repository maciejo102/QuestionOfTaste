using Microsoft.Extensions.DependencyInjection;
using QuestionOfTaste.RestServices;
using System.Reflection;

namespace QuestionOfTaste
{
    public static class QuestionOfTasteModule
    {
        public static IServiceCollection RegisterComponents(this IServiceCollection services)
        {
            var assembly = Assembly.Load("QuestionOfTaste");
            services.AddMvc().AddApplicationPart(assembly).AddControllersAsServices();

            services.AddTransient<IngredientService>();
            return services;
        }
    }
}
