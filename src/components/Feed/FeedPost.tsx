import { useState } from "react";
import Link from "next/link";
import { BoltIcon as BoltIconOutline } from "@heroicons/react/24/outline";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoltIcon,
} from "@heroicons/react/20/solid";
import { FeedPost as IFeedPost, FeedPostContentView } from "../../../types";
import fromUnixTime from "date-fns/fromUnixTime";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import Image from "next/image";

interface FeedPostProps {
  data: IFeedPost;
}

export default function FeedPost({ data }: FeedPostProps) {
  const {
    author,
    createdTimestamp,
    title,
    contentText,
    contentList,
    positiveResponseCount,
    negativeResponseCount,
    sourceName,
    sourceHref,
    imageHrefs,
  } = data;
  const [feedPostContentView, setFeedPostContentView] =
    useState<FeedPostContentView>("contentText");

  function getFeedPostAge(creationTimestamp: number) {
    const presentDate = new Date();
    const creationDate = fromUnixTime(creationTimestamp);
    const commentAgeInMinutes = differenceInMinutes(presentDate, creationDate);
    if (commentAgeInMinutes >= 60) {
      const commentAgeInHours = differenceInHours(presentDate, creationDate);
      return commentAgeInHours > 1
        ? `${commentAgeInHours}hrs ago`
        : `${commentAgeInHours}hr ago`;
    }
    return commentAgeInMinutes > 1
      ? `${commentAgeInMinutes}mins ago`
      : `${commentAgeInMinutes}min ago`;
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
          {feedPostContentView === "contentText" ? (
            <BoltIconOutline className="w-[20px] h-[20px] text-blue-400" />
          ) : (
            <BoltIcon className="w-[20px] h-[20px] text-blue-400" />
          )}
        </button>
      </div>
      {title && <h4 className="font-bold text-lg">{title}</h4>}
      {feedPostContentView === "contentText" && (
        <div className="flex flex-col space-y-2">
          <p>{contentText}</p>
          <div className="">
            {imageHrefs?.length ? (
              <img src={imageHrefs[0]} className="rounded" />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      {contentList && feedPostContentView === "contentList" && (
        <ul className="flex flex-col space-y-2">
          {contentList.map((contentListItem, index) => {
            return (
              <li key={contentListItem} className="flex items-start space-x-2">
                <div className="text-neutral-500">{index + 1}</div>
                <div>
                  <div>{contentListItem}</div>
                </div>
              </li>
            );
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
