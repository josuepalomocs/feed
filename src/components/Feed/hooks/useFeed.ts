import { useEffect, useState } from "react";
import { FeedPost } from "../../../../types";

export default function useFeed() {
  const [feed, setFeed] = useState<FeedPost[]>([]);

  useEffect(() => {
    async function fetchFeed(): Promise<FeedPost[]> {
      return [
        {
          id: "qwe",
          author: "Google",
          createdTimestamp: 1679399993,
          title: "Get early access to Google Bard",
          contentText:
            "Today we're starting to open up access to Bard, our early experiment that lets you collaborate " +
            "with generative AI. You can use Bard to boost your productivity, accelerate your ideas and fuel your " +
            "curiosity. We're beginning with the U.S. + U.K. and expanding over time to more countries and " +
            "languages. Learn more and sign up.",
          positiveResponseCount: 7452,
          negativeResponseCount: 24,
          sourceName: "LinkedIn",
          sourceHref:
            "https://www.linkedin.com/search/results/content/?keywords=google&sid=qCp&update=urn%3Ali%3Afs_update" +
            "V2%3A(urn%3Ali%3Aactivity%3A7043972251934748672%2CBLENDED_SEARCH_FEED%2CEMPTY%2CDEFAULT%2Cfalse)",
        },
        {
          id: "qwe",
          author: "swagonflyyyy",
          createdTimestamp: 1679399993,
          title: "Got Bard Access. AMA!",
          contentText:
            "Please don't ask offensive or harmful questions. Thank you!\n" +
            "\n" +
            "Proof\n" +
            "\n" +
            "Findings:\n" +
            "\n" +
            "- Bard's responses are comparable to ChatGPT but it still falls short in some key areas.\n" +
            "\n" +
            "- Its fact-finding skills are questionable compared to Bing Chat, providing no sources and frequently providing misleading information. Take it with a grain of salt.\n" +
            "\n" +
            "- I wasn't able to jailbreak it with the DAN prompt. Can't even complete the damn thing.\n" +
            "\n" +
            "All-in-all, Bard is certainly better than lambda but it still has some room for improvement.",
          positiveResponseCount: 213,
          negativeResponseCount: 8,
          sourceName: "Reddit",
          sourceHref:
            "https://www.reddit.com/r/ChatGPT/comments/11xn45d/got_bard_access_ama/",
        },
      ];
    }

    fetchFeed()
      .then((fetchedFeed) => {
        setFeed(fetchedFeed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { feed };
}
