import { NextApiRequest, NextApiResponse } from "next";
import { openAi } from "@/config/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { redditPostTitle, redditPostContent } = req.body;
    console.log(redditPostTitle, redditPostContent);
    try {
      const prompt = `You will receive the contents of a Reddit post as input. 
        You will provide a list of up to 10 of the most relevant topics and key takeaways of the post. Only provide
        the list items themselves. Do not state what you are providing.
        It is not required to fulfill all 10 list items as long as the most relevant content of the Reddit post is covered. 
        Make sure to summarize the overall ideas, sentiments, concerns, and thoughts that the 
        post author is trying to convey with their post. Each item of the list should be as short as possible while still 
        conveying the original meaning. You will also summarize the title of the post such that it is easier to
        understand while still conveying its original meaning. The title and each list item should be separated exactly 
        by \`[DELIMITER]\`. There will be no other text whatsoever 
        apart from the list items. I will now provide the Reddit post content: 
        Reddit post title: \`${redditPostTitle}\`
        Reddit post content: \`${redditPostContent}\``;
      const completion = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 300,
        temperature: 0.7,
        n: 1,
        stream: false,
      });
      const completionTextArray: string[] =
        completion.data.choices[0].text.split("[DELIMITER]");
      if (!completionTextArray.length) {
        completionTextArray.push(completion.data.choices[0].text);
      }
      console.log(completionTextArray);
      res.status(200).json(completionTextArray);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
