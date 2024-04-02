import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { v4 as uuidv4 } from "uuid";
const app = new Hono();

const videos=[]

app.get("/", (c) => {
  return c.html("<h3>Welcome to HONO</h3>");
});

app.post("/video", async (c) => {
  const { videoName, channelName, duration } = await c.req.json();
  const videoContent = {
    id: uuidv4(),
    videoName,
    channelName,
    duration,
  };
  videos.push(videoContent)
  return c.json(videoContent)
});

console.log(videos);

const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
