import { NextApiRequest, NextApiResponse } from "next";
import { openAi } from "@/config/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { redditPostTitle, redditPostContent } = req.body;
    try {
      const prompt = `You will receive the contents of a Reddit post as input. You will provide a list of up to 5 of the most relevant topics and key takeaways of the post. Only provide the list items themselves. Do not state what you are providing. The list items should be ordered in chronological sequence, if it is reasonable to do so. Each list item may be longer than 1 sentence. If a list item may contain misinformation, state a warning. It is not required to fulfill all 5 list items as long as the most relevant content of the Reddit post is covered. Make sure to summarize the overall ideas, sentiments, concerns, and thoughts that the post author is trying to convey with their post. Refer to the post author as \`OP\`. Each item of the list should be a single sentence ending with a period. You will also summarize the title of the post to 1 sentence only such that it is easier to understand while still conveying its original meaning. The title and each list item should be separated exactly by \`[DELIMITER]\`. There will be no other text whatsoever apart from the list items. I will now provide the Reddit post content: 

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
      res.status(200).json(completionTextArray);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
