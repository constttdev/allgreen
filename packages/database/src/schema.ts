import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { sql, relations } from "drizzle-orm";

/*


When ever any changes are made here run the following command:

pnpm run db:miggen 
or
npm run db:miggen


*/

export const userTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const displayTable = sqliteTable("displays", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userID: integer("userID")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  name: text("name").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  // add checks realation
});

export const checkTable = sqliteTable("checks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userID: integer("userID")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  name: text("name").notNull().unique(),
  address: text("address").notNull().unique(),
  type: text("type").notNull(),
  interval: integer("interval").notNull(),
  timeout: integer("timeout").notNull(),
  isActive: integer("isActive", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const checkLogTable = sqliteTable("checkLogs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  checkID: integer("checkID").notNull(),
  status: integer("status", { mode: "boolean" }).notNull(),
  statusCode: integer("statusCode"),
  responseTime: integer("responseTime"),
  errorMessage: text("errorMessage"),
  checkedAt: integer("checkedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const displayCheckTable = sqliteTable(
  "displayChecks",
  {
    displayID: integer("displayID")
      .notNull()
      .references(() => displayTable.id, { onDelete: "cascade" }),
    checkID: integer("checkID")
      .notNull()
      .references(() => checkTable.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.displayID, t.checkID] })],
);

export const usersRelations = relations(userTable, ({ many }) => ({
  displays: many(displayTable),
  checks: many(checkTable),
}));

export const displaysRelations = relations(displayTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [displayTable.userID],
    references: [userTable.id],
  }),
  displayChecks: many(displayCheckTable),
}));

export const checksRelations = relations(checkTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [checkTable.userID],
    references: [userTable.id],
  }),
  logs: many(checkLogTable),
  displayChecks: many(displayCheckTable),
}));

export const checkLogsRelations = relations(checkLogTable, ({ one }) => ({
  check: one(checkTable, {
    fields: [checkLogTable.checkID],
    references: [checkTable.id],
  }),
}));

export const displayChecksRelations = relations(
  displayCheckTable,
  ({ one }) => ({
    display: one(displayTable, {
      fields: [displayCheckTable.displayID],
      references: [displayTable.id],
    }),
    check: one(checkTable, {
      fields: [displayCheckTable.checkID],
      references: [checkTable.id],
    }),
  }),
);
