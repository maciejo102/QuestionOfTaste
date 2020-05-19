using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace QuestionOfTasteServer
{
	public class Program
	{
		public static void Main(string[] args)
		{
			if (args.Length != 0)
			{
				Environment.SetEnvironmentVariable("DATA_SOURCE", args[0]);
				Console.WriteLine("!!!! USING DUMMY DATA SOURCE !!!!");
			}

			BuildWebHost(args).Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
			WebHost
			.CreateDefaultBuilder(args)
			.UseStartup<Startup>()
			.UseUrls("http://0.0.0.0:1219/")
			.Build();
	}
}
