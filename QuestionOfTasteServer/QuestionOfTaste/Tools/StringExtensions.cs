namespace QuestionOfTaste.Tools
{
    public static class StringExtensions
    {
        public static string GetStringBetween(this string strSource, string strStart, string strEnd)
	{
		if (strSource.Contains(strStart) && strSource.Contains(strEnd))
		{
			var start = strSource.IndexOf(strStart, 0) + strStart.Length;
			var end = strSource.IndexOf(strEnd, start);
			if (end == -1)
			{
				end = strSource.Length;
			}
			
			return strSource.Substring(start, end - start).Trim();
		}
		return "";
	}
    }
}