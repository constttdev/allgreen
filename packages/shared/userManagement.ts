import { eq, inArray } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { db } from "../database/src/index.ts";
import {
  userTable,
  displayTable,
  checkTable,
  checkLogTable,
  displayCheckTable,
} from "../database/src/schema.ts";

const maxAge = 60 * 60 * 24 * 7;

export async function createUser(username: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 12);
  try {
    const [user] = await db
      .insert(userTable)
      .values({ username, passwordHash })
      .returning({ id: userTable.id, username: userTable.username });
    return user;
  } catch (error) {
    throw new Error("Error registring user! Please contact a administrator");
  }
}

export async function loginUser(
  username: string,
  password: string,
  jar: any,
  secret: string,
) {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username));

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error("Invalid username or password");
  }

  if (!secret) throw new Error("JWT secret is required");
  const key = new TextEncoder().encode(secret);

  const token = await new SignJWT({ id: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(key);

  jar.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return { id: user.id, username: user.username };
}

export async function getUserId(jar: any, secret: string) {
  const token = jar.get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    return payload.id as number;
  } catch {
    return null;
  }
}

export async function deleteUser(jar: any, secret: string) {
  const id = await getUserId(jar, secret);
  if (!id) throw new Error("Not logged in");

  const checkIds = (
    await db
      .select({ id: checkTable.id })
      .from(checkTable)
      .where(eq(checkTable.userID, id))
  ).map((c) => c.id);
  const displayIds = (
    await db
      .select({ id: displayTable.id })
      .from(displayTable)
      .where(eq(displayTable.userID, id))
  ).map((d) => d.id);

  if (checkIds.length) {
    await db
      .delete(checkLogTable)
      .where(inArray(checkLogTable.checkID, checkIds));
    await db
      .delete(displayCheckTable)
      .where(inArray(displayCheckTable.checkID, checkIds));
  }
  if (displayIds.length) {
    await db
      .delete(displayCheckTable)
      .where(inArray(displayCheckTable.displayID, displayIds));
  }

  await db.delete(checkTable).where(eq(checkTable.userID, id));
  await db.delete(displayTable).where(eq(displayTable.userID, id));
  await db.delete(userTable).where(eq(userTable.id, id));

  jar.delete("session");
}

export async function getUser(jar: any, secret: string) {
  const id = await getUserId(jar, secret);
  if (!id) return null;

  const [user] = await db
    .select({ id: userTable.id, username: userTable.username })
    .from(userTable)
    .where(eq(userTable.id, id));

  return user ?? null;
}
