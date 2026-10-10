import { serve } from "@hono/node-server";
import { Hono } from "hono";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
});

const app = new Hono();

/*
app.get('/', (c) => {
  return c.text('')
})
*/

serve(
  {
    fetch: app.fetch,
    port: 7357,
  },
  (info) => {
    logger.info(`HONO: Running on http://localhost:${info.port}`);
  },
);
