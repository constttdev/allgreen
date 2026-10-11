import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user) {
		redirect(307, '/dashboard');
	}

	return { user: locals.user };
};

export const actions = {
	login: async ({ request, locals }) => {
		const data = await request.formData();
		const password = data.get('password');
		const username = data.get('username');
		if (!username || !password) {
			return fail(400, { error: 'Username or password is missing' });
		}

		try {
            // try to authentificate
			
		} catch (error) {
			console.log(error);
			return fail(400, {
				error: 'Failed to login! Please check that you use the right credentials'
			});
			}
		}
	}
};
