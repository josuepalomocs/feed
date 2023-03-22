import FeedPost from "@/components/Feed/FeedPost";
import useRedditPosts from "@/hooks/useRedditPosts";

export default function Feed() {
  const { redditPosts } = useRedditPosts("chatgpt");

  function renderFeed() {
    if (!redditPosts.length) return <span className="">Feed empty</span>;
    return (
      <ul className="flex flex-col space-y-2">
        {redditPosts.map((feedPost) => {
          return (
            <li
              key={feedPost.id}
              className="bg-neutral-800 p-4 mx-2 rounded-lg"
            >
              <FeedPost data={feedPost} />
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
