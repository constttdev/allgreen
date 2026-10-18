import { JWT_SECRET } from '$app/env/private';
import { getUser } from '../../../packages/shared/userManagement';

export const handle: Handle = async ({ event, resolve }) => {
	// const token = event.cookies.get('session');
	// console.log('[handle]', event.url.pathname, 'cookie present:', !!token);
	// console.log(`[handle] event: ${JSON.stringify(event)}`);
	// console.log(`[handle] event.cookies: ${JSON.stringify(event.cookies)}`);
	// console.log('[handle] all cookies:', event.cookies.getAll());
	// console.log('[handle] session:', event.cookies.get('session'));
	event.locals.user = await getUser(event.cookies, JWT_SECRET);
	// console.log('[handle] user:', event.locals.user);
	return resolve(event);
};
