import { youtube } from "@googleapis/youtube";

export const client = youtube({
  version: "v3",
  auth: process.env.YOUTUBE_DATA_API_KEY,
});
