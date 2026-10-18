import { redirect } from '@sveltejs/kit';
import { logoutUser } from '../../../../../../packages/shared/userManagement.ts';

export const load = async ({ cookies }) => {
	return { jar: cookies.getAll() };
};

export const actions = {
	logout: async ({ cookies }) => {
		await logoutUser(cookies);
		redirect(303, '/login');
	}
};
