import Head from "next/head";
import Header from "@/components/Layout/Header";
import Feed from "@/components/Feed/Feed";

export default function Home() {
  return (
    <>
      <Head>
        <title>Feed</title>
        <meta
          name="description"
          content="Feed is an AI-powered content aggregator that acts as a central hub for content from various
           social media networks and external websites. With the help of a trained GPT, Feed filters the content
           and presents it in a clean, focused, and organized view."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen max-w-screen bg-neutral-900 text-white">
        <Header />
        <Feed />
      </div>
    </>
  );
}
