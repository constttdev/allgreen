import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

const baseLogger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
});

export const createLogger = (name: string) => baseLogger.child({ name });
