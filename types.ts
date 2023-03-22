// Feed

export interface FeedPost {
  id: string;
  author?: string;
  createdTimestamp?: number;
  title?: string;
  contentText?: string;
  positiveResponseCount?: number;
  negativeResponseCount?: number;
  sourceName?: string;
  sourceHref?: string;
}
