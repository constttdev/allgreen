import { fileURLToPath } from "node:url";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.ts";

const databasePath = fileURLToPath(new URL("../local.db", import.meta.url));

const client = createClient({
  url: `file:${databasePath}`,
});

export const db = drizzle(client, { schema });

export * from "./schema.ts";
