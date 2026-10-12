import { fail, redirect } from '@sveltejs/kit';
import { createUser, loginUser } from '../../../../../../packages/shared/userManagement.ts';

export const actions = {
	signup: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');
		const username = data.get('username');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { error: 'Username or password is missing' });
		}

		try {
			await createUser(username, password);
			await loginUser(username, password, cookies);
		} catch (error) {
			console.log(error);
			return fail(400, {
				error: 'Failed to register! Please contact an administrator'
			});
		}
	}
};
