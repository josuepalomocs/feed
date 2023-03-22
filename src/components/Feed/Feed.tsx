import useFeed from "@/components/Feed/hooks/useFeed";
import fromUnixTime from "date-fns/fromUnixTime";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

export default function Feed() {
  const { feed } = useFeed();

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

  function renderFeed() {
    if (!feed.length) return <span className="">Feed empty</span>;
    return (
      <ul className="flex flex-col space-y-2">
        {feed.map((feedPost) => {
          const {
            id,
            author,
            createdTimestamp,
            title,
            contentText,
            positiveResponseCount,
            negativeResponseCount,
            sourceName,
            sourceHref,
          } = feedPost;
          return (
            <li
              key={id}
              className="flex flex-col space-y-2 bg-neutral-800 p-4 mx-2 rounded-lg"
            >
              <div className="flex space-x-2">
                <span className="text-neutral-400">{author}</span>
                <span className="text-neutral-500">•</span>
                {createdTimestamp && (
                  <span className="text-neutral-500">
                    {getFeedPostAge(createdTimestamp)}
                  </span>
                )}
              </div>
              {title && <h4 className="font-bold text-lg">{title}</h4>}
              {contentText && <p className="">{contentText}</p>}
              {(positiveResponseCount ||
                negativeResponseCount ||
                sourceName ||
                sourceHref) && (
                <div className="flex justify-between items-center pt-2">
                  {(positiveResponseCount || negativeResponseCount) && (
                    <div className="flex space-x-4">
                      {positiveResponseCount && (
                        <div className="flex items-center text-neutral-400">
                          <ArrowUpIcon className="w-[20px] h-[20px] mr-1" />
                          {positiveResponseCount}
                        </div>
                      )}
                      {negativeResponseCount && (
                        <div className="flex items-center text-neutral-400">
                          <ArrowDownIcon className="w-[20px] h-[20px] mr-1" />
                          {negativeResponseCount}
                        </div>
                      )}
                    </div>
                  )}
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
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="pb-4">
      <h2 className="px-4 mb-4 font-bold text-neutral-400">March 21, 2023</h2>
      <div className="">{renderFeed()}</div>
    </div>
  );
}
