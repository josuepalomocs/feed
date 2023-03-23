if (!process.env.REDDIT_APP_ID)
  throw new Error(formatErrorMessage("REDDIT_APP_ID"));

if (!process.env.REDDIT_APP_SECRET)
  throw new Error(formatErrorMessage("REDDIT_APP_SECRET"));

if (!process.env.REDDIT_APP_ACCESS_TOKEN)
  throw new Error(formatErrorMessage("REDDIT_APP_ACCESS_TOKEN"));

if (!process.env.REDDIT_USERNAME)
  throw new Error(formatErrorMessage("REDDIT_USERNAME"));

if (!process.env.REDDIT_PASSWORD)
  throw new Error(formatErrorMessage("REDDIT_PASSWORD"));

if (!process.env.OPEN_AI_API_KEY)
  throw new Error(formatErrorMessage("OPEN_AI_API_KEY"));

if (!process.env.NEXT_PUBLIC_SERVER_BASE_URL)
  throw new Error(formatErrorMessage("NEXT_PUBLIC_SERVER_BASE_URL"));

function formatErrorMessage(missingEnvironmentVariable: string) {
  return `Missing required environment variable: ${missingEnvironmentVariable}`;
}

const redditAppId: string = process.env.REDDIT_APP_ID;
const redditAppSecret: string = process.env.REDDIT_APP_SECRET;
const redditAppAccessToken: string = process.env.REDDIT_APP_ACCESS_TOKEN;
const redditUsername: string = process.env.REDDIT_USERNAME;
const redditPassword: string = process.env.REDDIT_PASSWORD;

const openAiApiKey: string = process.env.OPEN_AI_API_KEY;

const serverBaseUrl: string = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const redditAppConfigVariables = {
  redditAppId,
  redditAppSecret,
  redditAppAccessToken,
  redditUsername,
  redditPassword,
};

export const serverConfigVariables = {
  serverBaseUrl,
};

export const openAiConfigVariables = {
  openAiApiKey,
};
