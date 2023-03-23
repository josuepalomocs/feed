import { useEffect, useState } from "react";
import Link from "next/link";
import { DocumentTextIcon as DocumentTextIconOutline } from "@heroicons/react/24/outline";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DocumentTextIcon,
} from "@heroicons/react/20/solid";
import { FeedPost as IFeedPost, FeedPostContentView } from "../../../types";
import fromUnixTime from "date-fns/fromUnixTime";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import axios from "axios";
import { differenceInDays, differenceInYears } from "date-fns";

interface FeedPostProps {
  data: IFeedPost;
}

export default function FeedPost({ data }: FeedPostProps) {
  const {
    author,
    createdTimestamp,
    title,
    contentText,
    positiveResponseCount,
    negativeResponseCount,
    sourceName,
    sourceHref,
    imageHrefs,
  } = data;
  const [feedPostContentView, setFeedPostContentView] =
    useState<FeedPostContentView>("contentText");
  const [contentList, setContentList] = useState<string[]>([]);
  const [isContentListLoaded, setIsContentListLoaded] = useState(false);
  useEffect(() => {
    async function fetchContentList(): Promise<string[]> {
      const response = await axios.post("/api/openai/text-completions", {
        redditPostTitle: title || "",
        redditPostContent: contentText || "",
      });
      return response.data;
    }

    if (feedPostContentView === "contentList" && !isContentListLoaded) {
      fetchContentList()
        .then((contentList) => {
          setContentList(contentList);
          setIsContentListLoaded(true);
        })
        .catch((error) => console.log(error));
    }
  }, [feedPostContentView, isContentListLoaded]);

  function getFeedPostAge(creationTimestamp: number) {
    const presentDate = new Date();
    const creationDate = fromUnixTime(creationTimestamp);
    const commentAgeInYears = differenceInYears(presentDate, creationDate);
    const commentAgeInDays = differenceInDays(presentDate, creationDate);
    const commentAgeInHours = differenceInHours(presentDate, creationDate);
    const commentAgeInMinutes = differenceInMinutes(presentDate, creationDate);
    if (commentAgeInYears) return `${commentAgeInYears}yr ago`;
    if (commentAgeInDays) return `${commentAgeInDays}d ago`;
    if (commentAgeInHours) return `${commentAgeInHours}hr ago`;
    if (commentAgeInMinutes) return `${commentAgeInMinutes}min ago`;
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <span className="text-neutral-400">{author}</span>
          <span className="text-neutral-500">•</span>
          {createdTimestamp && (
            <span className="text-neutral-500">
              {getFeedPostAge(createdTimestamp)}
            </span>
          )}
        </div>
        <button
          className=""
          onClick={() => {
            setFeedPostContentView(
              feedPostContentView === "contentText"
                ? "contentList"
                : "contentText"
            );
          }}
        >
          {contentText && (
            <>
              {feedPostContentView === "contentText" ? (
                <DocumentTextIconOutline className="w-[20px] h-[20px] text-blue-400" />
              ) : (
                <DocumentTextIcon className="w-[20px] h-[20px] text-blue-400" />
              )}
            </>
          )}
        </button>
      </div>
      {title && feedPostContentView === "contentText" && (
        <h4 className="font-bold text-lg">{title}</h4>
      )}
      {contentList && feedPostContentView === "contentList" && (
        <h4 className="font-bold text-lg">{contentList[0]}</h4>
      )}
      {feedPostContentView === "contentText" && (
        <div className="">
          <div
            className="[&>*>*]:mb-2"
            dangerouslySetInnerHTML={{
              __html: contentText!,
            }}
          />
          <div className="">
            {imageHrefs?.length ? (
              <img src={imageHrefs[0]} className="rounded" />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      {!contentList.length && feedPostContentView === "contentList" && (
        <div className="flex justify-center items-center h-32">
          <span className="h-8 w-8 block rounded-full border-4 border-t-blue-400 animate-spin" />
        </div>
      )}
      {contentList && feedPostContentView === "contentList" && (
        <ul className="flex flex-col space-y-2">
          {contentList.map((contentListItem, index) => {
            if (index != 0) {
              return (
                <li
                  key={contentListItem}
                  className="flex items-start space-x-3"
                >
                  <div className="text-neutral-500">{index}</div>
                  <div>
                    <div>{contentListItem}</div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      )}
      {(positiveResponseCount ||
        negativeResponseCount ||
        sourceName ||
        sourceHref) && (
        <div className="flex justify-between items-center pt-2">
          <div className="flex space-x-4">
            <div className="flex items-center text-neutral-500">
              <ArrowUpIcon className="w-[20px] h-[20px] mr-1" />
              {positiveResponseCount}
            </div>
            <div className="flex items-center text-neutral-500">
              <ArrowDownIcon className="w-[20px] h-[20px] mr-1" />
              {negativeResponseCount}
            </div>
          </div>
          {sourceName && sourceHref && (
            <Link
              href={sourceHref}
              className="text-blue-300 text-right font-light text-sm"
            >
              {sourceName}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
