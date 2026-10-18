import crypto from "node:crypto";
import { createLogger } from "./logger";

const logger = createLogger("variableManager");

let jwtSecret;

function genJWTSecret(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function initGenJWTSecret(): void {
  logger.info("Generating new JWT Secret!");
  jwtSecret = genJWTSecret();
  logger.info("Generated JWT Secret: " + jwtSecret);
  logger.warn("Don't share it! The JWT secret is used to sign JWTs.");
  logger.info(
    `If no JWT_SECRET Variable is already in the .env file copy the Secret next to the equals sign else copy this in the file - JWT_SECRET="${jwtSecret}"`,
  );
}
