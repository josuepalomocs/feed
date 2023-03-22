import { useEffect, useState } from "react";
import { FeedPost } from "../../types";
import axios from "axios";

export default function useRedditPosts(subredditId: string) {
  const [redditPosts, setRedditPosts] = useState<FeedPost[]>([]);

  useEffect(() => {
    async function fetchRedditPosts(): Promise<FeedPost[]> {
      const response = await axios.get(
        `api/reddit/subreddits/${subredditId}/new`
      );
      const redditPostsUnsanitized = response.data.data.children;
      console.log(redditPostsUnsanitized);
      const redditPostsSanitized = [];
      for (let index = 0; index < redditPostsUnsanitized.length; index++) {
        const redditPostUnsanitized = redditPostsUnsanitized[index].data;
        let redditPostImages = [];
        if (
          redditPostUnsanitized.preview &&
          redditPostUnsanitized.preview.images
        ) {
          redditPostImages = redditPostUnsanitized.preview.images;
        }
        const imageHrefs = [];
        for (let index = 0; index < redditPostImages.length; index++) {
          const redditPostImage = redditPostImages[index].source.url;
          imageHrefs.push(redditPostImage.replace(/&amp;/g, "&"));
        }
        console.log(imageHrefs);
        const redditPostSanitized: FeedPost = {
          id: redditPostUnsanitized.id,
          author: redditPostUnsanitized.author,
          createdTimestamp: redditPostUnsanitized.created_utc,
          title: redditPostUnsanitized.title,
          contentText: redditPostUnsanitized.selftext,
          positiveResponseCount: redditPostUnsanitized.ups,
          negativeResponseCount: redditPostUnsanitized.downs,
          sourceName: "Reddit",
          sourceHref: `https://www.reddit.com${redditPostUnsanitized.permalink}`,
          imageHrefs,
        };
        redditPostsSanitized.push(redditPostSanitized);
      }
      return redditPostsSanitized;
    }

    fetchRedditPosts()
      .then((feedPost) => setRedditPosts(feedPost))
      .catch((error) => console.log(error));
  }, [subredditId]);

  return { redditPosts };
}
