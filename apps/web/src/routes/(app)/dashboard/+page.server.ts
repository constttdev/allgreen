import { redirect } from '@sveltejs/kit';
import { authUser, user } from '../../../../../../packages/shared/userManagement.ts';

export const load = async () => {
	if (!user.authentificated) redirect(307, '/login');
};
