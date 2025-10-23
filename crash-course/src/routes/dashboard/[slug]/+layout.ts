import { authUser } from '../../../stores/auth.store.js';
import { validUsers } from '../../../stores/user.store.js';
import type { LayoutLoad } from './$types.js';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ params }) => {
	const currentUser = get(authUser);
	const users = get(validUsers);

	const matchedUser = users.find((user) => String(user.id) === currentUser);

	if (!matchedUser) {
		throw c;
	}
	return {
		user: matchedUser ?? null,
		users,
		title: `User Dashboard`,
		slug: params?.slug ?? null
	};
};

// Disable SSR if you're relying on localStorage
export const ssr = false;
