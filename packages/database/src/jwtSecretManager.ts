import { loadEnvFile } from "node:process";

loadEnvFile(".env");

import { initJWTSecret } from "../../shared/variableManager.ts";

initJWTSecret();
