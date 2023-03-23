import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-6wdYdj9UCkOlWheHb39Umvz2",
  apiKey: process.env.OPEN_AI_API_KEY,
});

export const openAi = new OpenAIApi(configuration);
