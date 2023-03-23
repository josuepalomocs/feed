import { useEffect, useState } from "react";
import { FeedPost } from "../../../../types";
import axios from "axios";
import { serverConfigVariables } from "@/config/environmentVariables";
import useRedditPosts from "@/hooks/useRedditPosts";

const serverHttpClient = axios.create({
  baseURL: `https://376b-2603-8080-7201-eb00-4c3c-9e1-8ec2-b8a0.ngrok.io/api`,
  timeout: 10000,
});

export default function useFeed() {}
