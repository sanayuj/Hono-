import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { v4 as uuidv4 } from "uuid";
import { stream, streamText, streamSSE } from 'hono/streaming'
import dbConnection from "./Models/dbConnect"
const app = new Hono();

dbConnection()

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

app.get("/videos",(c)=>{
    return streamText(c,async(stream)=>{
        for(const video of videos){
            await stream.writeln(JSON.stringify(video))
        }
    })
})


app.get("/video/:id",(c)=>{
    const {id}=c.req.param()
    const video=videos.find((video)=>video.id===id)
    if(!video){
        return c.json({message:"Video not founded"})
    }
    return c.json({message:"Video founded",video})
})

const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
