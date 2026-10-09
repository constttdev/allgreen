import { fileURLToPath } from "node:url";
import { defineConfig } from "drizzle-kit";

const databasePath = fileURLToPath(
  new URL("./packages/database/local.db", import.meta.url),
);

export default defineConfig({
  dialect: "sqlite",
  schema: "./packages/database/src/schema.ts",
  out: "./packages/database/drizzle",
  dbCredentials: {
    url: `file:${databasePath}`,
  },
});
