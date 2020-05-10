using System.Collections.Generic;
using System.Linq;

namespace QuestionOfTaste.Models
{
	public class Dish
	{
		public Dish(ulong id, string name, string link, List<string> keyWords, List<string> ingredientsDetails)
		{
			Id = id;
			Name = name;
			Link = link;
			Ingredients = keyWords.Select(kw => new Ingredient(kw)).ToList();
			IngredientDetails = ingredientsDetails;
		}

		public ulong Id { get; set; }
		public string Name { get; set; }
		public string Link { get; set; }
		public List<Ingredient> Ingredients { get; set; }
		public List<string> IngredientDetails { get; set; }
	}
}