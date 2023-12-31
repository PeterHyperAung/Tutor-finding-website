import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "dotenv";
config();

const app = new Hono();
app.get("/", (c) => c.text("Hello Hono!"));

serve({
  fetch: app.fetch,
  port: 8000,
});
