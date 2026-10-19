import { redirect } from '@sveltejs/kit';
import {
	changeUserPassword,
	logoutUser
} from '../../../../../../packages/shared/userManagement.ts';
import { JWT_SECRET } from '$app/env/private';

export const load = async ({ cookies }) => {
	return { jar: cookies.getAll() };
};

export const actions = {
	logout: async ({ cookies }) => {
		await logoutUser(cookies);
		redirect(303, '/login');
	},

	changePassword: async ({ cookies, request }) => {
		const data = await request.formData();
		const password = data.get('oldPassword');
		const newPassword = data.get('newPassword');

		if (
			!password ||
			!newPassword ||
			typeof password !== 'string' ||
			typeof newPassword !== 'string'
		) {
			throw Error('Both old and new password are required!');
		}
		await changeUserPassword(cookies, JWT_SECRET, password, newPassword);
		await logoutUser(cookies);
		redirect(303, '/login');
	}
};
