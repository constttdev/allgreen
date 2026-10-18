import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	JWT_SECRET: {}
});
