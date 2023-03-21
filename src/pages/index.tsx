import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Feed</title>
        <meta
          name="description"
          content="Hubify is an AI-powered content aggregator that acts as a central hub for content from various
           social media networks and external websites. With the help of a trained GPT, Hubify filters the content
           and presents it in a clean, focused, and organized view."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
