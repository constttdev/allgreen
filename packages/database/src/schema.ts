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

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const displays = sqliteTable("displays", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userID: integer("userID").notNull(),
  name: text("name").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  // add checks realation
});

export const checks = sqliteTable("checks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userID: integer("userID").notNull(),
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

export const checkLogs = sqliteTable("checkLogs", {
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

export const displayChecks = sqliteTable(
  "displayChecks",
  {
    displayID: integer("displayID")
      .notNull()
      .references(() => displays.id, { onDelete: "cascade" }),
    checkID: integer("checkID")
      .notNull()
      .references(() => checks.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.displayID, t.checkID] })],
);

export const usersRelations = relations(users, ({ many }) => ({
  displays: many(displays),
  checks: many(checks),
}));

export const displaysRelations = relations(displays, ({ one, many }) => ({
  user: one(users, { fields: [displays.userID], references: [users.id] }),
  displayChecks: many(displayChecks),
}));

export const checksRelations = relations(checks, ({ one, many }) => ({
  user: one(users, { fields: [checks.userID], references: [users.id] }),
  logs: many(checkLogs),
  displayChecks: many(displayChecks),
}));

export const checkLogsRelations = relations(checkLogs, ({ one }) => ({
  check: one(checks, { fields: [checkLogs.checkID], references: [checks.id] }),
}));

export const displayChecksRelations = relations(displayChecks, ({ one }) => ({
  display: one(displays, {
    fields: [displayChecks.displayID],
    references: [displays.id],
  }),
  check: one(checks, {
    fields: [displayChecks.checkID],
    references: [checks.id],
  }),
}));
