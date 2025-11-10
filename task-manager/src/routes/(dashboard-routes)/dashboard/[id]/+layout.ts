import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { getCurrentUser } from '../../../../stores/auth.store';

export const load = (async () => {

    const currentUser = getCurrentUser()


	if (!currentUser) {
		throw redirect(302, '/');
	}
    return {
        user: currentUser ?? null,

    };
}) satisfies LayoutLoad;

export const ssr = false