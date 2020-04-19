using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Configuration;
using QuestionOfTaste.Models;

namespace QuestionOfTaste
{
    public class DishesCache : ICache
    {
        public DishesCache(DishDeserializer dishDeserializer, IConfiguration config)
        {
            this.inputDirectory = config["InputDirectory"];
            this.dishDeserializer = dishDeserializer;
            Initialize();
        }

        public List<Dish> Dishes { get; set; }

        private void Initialize()
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

        
        private readonly string inputDirectory;
        private readonly DishDeserializer dishDeserializer;
    }
}