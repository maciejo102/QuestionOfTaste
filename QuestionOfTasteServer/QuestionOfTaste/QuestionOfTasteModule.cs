using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace QuestionOfTaste
{
	public static class QuestionOfTasteModule
	{
		public static IServiceCollection RegisterComponents(this IServiceCollection services)
		{
			var assembly = Assembly.Load("QuestionOfTaste");
			services.AddMvc().AddApplicationPart(assembly).AddControllersAsServices();

			services.AddSingleton<IngredientService>();
			services.AddSingleton<DishDeserializer>();
			services.AddSingleton<ICache, DishesCache>();
			return services;
		}
	}
}
