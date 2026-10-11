import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createLogger } from "../../../packages/shared/logger.ts";

const logger = createLogger("server");

const app = new Hono();

/*
app.get('/', (c) => {
  return c.text('Root route')
})
*/

serve(
  {
    fetch: app.fetch,
    port: 7357,
  },
  (info) => {
    logger.info(`Running on http://localhost:${info.port}`);
  },
);
