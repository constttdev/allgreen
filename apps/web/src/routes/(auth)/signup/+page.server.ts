import { fail, redirect } from '@sveltejs/kit';
import { createUser, loginUser } from '../../../../../../packages/shared/userManagement.ts';
import { JWT_SECRET } from '$app/env/private';
import { validatePassword } from '../../../../../../packages/shared/functionManager.ts';

export const actions = {
	signup: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');
		const username = data.get('username');

		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, { error: 'Username or password is missing' });
		}

		if (!validatePassword(password)) {
			return fail(400, {
				error:
					'Pleas use a valid password! Your password must be 8 letters or longer, must contain a symbol (like !$@#-) and must contain a letter'
			});
		}

		try {
			await createUser(username, password);
			await loginUser(username, password, cookies, JWT_SECRET);
			redirect(307, '/dashboard');
		} catch (error) {
			console.log(error);
			return fail(400, {
				error: 'Failed to register! Please contact an administrator'
			});
		}
	}
};
