using Microsoft.AspNetCore.Mvc;
using QuestionOfTaste.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace QuestionOfTaste.RestServices
{
    [Route("qot")]
    public class IngredientRestService : Controller
    {
        [HttpGet("v1/ingredients"), HttpOptions(Name = "pattern")]
        public IngredientsPickerResponse GetIngredients(string pattern)
        {
            if (string.IsNullOrEmpty(pattern))
                return new IngredientsPickerResponse { IngredientsPickerItems = new List<Ingredient>() };

            var ingredients = new[] { "ziemniaki", "cebula" };
            var filteredIngredients = ingredients.Where(i => i.Contains(pattern)).Select(i => new Ingredient { Name = i });

            var response = new IngredientsPickerResponse { IngredientsPickerItems = filteredIngredients };

            return response;
        }
    }
}
