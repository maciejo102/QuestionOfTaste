using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;
using QuestionOfTaste.Models;

namespace QuestionOfTaste
{
	public class DishesCache
	{

		public DishesCache(
			DishDeserializer dishDeserializer,
			IConfiguration config
		)
		{
			Console.WriteLine("initialized");
			this.inputDirectory = Environment.GetEnvironmentVariable("DATA_SOURCE") == "dummy"
				? DummyDataDirectoryName
				: config["InputDirectory"];
			this.dishDeserializer = dishDeserializer;
			Initialize();
		}

		public List<Dish> Dishes { get; private set; }

		public Dictionary<string, List<ulong>> IngredientDishIdsMap
		{
			get; private set;
		}

		private void Initialize()
		{
			InitializeDishes();
			InitializeIngredientDishIdsMap();
		}

		internal dynamic Where()
		{
			throw new NotImplementedException();
		}

		private void InitializeIngredientDishIdsMap()
		{
			IngredientDishIdsMap = new Dictionary<string, List<ulong>>();
			foreach (var dish in Dishes)
			{
				var ingredientNames =
					dish.Ingredients.Select(i => i.Name).Distinct();
				foreach (var ingredientName in ingredientNames)
				{
					if (!IngredientDishIdsMap.ContainsKey(ingredientName))
						IngredientDishIdsMap
							.Add(ingredientName, new List<ulong>());
					IngredientDishIdsMap[ingredientName].Add(dish.Id);
				}
			}
		}

		private void InitializeDishes()
		{
			Dishes = new List<Dish>();
			var inputFiles = Directory.EnumerateFiles(inputDirectory);

			foreach (var path in inputFiles)
			{
				using (var reader = new StreamReader(path))
				{
					var inputText = reader.ReadToEnd();
					var dishes = dishDeserializer.Deserialize(inputText);
					Dishes.AddRange(dishes);
				}
			}
		}

		private const string DummyDataDirectoryName = "DummyData";
		private readonly string inputDirectory;
		private readonly DishDeserializer dishDeserializer;
	}
}
