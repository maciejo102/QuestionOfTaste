using System.Collections.Generic;
using System.Linq;
using QuestionOfTaste.Models;
using QuestionOfTaste.Tools;

namespace QuestionOfTaste
{
	public class DishDeserializer
	{
		public List<Dish> Deserialize(string inputString)
		{
			inputString = inputString.Replace("\n+", "\n!+");
			var dishes = new List<Dish>();

			var elements = new List<string>();

			ulong id = 1;
			while (inputString.Contains("#end"))
			{
				var element = inputString.GetStringBetween("#start", "#end");
				var name = element.GetStringBetween(".", "(");
				var link = element.GetStringBetween("(", ")");
				var ingredients = new List<string>();
				var ingredientsDetails = new List<string>();

				if (dishes.Any(d => d.Name == name)) 
				{
					inputString = inputString.Remove(0, inputString.IndexOf("#end") + "#end".Length);
					continue;
				}

				while (element.Contains("!+"))
				{
					var ingredientFullString = element.GetStringBetween("!+", "!+");
					var detail = ingredientFullString.Substring(0, ingredientFullString.IndexOf("[")).Trim();
					ingredientsDetails.Add(detail);

					var ingredientsNames = ingredientFullString.GetStringBetween("[", "]").Replace("'", "").Replace(" ", "").Split(",");
					ingredients.AddRange(ingredientsNames);
					ingredients = ingredients.Distinct().ToList();
					element = element.Remove(0, element.IndexOf("]") + "]".Length);
				}

				var dish = new Dish(id, name, link, ingredients, ingredientsDetails);
				
				dishes.Add(dish);
				inputString = inputString.Remove(0, inputString.IndexOf("#end") + "#end".Length);
				id++;
			}

			return dishes;
		}


	}
}