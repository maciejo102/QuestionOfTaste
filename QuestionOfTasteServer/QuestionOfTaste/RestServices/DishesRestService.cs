using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using QuestionOfTaste.Models;

namespace QuestionOfTaste.Services
{
	[Route("dishes-service")]
	public class DishesRestService : Controller
	{
		public DishesRestService(DishesCache dishesCache)
		{
			this.dishesCache = dishesCache;
		}

		[HttpGet("v1/dishes"), HttpOptions(Name = "ingredients")]
		public dynamic GetDishes(string ingredients)
		{
			var ingredientsArray = ingredients.Split(',');
			var dishIds = new HashSet<ulong>();

			foreach (var ingredient in ingredientsArray)
			{
				try
				{
					dishIds.UnionWith(dishesCache.IngredientDishIdsMap[ingredient]);
				}
				catch (KeyNotFoundException)
				{
					Console.WriteLine("Ingredient: {0} does not exist.", ingredient);
				}
			}

			var dishesWithGivenIngredients = new List<Dish>();
			foreach (var dishId in dishIds)
			{
				dishesWithGivenIngredients.AddRange(dishesCache.Dishes.Where(d => d.Id == dishId).Distinct());
			}

			Console.WriteLine("Presented dishes: {0}", dishesWithGivenIngredients.Count);
			return dishesWithGivenIngredients;
		}

		private readonly DishesCache dishesCache;
	}
}