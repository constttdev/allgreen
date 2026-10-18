import { JWT_SECRET } from '$app/env/private';
import { getUser } from '../../../packages/shared/userManagement';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await getUser(event.cookies, JWT_SECRET);
	return resolve(event);
};
