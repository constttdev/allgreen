import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/*


When ever any changes are made here run the following command:

pnpm run database:miggen 
or
npm run database:miggen


*/

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});
