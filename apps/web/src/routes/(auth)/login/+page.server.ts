import { fail, redirect } from '@sveltejs/kit';
import { loginUser } from '../../../../../../packages/shared/userManagement.ts';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');
		const username = data.get('username');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { error: 'Username or password is missing' });
		}

		try {
			await loginUser(username, password, cookies);
			// redirect user to dashboard
		} catch (error) {
			console.log(error);
			return fail(400, {
				error: 'Failed to login! Maybe you have the wrong credentials?'
			});
		}
	}
};
