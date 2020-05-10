using Microsoft.AspNetCore.Mvc;
using QuestionOfTaste.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace QuestionOfTaste.RestServices
{
	[Route("ingredients-service")]
	public class IngredientRestService : Controller
	{
		public IngredientRestService(DishesCache dishesCache)
		{
			this.dishesCache = dishesCache;
		}

		[HttpGet("v1/ingredients"), HttpOptions(Name = "pattern")]
		public IngredientsPickerResponse GetIngredients(string pattern)
		{
			if (string.IsNullOrEmpty(pattern))
				return new IngredientsPickerResponse { IngredientsPickerItems = new List<Ingredient>() };

			var ingredients = dishesCache.IngredientDishIdsMap.Keys;
			var filteredIngredients = ingredients.Where(i => i.Contains(pattern)).Select(i => new Ingredient(i));

			Console.WriteLine("Filtered ingredients: {0}", filteredIngredients.Count());
			var response = new IngredientsPickerResponse { IngredientsPickerItems = filteredIngredients };

			return response;
		}


		private readonly DishesCache dishesCache;
	}
}
