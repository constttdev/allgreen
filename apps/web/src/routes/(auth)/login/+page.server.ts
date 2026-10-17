import { fail } from '@sveltejs/kit';
import { loginUser } from '../../../../../../packages/shared/userManagement.ts';
import { JWT_SECRET } from '$app/env/private';

export const actions = {
	login: async ({ request, cookies }) => {
		console.log(`JWT_SECRET: ${JWT_SECRET}`);
		console.log(`JWT_SECRET_PROCESS: ${process.env.JWT_SECRET}`);
		const data = await request.formData();
		const password = data.get('password');
		const username = data.get('username');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { error: 'Username or password is missing' });
		}

		console.log('After check');

		try {
			console.log('Before login function');
			await loginUser(username, password, cookies, JWT_SECRET);
			console.log('Before cookie set');
			cookies.set('loggy', 'true');
			console.log('After cookie set');
			// redirect user to dashboard
		} catch (error) {
			console.log(error);
			return fail(400, {
				error: 'Failed to login! Maybe you have the wrong credentials?'
			});
		}
	}
};
