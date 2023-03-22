// Feed

export type FeedPostContentView = "contentText" | "contentList";

export interface FeedPost {
  id: string;
  author?: string;
  createdTimestamp?: number;
  title?: string;
  contentText?: string;
  contentList?: string[];
  positiveResponseCount?: number;
  negativeResponseCount?: number;
  sourceName?: string;
  sourceHref?: string;
  imageHrefs?: string[];
}

export interface RedditPostQuery {
  subredditId: string;
  postId: string;
}
