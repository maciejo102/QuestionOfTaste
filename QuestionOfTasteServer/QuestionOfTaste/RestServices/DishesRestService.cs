using Microsoft.AspNetCore.Mvc;

namespace QuestionOfTaste.Services
{
    public class DishesRestService : Controller
    {
        [Route("dishes-service")]
        public class IngredientRestService : Controller
        {
            [HttpGet("v1/dishes"), HttpOptions(Name = "key")]
            public void GetIngredients(string pattern)
            {

                var ingredients = new[] { "ziemniaki", "cebula" };


            }
        }
    }
}